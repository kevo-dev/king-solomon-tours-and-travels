import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("homepage layout restoration", () => {
  it("keeps boat journeys as catalogue packages instead of a standalone homepage feature", async () => {
    const [home, navigation] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/TravelNav.tsx", import.meta.url), "utf8"),
    ]);

    expect(home).toContain("tours.slice(0, 4)");
    expect(home).not.toContain('id="boat-rides"');
    expect(home).not.toContain("Set out for the islands.");
    expect(navigation).not.toContain('label: "Boat rides"');
  });
});

