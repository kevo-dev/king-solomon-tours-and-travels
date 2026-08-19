import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "King Solomon Tours and Travels — Kenya, Your Way",
  description: "Discover, plan, and enquire about Kenya’s most memorable journeys and Lake Victoria boat rides.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}
