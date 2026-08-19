const unsplashImage = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`;

// These public CDN URLs work on both the Manus runtime and Vercel. The former
// /manus-storage paths rely on the project's custom Express server, which Vercel does not run.
export const travelImages = {
  coast: unsplashImage("photo-1651860282131-e3257674ccd1"),
  explorer: unsplashImage("photo-1520124442480-b5c60b0f80c2"),
  mara: unsplashImage("photo-1547471080-7cc2caa01a7e"),
  beach: unsplashImage("photo-1489493887464-892be6d1daae"),
  takawiri: unsplashImage("photo-1751561484224-71ecfb3086d9"),
  mfangano: unsplashImage("photo-1751561484224-71ecfb3086d9"),
  mbasa: unsplashImage("photo-1751561484224-71ecfb3086d9"),
};

export type Category = "safari" | "beach" | "cultural" | "adventure" | "city";
export type Destination = "Maasai Mara" | "Amboseli" | "Diani Beach" | "Nairobi" | "Naivasha" | "Takawiri Island" | "Mfangano" | "Mbasa Island";

export type Tour = {
  id: number;
  slug: string;
  title: string;
  destination: Destination;
  region: string;
  category: Category;
  days: number;
  group: string;
  price: number;
  image: string;
  gallery: string[];
  summary: string;
  operator: string;
  itinerary: Array<{ day: string; title: string; detail: string }>;
  inclusions: string[];
  exclusions: string[];
};

export type Operator = {
  name: string;
  region: string;
  focus: string;
  email?: string;
  phone: string;
  packages: number;
};

export const categories: Category[] = ["safari", "beach", "cultural", "adventure", "city"];

export const destinations = [
  { name: "Maasai Mara", region: "Rift Valley", detail: "Wide-open savannah and remarkable wildlife encounters.", image: travelImages.mara, size: "large" },
  { name: "Amboseli", region: "Kajiado", detail: "Elephant country framed by Kilimanjaro’s silhouette.", image: travelImages.explorer, size: "small" },
  { name: "Diani Beach", region: "Kenya Coast", detail: "Warm Indian Ocean water, white sand, slow mornings.", image: travelImages.coast, size: "small" },
  { name: "Nairobi", region: "Nairobi", detail: "A city that makes room for art, food, and wild places.", image: travelImages.beach, size: "large" },
];

export const tours: Tour[] = [
  {
    id: 101, slug: "mara-golden-hour", title: "Golden Hour in the Mara", destination: "Maasai Mara", region: "Rift Valley", category: "safari", days: 3, group: "2–6 travelers", price: 86500, image: travelImages.mara, gallery: [travelImages.mara, travelImages.explorer, travelImages.coast],
    summary: "A deliberately paced long-weekend safari with time for early drives and unhurried lodge evenings.", operator: "Acacia Trails Kenya",
    itinerary: [{ day: "Day 1", title: "Nairobi to Maasai Mara", detail: "A road transfer west, lodge arrival, and a sunset game drive." }, { day: "Day 2", title: "Full-day Mara exploration", detail: "A flexible game-drive day with a packed breakfast in the reserve." }, { day: "Day 3", title: "Morning in the wild", detail: "An early drive before the return journey to Nairobi." }],
    inclusions: ["Lodge accommodation", "Scheduled road transfers", "Park entry guidance", "Selected meals"], exclusions: ["International flights", "Travel insurance", "Personal purchases"],
  },
  {
    id: 102, slug: "diani-slow-days", title: "Diani Slow Days", destination: "Diani Beach", region: "Kenya Coast", category: "beach", days: 4, group: "2–8 travelers", price: 54200, image: travelImages.coast, gallery: [travelImages.coast, travelImages.beach, travelImages.explorer],
    summary: "A soft landing on the coast: saltwater swims, a dhow afternoon, and locally led discoveries.", operator: "Coastal Rhythm Journeys",
    itinerary: [{ day: "Day 1", title: "Arrive on the coast", detail: "Airport collection and a relaxed seaside check-in." }, { day: "Day 2", title: "Sea and shore", detail: "A guided morning on the water and an open afternoon." }, { day: "Day 3", title: "Dhow afternoon", detail: "A sunset sail planned around weather conditions." }, { day: "Day 4", title: "Unhurried departure", detail: "Breakfast and transfer coordination." }],
    inclusions: ["Accommodation", "Airport collection", "Selected coastal activity", "Breakfast daily"], exclusions: ["Flights to Mombasa", "Alcoholic drinks", "Optional water sports"],
  },
  {
    id: 103, slug: "nairobi-after-hours", title: "Nairobi After Hours", destination: "Nairobi", region: "Nairobi", category: "city", days: 1, group: "2–10 travelers", price: 12800, image: travelImages.beach, gallery: [travelImages.beach, travelImages.explorer, travelImages.mara],
    summary: "A considered introduction to Nairobi’s galleries, food culture, and creative neighbourhoods.", operator: "City Canvas Collective",
    itinerary: [{ day: "Day 1", title: "A city in conversation", detail: "A flexible cultural walk with food, design, and neighbourhood stories." }],
    inclusions: ["Host-led walk", "Tasting stops", "Private transport between selected areas"], exclusions: ["Additional meals", "Personal shopping"],
  },
  {
    id: 104, slug: "amboseli-open-skies", title: "Amboseli Open Skies", destination: "Amboseli", region: "Kajiado", category: "safari", days: 2, group: "2–6 travelers", price: 48900, image: travelImages.explorer, gallery: [travelImages.explorer, travelImages.mara, travelImages.coast],
    summary: "An intimate overnight safari designed around Amboseli’s elephant herds and shifting light.", operator: "Rift & Range Safaris",
    itinerary: [{ day: "Day 1", title: "South toward Amboseli", detail: "Travel through Kajiado with an afternoon reserve drive." }, { day: "Day 2", title: "Elephants and open sky", detail: "A sunrise drive before returning to Nairobi." }],
    inclusions: ["One night accommodation", "Road transfers", "Guide and game drives"], exclusions: ["Travel insurance", "Items not listed as included"],
  },
  {
    id: 105, slug: "naivasha-on-foot", title: "Naivasha on Foot & Water", destination: "Naivasha", region: "Rift Valley", category: "adventure", days: 2, group: "2–10 travelers", price: 27400, image: travelImages.mara, gallery: [travelImages.mara, travelImages.explorer, travelImages.coast],
    summary: "A weekend of lakeside air, easy trails, and a slow boat ride on Lake Naivasha.", operator: "Rift & Range Safaris",
    itinerary: [{ day: "Day 1", title: "Lake arrival", detail: "Drive out from Nairobi and settle into a lakeside afternoon." }, { day: "Day 2", title: "Walk, cycle, float", detail: "A locally led day shaped by the weather and your energy." }],
    inclusions: ["One night accommodation", "Ground transfers", "Guided lake activity"], exclusions: ["Additional activities", "Personal refreshments"],
  },
  {
    id: 106, slug: "takawiri-island-boat-ride", title: "Takawiri Island Boat Ride", destination: "Takawiri Island", region: "Lake Victoria", category: "adventure", days: 1, group: "2–12 travelers", price: 14500, image: travelImages.takawiri, gallery: [travelImages.takawiri, travelImages.mfangano, travelImages.mbasa],
    summary: "A relaxed Lake Victoria crossing to Takawiri Island, with shoreline time, island views, and a flexible return by boat.", operator: "King Solomon Tours and Travels",
    itinerary: [{ day: "Day 1", title: "Cross to Takawiri Island", detail: "Meet at the departure point, board for the island crossing, and enjoy an unhurried day planned around conditions on the lake." }],
    inclusions: ["Boat ride to Takawiri Island", "Life jackets", "Experienced boat crew", "Island-day coordination"], exclusions: ["Meals and refreshments", "Personal purchases", "Transfers to departure point"],
  },
  {
    id: 107, slug: "mfangano-island-boat-escape", title: "Mfangano Island Boat Escape", destination: "Mfangano", region: "Lake Victoria", category: "adventure", days: 1, group: "2–10 travelers", price: 16800, image: travelImages.mfangano, gallery: [travelImages.mfangano, travelImages.takawiri, travelImages.mbasa],
    summary: "A Lake Victoria island day for travelers seeking open water, quiet scenery, and Mfangano’s slow island atmosphere.", operator: "King Solomon Tours and Travels",
    itinerary: [{ day: "Day 1", title: "Set out for Mfangano", detail: "Travel by boat across Lake Victoria, settle into the island rhythm, and return after a leisurely exploration window." }],
    inclusions: ["Return boat ride to Mfangano", "Life jackets", "Experienced boat crew", "Flexible island itinerary"], exclusions: ["Meals and refreshments", "Entrance fees where applicable", "Personal purchases"],
  },
  {
    id: 108, slug: "mbasa-island-boat-ride", title: "Mbasa Island Boat Ride", destination: "Mbasa Island", region: "Lake Victoria", category: "adventure", days: 1, group: "2–12 travelers", price: 13800, image: travelImages.mbasa, gallery: [travelImages.mbasa, travelImages.takawiri, travelImages.mfangano],
    summary: "Take to Lake Victoria for a scenic boat ride toward Mbasa Island, designed for a simple, memorable day on the water.", operator: "King Solomon Tours and Travels",
    itinerary: [{ day: "Day 1", title: "Lake Victoria to Mbasa Island", detail: "Depart by boat, enjoy the changing lake views, and make time for a calm island stop before returning." }],
    inclusions: ["Return boat ride to Mbasa Island", "Life jackets", "Experienced boat crew", "Departure coordination"], exclusions: ["Meals and refreshments", "Personal purchases", "Transfers to departure point"],
  },
];

export const operators: Operator[] = [
  { name: "King Solomon Tours and Travels", region: "Lake Victoria · Takawiri Island · Mfangano · Mbasa Island", focus: "Boat rides and curated Lake Victoria island escapes", phone: "+254 720 607010", packages: 3 },
  { name: "Acacia Trails Kenya", region: "Nairobi & Maasai Mara", focus: "Private safaris and classic Kenya circuits", email: "hello@acaciatrails.example", phone: "+254 700 000 101", packages: 7 },
  { name: "Coastal Rhythm Journeys", region: "Diani Beach & Kenya Coast", focus: "Thoughtful coastal stays and water-based days", email: "hello@coastalrhythm.example", phone: "+254 700 000 102", packages: 5 },
  { name: "Rift & Range Safaris", region: "Naivasha, Amboseli & Laikipia", focus: "Nature-forward weekend escapes and safaris", email: "hello@riftandrange.example", phone: "+254 700 000 103", packages: 9 },
  { name: "City Canvas Collective", region: "Nairobi", focus: "Culture, food, design, and independent city experiences", email: "hello@citycanvas.example", phone: "+254 700 000 104", packages: 4 },
];

export const formatKes = (value: number) => new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value);
