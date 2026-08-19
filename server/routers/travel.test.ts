import { describe, expect, it } from "vitest";
import { bookingInquiryInput, savedTourInput, tourFilterInput } from "./travel";

describe("travel input contracts", () => {
  it("accepts the required marketplace category labels", () => {
    expect(tourFilterInput.parse({ category: "safari", maxDuration: 5 })).toEqual({ category: "safari", maxDuration: 5 });
  });

  it("rejects an invalid booking enquiry email", () => {
    expect(() => bookingInquiryInput.parse({
      tourId: 1,
      travelerName: "Amani Njoroge",
      travelerEmail: "invalid-email",
      travelerCount: 2,
    })).toThrow();
  });

  it("accepts a saved-tour action for a valid tour identifier", () => {
    expect(savedTourInput.parse({ tourId: 7, saved: true })).toEqual({ tourId: 7, saved: true });
  });

  it("normalizes an optional inquiry travel date", () => {
    const result = bookingInquiryInput.parse({
      tourId: 2,
      travelerName: "Amani Njoroge",
      travelerEmail: "amani@example.com",
      travelerCount: 2,
      travelDate: "2027-02-12",
    });
    expect(result.travelDate).toBeInstanceOf(Date);
  });
});
