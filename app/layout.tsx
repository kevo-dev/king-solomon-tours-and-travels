import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { DEFAULT_DESCRIPTION, defaultSocialImage, organizationJsonLd, SITE_NAME, SITE_URL } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "King Solomon Tours and Travels | Kenya Tours & Boat Rides", template: "%s | King Solomon Tours and Travels" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["Kenya tours", "Kenya safaris", "Lake Victoria boat rides", "Takawiri Island", "Mfangano", "Mbasa Island", "King Solomon Tours and Travels"],
  authors: [{ name: SITE_NAME }], creator: SITE_NAME, publisher: SITE_NAME, category: "Travel", alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "en_KE", url: "/", siteName: SITE_NAME, title: "King Solomon Tours and Travels | Kenya Tours & Boat Rides", description: DEFAULT_DESCRIPTION, images: [{ url: defaultSocialImage, width: 1200, height: 630, alt: "King Solomon Tours and Travels Lake Victoria boat ride" }] },
  twitter: { card: "summary_large_image", title: "King Solomon Tours and Travels | Kenya Tours & Boat Rides", description: DEFAULT_DESCRIPTION, images: [defaultSocialImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-KE"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /><Providers>{children}</Providers></body></html>;
}

