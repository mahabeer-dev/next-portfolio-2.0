// Service definitions for the local landing-page matrix (service × city).
// Each service supplies unique copy so the generated pages are substantive,
// not thin "doorway" pages. Templates use the {city} placeholder.

export type ServiceFaq = { q: string; a: string };

export type LocalService = {
  slug: string;
  label: string; // "Web Development"
  shortLabel: string; // nav / chips
  // SEO templates ({city} is replaced at render time)
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string; // unique service framing (city-agnostic)
  includes: string[];
  stack: string[];
  process: { step: string; detail: string }[];
  faqs: ServiceFaq[];
  schemaServiceType: string;
};

export const services: LocalService[] = [
  {
    slug: "web-development",
    label: "Web Development",
    shortLabel: "Web Dev",
    h1: "Web Developer in {city}",
    metaTitle:
      "Web Developer in {city} — React & Next.js Websites | Mahabeer",
    metaDescription:
      "Hire an expert web developer in {city}. I build fast, SEO-ready websites and web apps with React, Next.js and TypeScript for {city} businesses. Get a free quote.",
    tagline:
      "Fast, modern, SEO-ready websites built with React, Next.js & TypeScript.",
    intro:
      "Most small-business websites are slow, hard to update, and invisible on Google. I build the opposite: clean, fast-loading sites engineered for search from day one, with a content setup you can actually manage. Every build is responsive, accessible, and measured with analytics so you can see what it brings in.",
    includes: [
      "Custom design that matches your brand (no cookie-cutter templates)",
      "Next.js + React build for speed and strong Core Web Vitals",
      "On-page SEO: metadata, structured data, sitemap and clean URLs",
      "Mobile-first, fully responsive layouts",
      "Contact forms, WhatsApp and Google Maps integration",
      "Google Analytics 4 and Search Console setup",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    process: [
      { step: "Discovery", detail: "Understand your business, goals and competitors." },
      { step: "Design", detail: "A layout tailored to your brand and customers." },
      { step: "Build", detail: "Fast, SEO-ready development with clean code." },
      { step: "Launch & support", detail: "Go live, then ongoing updates and care." },
    ],
    faqs: [
      {
        q: "How much does a website cost?",
        a: "It depends on scope — a focused business website is very different from a web app. After a short call I send a fixed quote with no surprises. There's also an optional monthly plan for hosting, updates and SEO upkeep.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A standard business website typically takes 1–3 weeks from approved content. Larger web apps take longer; I'll give you a clear timeline up front.",
      },
      {
        q: "Will my website rank on Google?",
        a: "Every site I build ships SEO-ready — fast, structured-data-enabled and indexable. Ranking also depends on content and ongoing local SEO, which I can manage for you.",
      },
    ],
    schemaServiceType: "Web development",
  },
  {
    slug: "app-development",
    label: "Mobile App Development",
    shortLabel: "App Dev",
    h1: "Mobile App Developer in {city}",
    metaTitle:
      "Mobile App Developer in {city} — iOS & Android Apps | Mahabeer",
    metaDescription:
      "Hire a mobile app developer in {city}. Cross-platform iOS and Android apps built with React Native — one codebase, native performance. Get a free quote.",
    tagline:
      "Cross-platform iOS & Android apps built with React Native — one codebase, native feel.",
    intro:
      "Building separate iOS and Android apps is expensive and slow. With React Native you get one codebase that ships to both stores with a native look and feel — faster to launch and cheaper to maintain. I handle the full journey: build, store submission, push notifications and analytics.",
    includes: [
      "iOS and Android from a single React Native codebase",
      "Native-quality UI and smooth performance",
      "Push notifications (Firebase Cloud Messaging)",
      "Secure auth, payments and API integrations",
      "App Store and Google Play submission",
      "Crash reporting and analytics setup",
    ],
    stack: ["React Native", "TypeScript", "Firebase", "Expo", "Node.js"],
    process: [
      { step: "Scope", detail: "Define the core features and an MVP that ships." },
      { step: "Design", detail: "App flows and screens built around your users." },
      { step: "Develop", detail: "One codebase for iOS and Android." },
      { step: "Publish", detail: "Store submission, then updates and support." },
    ],
    faqs: [
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes. I use React Native, so a single codebase ships to both the App Store and Google Play — which keeps cost and timeline down without sacrificing quality.",
      },
      {
        q: "Can you publish the app to the stores for me?",
        a: "Absolutely. I handle App Store and Google Play submission, including the store listings, screenshots and review process.",
      },
      {
        q: "Can you add push notifications and payments?",
        a: "Yes — push notifications via Firebase, plus payment gateways, maps, chat and any third-party API your app needs.",
      },
    ],
    schemaServiceType: "Mobile app development",
  },
  {
    slug: "seo",
    label: "SEO Services",
    shortLabel: "SEO",
    h1: "Best SEO Agency in {city}",
    metaTitle:
      "Best SEO Agency in {city} — Local SEO & Google Rankings | Mahabeer",
    metaDescription:
      "Looking for the best SEO agency in {city}? I help {city} businesses rank on Google with technical SEO, local SEO and content that brings real leads. Free audit.",
    tagline:
      "Technical, local and on-page SEO that gets {city} businesses found on Google.",
    intro:
      "Ranking on Google isn't luck — it's technical health, the right local signals and content that answers what people search for. I run all three: fix what's slowing your site down, build your local presence (Google Business Profile, citations, reviews) and target the keywords your customers actually use. Everything is tracked in Search Console so you see the progress.",
    includes: [
      "Full technical SEO audit and fixes (speed, indexing, structure)",
      "Local SEO: Google Business Profile, citations and reviews",
      "Keyword research focused on buyer intent",
      "On-page optimisation and content recommendations",
      "Structured data for rich results",
      "Monthly Search Console reporting on clicks and rankings",
    ],
    stack: ["Google Search Console", "GA4", "Schema.org", "Core Web Vitals"],
    process: [
      { step: "Audit", detail: "Find what's holding your rankings back." },
      { step: "Fix", detail: "Technical issues, speed and on-page basics." },
      { step: "Grow", detail: "Local signals, content and link building." },
      { step: "Report", detail: "Monthly clicks, positions and next steps." },
    ],
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "Technical wins can show in weeks; competitive rankings usually take 3–6 months of consistent work. I report monthly so you always see the trajectory, not just the destination.",
      },
      {
        q: "Do you do local SEO and Google Maps?",
        a: "Yes — local SEO is a core focus: optimising your Google Business Profile, building local citations and earning reviews so you show up in the local map pack.",
      },
      {
        q: "Can you prove your SEO works?",
        a: "I work from Google Search Console data, not vanity metrics. You'll see real impressions, clicks and average position month over month.",
      },
    ],
    schemaServiceType: "Search engine optimization",
  },
];

export function getService(slug: string): LocalService | undefined {
  return services.find((s) => s.slug === slug);
}

export function fill(template: string, city: string): string {
  return template.replaceAll("{city}", city);
}
