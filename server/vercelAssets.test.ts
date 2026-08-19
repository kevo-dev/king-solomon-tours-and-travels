import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Vercel image delivery", () => {
  it("uses public CDN image paths rather than the custom Express-only Manus storage route", async () => {
    const travelData = await readFile(new URL("../client/src/lib/travelData.ts", import.meta.url), "utf8");

    expect(travelData).toContain("https://images.unsplash.com/");
    expect(travelData).not.toContain('"/manus-storage/');
  });
});
