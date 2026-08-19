import type { MetadataRoute } from "next";
import { tours } from "@/lib/travelData";
import { SITE_URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const publicEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: currentDate, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tours`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/operators`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
  ];
  const tourEntries = tours.map((tour): MetadataRoute.Sitemap[number] => ({ url: `${SITE_URL}/tours/${tour.slug}`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 }));
  return [...publicEntries, ...tourEntries];
}
