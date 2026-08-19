import { tours, travelImages } from "@/lib/travelData";

export const SITE_URL = "https://tuliatrail-mg8uow3v.manus.space";
export const SITE_NAME = "King Solomon Tours and Travels";
export const DEFAULT_DESCRIPTION = "Discover Kenya tours, safaris, cultural experiences, and Lake Victoria boat rides to Takawiri Island, Mfangano, and Mbasa Island with King Solomon Tours and Travels.";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const defaultSocialImage = absoluteUrl(travelImages.takawiri);

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  telephone: "+254 720 607010",
  areaServed: { "@type": "Country", name: "Kenya" },
  availableLanguage: ["English"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kenya tours and Lake Victoria boat rides",
    itemListElement: tours.map((tour) => ({
      "@type": "Offer",
      name: tour.title,
      description: tour.summary,
      price: tour.price,
      priceCurrency: "KES",
      url: absoluteUrl(`/tours/${tour.slug}`),
      itemOffered: { "@type": "TouristTrip", name: tour.title, image: absoluteUrl(tour.image), touristType: tour.category },
    })),
  },
};
