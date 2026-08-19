import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { bookingInquiries, destinations, InsertUser, itineraries, operators, savedTours, tours, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId, lastSignedIn: new Date() };
  const updateSet: Record<string, unknown> = { lastSignedIn: new Date() };
  (["name", "email", "loginMethod"] as const).forEach((field) => {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listTours(filters: { category?: string; region?: string; maxPriceKes?: number; maxDuration?: number }) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({ tour: tours, destination: destinations, operator: operators })
    .from(tours)
    .leftJoin(destinations, eq(tours.destinationId, destinations.id))
    .leftJoin(operators, eq(tours.operatorId, operators.id))
    .where(eq(tours.isPublished, true))
    .orderBy(desc(tours.createdAt));
  return rows.filter(({ tour }) => (!filters.category || tour.category === filters.category)
    && (!filters.region || tour.region === filters.region)
    && (!filters.maxPriceKes || tour.startingPriceKes <= filters.maxPriceKes)
    && (!filters.maxDuration || tour.durationDays <= filters.maxDuration));
}

export async function createBookingInquiry(input: typeof bookingInquiries.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Booking enquiries are temporarily unavailable.");
  return db.insert(bookingInquiries).values(input);
}

export async function listUserBookingInquiries(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookingInquiries).where(eq(bookingInquiries.userId, userId)).orderBy(desc(bookingInquiries.createdAt));
}

export async function listAllBookingInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookingInquiries).orderBy(desc(bookingInquiries.createdAt));
}

export async function listUserSavedTours(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({ saved: savedTours, tour: tours }).from(savedTours).leftJoin(tours, eq(savedTours.tourId, tours.id)).where(eq(savedTours.userId, userId));
}

export async function toggleSavedTour(userId: number, tourId: number, saved: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Saved tours are temporarily unavailable.");
  if (saved) await db.insert(savedTours).values({ userId, tourId }).onDuplicateKeyUpdate({ set: { userId } });
  else await db.delete(savedTours).where(and(eq(savedTours.userId, userId), eq(savedTours.tourId, tourId)));
  return { saved };
}

export async function listUserItineraries(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itineraries).where(eq(itineraries.userId, userId)).orderBy(desc(itineraries.updatedAt));
}
