// City definitions for the local landing-page matrix (service × city).
// Each city carries unique local context (intro, areas, FAQs) so the
// generated pages read differently per location — not find-and-replace clones.

export type CityFaq = { q: string; a: string };

export type City = {
  slug: string;
  name: string; // "Mohali"
  region: string; // "Tricity, Punjab"
  state: string;
  blurb: string; // short, for hub cards + meta context
  intro: string; // unique local-business framing
  areas: string[]; // localities served
  nearby: string[]; // nearby places
  faqs: CityFaq[]; // city-specific questions
};

export const cities: City[] = [
  {
    slug: "mohali",
    name: "Mohali",
    region: "Tricity, Punjab",
    state: "Punjab",
    blurb:
      "Punjab's IT hub — home to IT City, Phase 8 industrial area and a fast-growing startup scene.",
    intro:
      "Mohali (SAS Nagar) has quietly become Punjab's tech engine — from the IT City in Sector 82 to the startups around Phase 7 and 8. But a lot of local clinics, stores and service businesses here still run on outdated or template websites. That's the gap I close: a fast, modern web presence that helps Mohali businesses get found by the customers searching right next door.",
    areas: [
      "IT City (Sector 82)",
      "Phase 7 & 8",
      "Sector 70",
      "Aerocity",
      "Kharar",
      "Sector 91",
    ],
    nearby: ["Chandigarh", "Zirakpur", "Kharar"],
    faqs: [
      {
        q: "Do you work with startups and clinics in Mohali?",
        a: "Yes — a large share of my work is with Mohali startups, clinics and local service businesses, from IT City through to Phase 8 and Kharar. Whether you need a first website or a full app, I work the way local teams do: fast and hands-on.",
      },
      {
        q: "Can we meet in person in Mohali?",
        a: "I'm based in the Tricity, so an in-person meeting around Mohali or Chandigarh is easy to arrange. Most clients prefer a quick call to start, then we meet as needed.",
      },
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    region: "Tricity",
    state: "Chandigarh (UT)",
    blurb:
      "The planned city — Sector 17 business district, IT Park and a dense base of professional services.",
    intro:
      "Chandigarh's businesses are competitive and design-conscious — fitting for India's best-planned city. From the Sector 17 commercial hub to the firms in the Rajiv Gandhi IT Park, customers here expect a polished online experience. I build websites and apps that match that bar: clean, fast and engineered to rank above the competition in local search.",
    areas: [
      "Sector 17",
      "Sector 22 & 35",
      "IT Park (Kishangarh)",
      "Industrial Area Phase 1 & 2",
      "Manimajra",
    ],
    nearby: ["Mohali", "Panchkula", "Zirakpur"],
    faqs: [
      {
        q: "Do you build websites for professional firms in Chandigarh?",
        a: "Yes — clinics, law and CA firms, salons, retailers and IT companies across Chandigarh. I tailor each site to how that profession actually wins customers, not a generic template.",
      },
      {
        q: "Can you help my Chandigarh business rank above competitors?",
        a: "That's the goal. Beyond a fast, well-built site, I run local SEO — Google Business Profile, citations and on-page work — to lift you in Chandigarh search results and the map pack.",
      },
    ],
  },
  {
    slug: "panchkula",
    name: "Panchkula",
    region: "Tricity, Haryana",
    state: "Haryana",
    blurb:
      "The Haryana corner of the Tricity — sectoral markets, MDC and a growing residential business base.",
    intro:
      "Panchkula pairs Haryana's business energy with Tricity convenience. Its sector markets, the MDC belt and the industrial area host plenty of local businesses that rely on walk-ins and word of mouth — and are leaving online customers on the table. A modern, locally-optimised website turns those Google searches into footfall and calls.",
    areas: [
      "Sector 5 & 8",
      "Sector 20",
      "MDC (Mansa Devi Complex)",
      "Industrial Area",
      "Pinjore",
    ],
    nearby: ["Chandigarh", "Zirakpur", "Mohali"],
    faqs: [
      {
        q: "Do you serve local businesses across Panchkula?",
        a: "Yes — from the Sector 5 and 20 markets to MDC and the industrial area. Local shops, clinics and service providers are exactly who benefit most from a fast, search-ready site.",
      },
      {
        q: "Will my Panchkula business show up on Google Maps?",
        a: "With proper local SEO, yes. I optimise your Google Business Profile and build local signals so you appear when nearby customers search for what you offer.",
      },
    ],
  },
  {
    slug: "zirakpur",
    name: "Zirakpur",
    region: "Tricity, Punjab",
    state: "Punjab",
    blurb:
      "The Tricity's fastest-growing town — VIP Road commercial strip, new retail and a real-estate boom.",
    intro:
      "Zirakpur is the Tricity's boomtown — its VIP Road and Patiala Road corridors are packed with new retail, restaurants, real estate and clinics opening every month. With so much competition arriving at once, the businesses that show up first on Google win. I build the fast, locally-optimised websites and apps that put Zirakpur businesses at the front of that line.",
    areas: [
      "VIP Road",
      "Patiala Road",
      "Dhakoli",
      "Baltana",
      "Peer Muchalla",
    ],
    nearby: ["Chandigarh", "Mohali", "Panchkula"],
    faqs: [
      {
        q: "Zirakpur is very competitive — can you help me stand out?",
        a: "Exactly the situation I build for. A fast site plus focused local SEO around VIP Road, Dhakoli and Baltana searches helps you rank ahead of the wave of new businesses.",
      },
      {
        q: "Do you work with real estate and restaurant businesses in Zirakpur?",
        a: "Yes — both are big in Zirakpur and both live or die on online visibility. I build sites and apps designed to capture local search and convert it into enquiries.",
      },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    region: "Delhi NCR",
    state: "Delhi",
    blurb:
      "The capital market — from Connaught Place to the Nehru Place tech belt and a vast startup ecosystem.",
    intro:
      "Delhi is one of India's largest and most competitive markets — from the Connaught Place business core to the Nehru Place tech belt and the startup clusters in Okhla and Saket. Standing out here demands a website that's genuinely fast, technically sound and built to rank. I deliver web and app builds at that standard, with SEO baked in so Delhi customers find you first.",
    areas: [
      "Connaught Place",
      "Nehru Place",
      "Saket",
      "Okhla",
      "Dwarka",
    ],
    nearby: ["Gurugram", "Noida", "Faridabad"],
    faqs: [
      {
        q: "Do you work with Delhi businesses remotely?",
        a: "Yes. Most Delhi projects run smoothly over calls and screen-shares, with the same speed and clarity as a local engagement. Everything is tracked so you always know where the project stands.",
      },
      {
        q: "Delhi is crowded — how do you help me rank?",
        a: "With technical SEO, a genuinely fast build and a focused local strategy around your area — Nehru Place, Saket, Dwarka and beyond — rather than competing for the whole city at once.",
      },
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
