import type { Metadata } from "next";
import { defaultSocialImage, SITE_NAME } from "../seo";

const description = "Meet Kenya experience makers and discover King Solomon Tours and Travels boat rides to Takawiri Island, Mfangano, and Mbasa Island.";
export const metadata: Metadata = { title: "Kenya Tour Operators & Lake Victoria Boat Rides", description, alternates: { canonical: "/operators" }, openGraph: { title: "Kenya Tour Operators & Lake Victoria Boat Rides", description, url: "/operators", siteName: SITE_NAME, images: [{ url: defaultSocialImage, width: 1200, height: 630, alt: "Lake Victoria boat rides in Kenya" }] } };
export default function OperatorsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
