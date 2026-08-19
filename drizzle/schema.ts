import { boolean, index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "operator"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const destinations = mysqlTable("destinations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 140 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  region: varchar("region", { length: 100 }).notNull(),
  description: text("description").notNull(),
  coverImage: text("coverImage").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const operators = mysqlTable("operators", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId"),
  businessName: varchar("businessName", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 190 }).notNull().unique(),
  description: text("description").notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "suspended"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("operators_owner_idx").on(table.ownerId)]);

export const tours = mysqlTable("tours", {
  id: int("id").autoincrement().primaryKey(),
  operatorId: int("operatorId").notNull(),
  destinationId: int("destinationId").notNull(),
  title: varchar("title", { length: 220 }).notNull(),
  slug: varchar("slug", { length: 240 }).notNull().unique(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["safari", "beach", "cultural", "adventure", "city"]).notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  durationDays: int("durationDays").notNull(),
  groupMin: int("groupMin").default(1).notNull(),
  groupMax: int("groupMax").notNull(),
  startingPriceKes: int("startingPriceKes").notNull(),
  isPrivate: boolean("isPrivate").default(false).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  gallery: json("gallery").$type<string[]>().notNull(),
  itinerary: json("itinerary").$type<Array<{ day: number; title: string; description: string }>>().notNull(),
  inclusions: json("inclusions").$type<string[]>().notNull(),
  exclusions: json("exclusions").$type<string[]>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [
  index("tours_destination_idx").on(table.destinationId),
  index("tours_operator_idx").on(table.operatorId),
  index("tours_category_idx").on(table.category),
]);

export const bookingInquiries = mysqlTable("bookingInquiries", {
  id: int("id").autoincrement().primaryKey(),
  tourId: int("tourId").notNull(),
  userId: int("userId"),
  travelerName: varchar("travelerName", { length: 180 }).notNull(),
  travelerEmail: varchar("travelerEmail", { length: 320 }).notNull(),
  travelerCount: int("travelerCount").notNull(),
  travelDate: timestamp("travelDate"),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacting", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("inquiries_tour_idx").on(table.tourId), index("inquiries_user_idx").on(table.userId)]);

export const savedTours = mysqlTable("savedTours", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tourId: int("tourId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [uniqueIndex("saved_tour_unique").on(table.userId, table.tourId)]);

export const itineraries = mysqlTable("itineraries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  tripNotes: text("tripNotes"),
  dayPlan: json("dayPlan").$type<Array<{ day: number; location: string; plan: string }>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("itineraries_user_idx").on(table.userId)]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Tour = typeof tours.$inferSelect;
