import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("SEO implementation", () => {
  it("defines crawl controls, a sitemap, global metadata, and tour-level SEO coverage", async () => {
    const [layout, seo, robots, sitemap, tourLayout, clientRoute] = await Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/seo.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/tours/[slug]/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/client-route.tsx", import.meta.url), "utf8"),
    ]);
    expect(layout).toContain("metadataBase");
    expect(seo).toContain("TravelAgency");
    expect(layout).toContain("summary_large_image");
    expect(robots).toContain("/dashboard");
    expect(robots).toContain("/admin");
    expect(sitemap).toContain("/tours/${tour.slug}");
    expect(tourLayout).toContain("generateMetadata");
    expect(tourLayout).toContain("TouristTrip");
    expect(clientRoute).toContain("Kenya tours, safaris, and Lake Victoria boat rides.");
  });
});
