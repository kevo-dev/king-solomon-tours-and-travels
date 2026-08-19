import type { Metadata } from "next";
import { defaultSocialImage, SITE_NAME } from "../seo";

const description = "Browse Kenya safaris, beach stays, city experiences, cultural journeys, and Lake Victoria boat rides to Takawiri Island, Mfangano, and Mbasa Island.";

export const metadata: Metadata = {
  title: "Kenya Tours & Experiences",
  description,
  alternates: { canonical: "/tours" },
  openGraph: { title: "Kenya Tours & Experiences", description, url: "/tours", siteName: SITE_NAME, images: [{ url: defaultSocialImage, width: 1200, height: 630, alt: "Kenya tours and Lake Victoria boat rides" }] },
  twitter: { card: "summary_large_image", title: "Kenya Tours & Experiences", description, images: [defaultSocialImage] },
};

export default function ToursLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
