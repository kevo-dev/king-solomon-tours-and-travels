import type { Metadata } from "next";
import { tours } from "@/lib/travelData";
import { absoluteUrl, SITE_NAME } from "../../seo";

type TourLayoutProps = { children: React.ReactNode; params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: TourLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return {};
  const title = `${tour.title} | ${tour.destination} Tour`;
  const description = `${tour.summary} Explore this ${tour.days}-day ${tour.category} experience in ${tour.destination}, Kenya.`;
  const canonical = `/tours/${tour.slug}`;
  const image = absoluteUrl(tour.image);
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: "website", images: [{ url: image, width: 1200, height: 630, alt: tour.title }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default async function TourLayout({ children, params }: TourLayoutProps) {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) return children;
  const tourJsonLd = {
    "@context": "https://schema.org", "@type": "TouristTrip", name: tour.title, description: tour.summary, image: absoluteUrl(tour.image), touristType: tour.category,
    provider: { "@type": "Organization", name: tour.operator },
    offers: { "@type": "Offer", price: tour.price, priceCurrency: "KES", url: absoluteUrl(`/tours/${tour.slug}`) },
    itinerary: { "@type": "ItemList", itemListElement: tour.itinerary.map((day, index) => ({ "@type": "ListItem", position: index + 1, name: `${day.day}: ${day.title}`, description: day.detail })) },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }} />{children}</>;
}
