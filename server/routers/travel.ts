import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createBookingInquiry, listAllBookingInquiries, listTours, listUserBookingInquiries, listUserItineraries, listUserSavedTours, toggleSavedTour } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

export const tourFilterInput = z.object({
  category: z.enum(["safari", "beach", "cultural", "adventure", "city"]).optional(),
  region: z.string().max(100).optional(),
  maxPriceKes: z.number().int().positive().optional(),
  maxDuration: z.number().int().positive().optional(),
});

export const bookingInquiryInput = z.object({
  tourId: z.number().int().positive(),
  travelerName: z.string().trim().min(2).max(180),
  travelerEmail: z.string().email().max(320),
  travelerCount: z.number().int().min(1).max(30),
  travelDate: z.coerce.date().optional(),
  message: z.string().trim().max(2000).optional(),
});

export const savedTourInput = z.object({
  tourId: z.number().int().positive(),
  saved: z.boolean(),
});

export const travelRouter = router({
  tours: publicProcedure.input(tourFilterInput).query(({ input }) => listTours(input)),
  inquire: publicProcedure.input(bookingInquiryInput).mutation(({ ctx, input }) => createBookingInquiry({
    ...input,
    userId: ctx.user?.id,
  })),
  inquiries: router({
    mine: protectedProcedure.query(({ ctx }) => listUserBookingInquiries(ctx.user.id)),
    all: protectedProcedure.query(({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin access is required." });
      return listAllBookingInquiries();
    }),
  }),
  saved: router({
    list: protectedProcedure.query(({ ctx }) => listUserSavedTours(ctx.user.id)),
    toggle: protectedProcedure.input(savedTourInput)
      .mutation(({ ctx, input }) => toggleSavedTour(ctx.user.id, input.tourId, input.saved)),
  }),
  itineraries: router({
    list: protectedProcedure.query(({ ctx }) => listUserItineraries(ctx.user.id)),
  }),
});
