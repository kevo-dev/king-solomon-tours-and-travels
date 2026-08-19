import type { Metadata } from "next";
import { defaultSocialImage, SITE_NAME } from "../seo";

const description = "Describe your ideal Kenya holiday and receive a personalized multi-day itinerary with safaris, stays, and Lake Victoria boat-ride ideas.";
export const metadata: Metadata = { title: "Plan Your Kenya Trip", description, alternates: { canonical: "/planner" }, openGraph: { title: "Plan Your Kenya Trip", description, url: "/planner", siteName: SITE_NAME, images: [{ url: defaultSocialImage, width: 1200, height: 630, alt: "Personalized Kenya trip planning" }] }, twitter: { card: "summary_large_image", title: "Plan Your Kenya Trip", description, images: [defaultSocialImage] } };
export default function PlannerLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
