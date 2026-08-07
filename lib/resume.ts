/**
 * Resume — single source of truth for every downloadable CV variant.
 *
 * A variant is (market x profile). `buildResume()` resolves the two into a
 * concrete resume that `components/resume-document.tsx` renders to PDF.
 *
 * HONESTY RULE (do not relax): nothing in this file may be aspirational.
 * Unknown numbers live in `metrics` below as `null` and simply do not render —
 * a sentence without its metric is still true, a sentence with a guessed one
 * is not.
 */

import { projects as siteProjects } from "./projects";

/* ------------------------------------------------------------------ *
 * Variants
 * ------------------------------------------------------------------ */

export type Market = "international" | "domestic";
export type ProfileId =
  | "fullstack"
  | "react"
  | "node"
  | "mobile"
  | "sveltekit"
  | "bubble"
  | "javascript";

export const MARKETS: { id: Market; label: string; hint: string }[] = [
  {
    id: "international",
    label: "International",
    hint: "Germany, Netherlands, Ireland, Canada, Australia — visa-sponsored roles",
  },
  {
    id: "domestic",
    label: "India (Domestic)",
    hint: "Companies hiring within India",
  },
];

export const PROFILES: { id: ProfileId; label: string; hint: string }[] = [
  { id: "fullstack", label: "Full Stack", hint: "All-round web + mobile delivery" },
  { id: "react", label: "React / Next.js", hint: "Frontend-heavy React roles" },
  { id: "node", label: "Node.js / Backend", hint: "APIs, services, databases" },
  { id: "mobile", label: "React Native / Mobile", hint: "iOS & Android delivery" },
  { id: "sveltekit", label: "SvelteKit", hint: "Svelte / SvelteKit roles" },
  { id: "bubble", label: "Bubble / Low-Code", hint: "No-code & low-code product builds" },
  { id: "javascript", label: "JavaScript / Frontend", hint: "Generic JS / frontend postings" },
];

export const DEFAULT_MARKET: Market = "international";
export const DEFAULT_PROFILE: ProfileId = "fullstack";

export function isMarket(v: string | null): v is Market {
  return v === "international" || v === "domestic";
}

export function isProfile(v: string | null): v is ProfileId {
  return PROFILES.some((p) => p.id === v);
}

/* ------------------------------------------------------------------ *
 * METRICS — the only place to edit when you have real numbers.
 *
 * Every value starts `null`, which renders the sentence without that clause.
 * Fill one in and it flows into every variant that uses it. Only ever put a
 * number here that you can defend in an interview.
 * ------------------------------------------------------------------ */

export type Metrics = {
  /** API performance win, e.g. "cutting p95 latency by ~30%". Phrase as a clause. */
  indiitApiPerf: string | null;
  /** Data scale handled, e.g. "10k+ daily active users" or "1M+ records". */
  indiitDataScale: string | null;
  /** Healthcare platform scope, e.g. "12 clinics and 4k+ monthly bookings". */
  clousorHealthcareScope: string | null;
  /** CI/CD win, e.g. "cutting deploy time by ~50%". Phrase as a clause. */
  clousorDeployWin: string | null;
  /** Real-time scale, e.g. "1k+ concurrent connections". */
  ellocentRealtimeScale: string | null;
  /** Combined App Store + Play installs, e.g. "5k+ installs". */
  ellocentAppInstalls: string | null;
  /** Component library reuse, e.g. "4 products across 2 teams". */
  ellocentLibraryReuse: string | null;
  /**
   * ClipMe installs.
   * RESOLVED 2026-08-07 — the live Play listing shows 10+. That is far too
   * small to quote and is disprovable in one click, so this stays null and
   * ClipMe is described by what it does instead. Revisit only if it grows.
   */
  clipmeInstalls: string | null;
};

export const metrics: Metrics = {
  // Answered 2026-08-07: the module he owns is the construction site
  // documentation manager, now stated outright in its own Indi IT bullet
  // rather than as an optional clause.
  indiitApiPerf: null,
  indiitDataScale: null,
  clousorHealthcareScope: null,
  clousorDeployWin: null,
  ellocentRealtimeScale: null,
  ellocentAppInstalls: null,
  ellocentLibraryReuse: null,
  clipmeInstalls: null,
};

/** Render `clause(value)` only when the metric is actually known. */
const opt = (value: string | null, clause: (v: string) => string): string =>
  value ? clause(value) : "";

/* ------------------------------------------------------------------ *
 * Identity
 * ------------------------------------------------------------------ */

export const contact = {
  name: "Mahabeer",
  phone: "+91 99156 68595",
  email: "mahabeer.fcs.gna@gmail.com",
  linkedin: "linkedin.com/in/mahabeer-dev",
  github: "github.com/mahabeer-dev",
  portfolio: "mahabeer.online",
  /** International CVs list city + country only; domestic adds the state. */
  locationInternational: "Mohali, India",
  locationDomestic: "Mohali, Punjab, India",
} as const;

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Mangalayatan University, Meerut, Uttar Pradesh, India",
    period: "2022 - 2024",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "GNA University, Phagwara, Punjab, India",
    period: "2019 - 2022",
  },
];

/**
 * Languages. English is a self-assessment until an IELTS/PTE band exists —
 * replace with the real band once tested, never estimate one.
 * Add native languages here once confirmed, e.g. { name: "Hindi", level: "Native" }.
 */
export const languages: { name: string; level: string }[] = [
  { name: "English", level: "Professional working proficiency" },
];

/* ------------------------------------------------------------------ *
 * Skills — groups are emitted in each profile's `skillOrder`.
 * ------------------------------------------------------------------ */

export type SkillGroupId =
  | "languages"
  | "frontend"
  | "mobile"
  | "backend"
  | "databases"
  | "cloud"
  | "lowcode"
  | "integrations"
  | "testing"
  | "practices";

export const skillGroups: Record<SkillGroupId, { label: string; items: string[] }> = {
  languages: {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "SQL", "Python (working)"],
  },
  frontend: {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "SvelteKit / Svelte",
      "Redux",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "SSR (server-side rendering)",
      "Responsive and cross-browser web",
    ],
  },
  mobile: {
    label: "Mobile",
    items: [
      "React Native",
      "Expo",
      "iOS and Android release (App Store, Google Play)",
      "Push notifications (Firebase Cloud Messaging, OneSignal)",
    ],
  },
  backend: {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "RESTful API design",
      "WebSockets",
      "SvelteKit endpoints",
      "Laravel / PHP",
    ],
  },
  databases: {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Drizzle ORM", "Redis"],
  },
  cloud: {
    label: "Cloud and DevOps",
    items: [
      "AWS",
      "Docker",
      "Nginx",
      "CI/CD (continuous integration/continuous delivery)",
      "GitHub Actions",
      "Vercel",
      "Netlify",
      "Google Cloud Platform (GCP)",
      "VPS / Linux",
      "Git",
    ],
  },
  lowcode: {
    label: "Low-Code",
    items: ["Bubble.io", "n8n workflow automation", "Strapi CMS"],
  },
  integrations: {
    label: "Integrations",
    items: [
      "Stripe",
      "Razorpay",
      "OpenAI and Gemini APIs",
      "Firebase",
      "n8n",
      "Google Cloud APIs",
      "WhatsApp API",
      "JWT",
    ],
  },
  testing: {
    label: "Testing",
    items: [
      "Unit and integration testing (Jest)",
      "End-to-end testing (Playwright)",
    ],
  },
  practices: {
    label: "Practices",
    items: [
      "Team leadership",
      "Mentoring",
      "Code reviews",
      "Agile / Scrum",
      "System and database design",
      "GDPR-aware data handling",
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Experience — bullets are tagged with the profiles they serve.
 * `"all"` means the bullet appears in every variant.
 * ------------------------------------------------------------------ */

export type Bullet = {
  profiles: ProfileId[] | "all";
  text: (m: Metrics) => string;
};

export type Job = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: Bullet[];
};

export const experience: Job[] = [
  {
    title: "Software Engineer",
    company: "Indi IT Solutions",
    location: "Mohali, India",
    period: "Dec 2025 - Present",
    bullets: [
      {
        // The strongest single thing on this CV, so it leads the current role.
        // Deliberately omits the Figma comparison he used when describing it:
        // on a resume that reads as a parity claim and invites scrutiny the
        // module cannot survive, whereas the five interaction verbs carry the
        // same signal on their own. "Real-time" is kept because it is his own
        // word for it; note it describes the editor, not multi-user co-editing,
        // which he has not claimed.
        profiles: "all",
        text: () =>
          "Own the construction site documentation module end to end, building a real-time React canvas editor where users draw, annotate, measure, comment on, and link drawings, floor plans, and related documents.",
      },
      {
        profiles: "all",
        text: () =>
          "Ship production full-stack features across React and React Native front-ends and Node.js / Express / MongoDB services.",
      },
      {
        profiles: ["fullstack", "node", "javascript", "sveltekit", "bubble"],
        text: (m) =>
          `Design and maintain RESTful APIs and backend services in Node.js and Express, improving reliability and response times across core endpoints${opt(
            m.indiitApiPerf,
            (v) => ` — ${v}`
          )}.`,
      },
      {
        profiles: ["fullstack", "node"],
        text: (m) =>
          `Own database design and query performance tuning across MongoDB and MySQL${opt(
            m.indiitDataScale,
            (v) => `, supporting ${v}`
          )}.`,
      },
      {
        profiles: ["react", "mobile"],
        text: () =>
          "Build and maintain component-driven interfaces in React and React Native, wiring them to Node.js / Express APIs and MongoDB.",
      },
      {
        profiles: "all",
        text: () =>
          "Integrate LLM-backed capabilities into product workflows (OpenAI / Gemini) while upskilling in AI/ML.",
      },
    ],
  },
  {
    title: "Senior Full-Stack Developer",
    company: "Clousor Technologies",
    location: "Remote",
    period: "Dec 2024 - Dec 2025",
    bullets: [
      {
        profiles: "all",
        text: () =>
          "Led a team of 5+ developers delivering software for direct international clients, running code reviews and mentoring to keep the codebase clean and maintainable.",
      },
      {
        profiles: ["fullstack", "sveltekit", "node", "javascript"],
        text: (m) =>
          `Built a healthcare tele-consultation platform end-to-end — appointment booking, payment integration, WhatsApp notifications, and role-based access control (RBAC) — on SvelteKit, Node.js, and MySQL, deployed to AWS${opt(
            m.clousorHealthcareScope,
            (v) => `, serving ${v}`
          )}.`,
      },
      {
        profiles: ["react", "mobile"],
        text: (m) =>
          `Delivered a healthcare tele-consultation platform end-to-end — appointment booking, payment integration, WhatsApp notifications, and role-based access control (RBAC) — owning the full client experience and the APIs behind it${opt(
            m.clousorHealthcareScope,
            (v) => `, serving ${v}`
          )}.`,
      },
      {
        profiles: ["bubble"],
        text: () =>
          "Delivered client products across both low-code (Bubble.io) and custom-code stacks, choosing the right approach per project and integrating payments, automation, and third-party APIs.",
      },
      {
        profiles: ["fullstack", "node", "sveltekit"],
        text: (m) =>
          `Set up and maintained CI/CD and AWS deployment with Docker and Nginx${opt(
            m.clousorDeployWin,
            (v) => `, ${v}`
          )}.`,
      },
    ],
  },
  {
    title: "Frontend Developer to Frontend Team Lead",
    company: "Ellocent Labs IT Solutions",
    location: "Mohali, India",
    period: "May 2022 - Nov 2024",
    bullets: [
      {
        profiles: "all",
        text: () =>
          "Built and shipped a fleet and logistics management suite spanning three surfaces — admin panel, customer app, and driver mobile app — using React.js, Next.js, and React Native.",
      },
      {
        profiles: ["fullstack", "node", "mobile", "javascript", "react"],
        text: (m) =>
          `Engineered real-time driver-to-customer chat and live GPS location tracking over WebSockets with push notifications (OneSignal / FCM), integrating Google Cloud APIs${opt(
            m.ellocentRealtimeScale,
            (v) => ` and handling ${v}`
          )}.`,
      },
      {
        profiles: ["fullstack", "mobile", "react"],
        text: (m) =>
          `Released mobile apps to the App Store and Google Play${opt(
            m.ellocentAppInstalls,
            (v) => `, reaching ${v}`
          )}.`,
      },
      {
        profiles: "all",
        text: () =>
          "Promoted to Frontend Team Lead in May 2024; led two teams across SvelteKit and low-code stacks, mentored junior engineers, and ran code reviews across logistics, blockchain, and social domains.",
      },
      {
        profiles: ["fullstack", "react", "javascript", "sveltekit"],
        text: (m) =>
          `Authored shared React and SvelteKit component libraries (buttons, forms, tables, modals)${opt(
            m.ellocentLibraryReuse,
            (v) => ` adopted across ${v}`
          )}, standardizing UI and removing duplicated code.`,
      },
      {
        profiles: ["bubble"],
        text: () =>
          "Led delivery on low-code stacks alongside custom SvelteKit work, standardizing patterns and reviewing output across both.",
      },
    ],
  },
  {
    title: "Freelance Frontend Developer",
    company: "Self-employed",
    location: "Remote",
    period: "Apr 2020 - Mar 2022",
    bullets: [
      {
        profiles: "all",
        text: () =>
          "Built web applications and modular, reusable components with HTML5, CSS, and PHP, integrating third-party APIs and optimizing performance and cross-browser compatibility.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Projects
 *
 * Derived from lib/projects.ts — that file is the single source of truth.
 * To add a project to the CV, add it there with `profiles` and a
 * `resumeRank`; nothing in this file needs to change.
 * ------------------------------------------------------------------ */

export type ResumeProject = {
  /** Stable id, shared with lib/projects.ts — used in the ?projects= param. */
  id: number;
  name: string;
  url?: string;
  summary: string;
  stack: string[];
  profiles: ProfileId[];
};

export const projects: ResumeProject[] = siteProjects
  // A project without `profiles` is site-only and never reaches a CV.
  .filter((p) => p.profiles && p.profiles.length > 0)
  .slice()
  .sort((a, b) => (a.resumeRank ?? Infinity) - (b.resumeRank ?? Infinity))
  .map((p) => ({
    id: p.id,
    name: p.resumeName ?? p.title,
    url: p.liveUrl || undefined,
    summary: p.resumeSummary ?? p.description,
    stack: p.resumeStack ?? p.tags,
    profiles: p.profiles as ProfileId[],
  }));

/**
 * The projects a profile would use if nobody touched anything: the top
 * `maxProjects` that are tagged for it, in rank order.
 */
export function defaultProjectIds(profile: ProfileId): number[] {
  return projects
    .filter((p) => p.profiles.includes(profile))
    .slice(0, profileConfig[profile].maxProjects)
    .map((p) => p.id);
}

/** Parse a "1,4,9" query param into ids that actually exist. */
export function parseProjectIds(raw: string | null): number[] | null {
  if (!raw) return null;
  const known = new Set(projects.map((p) => p.id));
  const ids = raw
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && known.has(n));
  return ids.length > 0 ? ids : null;
}

/* ------------------------------------------------------------------ *
 * Open source
 * ------------------------------------------------------------------ */

export type OssItem = {
  name: string;
  summary: string;
  profiles: ProfileId[] | "all";
};

export const openSource: OssItem[] = [
  {
    name: "react-native-ui-house",
    summary:
      "Authored and published a TypeScript React Native UI component library (Avatar, IconButton, Card, Badge, form inputs) to npm — reusable, customizable components for mobile apps.",
    profiles: ["mobile", "fullstack", "react", "javascript"],
  },
  {
    name: "natify-web-bridge",
    summary:
      "Authored and published an npm package that lets web applications trigger native mobile features such as camera, GPS, and push notifications.",
    profiles: ["mobile", "react", "javascript", "fullstack"],
  },
  {
    name: "Developer tooling on npm",
    summary:
      "Authored and published pdfuse-core (browser PDF merging), git-weekly-report, and code-quality-setup (one-command ESLint/Prettier/Husky setup), packaging reusable solutions for common development and CI workflows.",
    profiles: "all",
  },
  {
    name: "M-Widgets",
    summary:
      "Open-source reusable widget and component site for Next.js and React (widgets.mahabeer.online).",
    profiles: ["react", "javascript", "fullstack"],
  },
  {
    name: "Database Studio",
    summary:
      "npm-published developer tool for browsing MySQL and MongoDB data, exploring schemas on an interactive canvas, and exporting A4 schema documentation.",
    profiles: ["node", "fullstack", "sveltekit"],
  },
  {
    name: "Highlightly",
    summary:
      "Browser-based PDF reader for highlighting, annotating, and organizing notes with no desktop install.",
    profiles: ["react", "javascript", "bubble"],
  },
];

/* ------------------------------------------------------------------ *
 * Profile configuration
 * ------------------------------------------------------------------ */

export type ProfileConfig = {
  label: string;
  /** Line directly under the name. */
  headline: string;
  /** Professional summary; the market authorization line is appended at build time. */
  summary: string;
  /** Skill groups to print, in order. Groups not listed are omitted. */
  skillOrder: SkillGroupId[];
  /**
   * Narrow a group's items for this profile. Everything here is still true —
   * the point is signal density, not honesty: a backend CV that lists Tailwind
   * and Framer Motion reads to a screener as a frontend candidate, and a
   * frontend CV that enumerates Docker/Nginx/VPS gets routed to full-stack.
   * A group with no override prints its full item list.
   */
  skillOverrides?: Partial<Record<SkillGroupId, string[]>>;
  /** Cap on Selected Projects for this variant. */
  maxProjects: number;
  /** Cap on Open Source entries. Omit for no cap. */
  maxOss?: number;
  /** Used in the download filename. */
  fileSlug: string;
};

export const profileConfig: Record<ProfileId, ProfileConfig> = {
  fullstack: {
    label: "Full Stack",
    headline: "Full-Stack Software Engineer — React, React Native, Node.js, TypeScript",
    summary:
      "Full-Stack Software Engineer with 4.5+ years building and shipping production web and mobile applications end-to-end using React, Next.js, React Native, Node.js, and TypeScript. Delivered products across healthcare, logistics, and SaaS, led a team of 5+ developers, and authored open-source libraries published on npm. Strong across REST API design, real-time systems (WebSockets), relational and NoSQL databases (PostgreSQL, MySQL, MongoDB), and AWS cloud deployment.",
    skillOrder: [
      "languages",
      "frontend",
      "backend",
      "mobile",
      "databases",
      "cloud",
      "integrations",
      "testing",
      "practices",
    ],
    skillOverrides: {
      // Framer Motion is cosmetic and Netlify reads as hobby-tier next to AWS.
      frontend: [
        "React",
        "Next.js",
        "SvelteKit / Svelte",
        "Redux",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "SSR (server-side rendering)",
        "Responsive and cross-browser web",
      ],
      cloud: [
        "AWS",
        "Docker",
        "Nginx",
        "CI/CD (continuous integration/continuous delivery)",
        "GitHub Actions",
        "Vercel",
        "Google Cloud Platform (GCP)",
        "VPS / Linux",
        "Git",
      ],
    },
    // This is the longest variant — it carries the international
    // authorization line and every skill group — so it is the one that tips
    // onto a third page first. Keep `npm run verify:resume` green when
    // changing these.
    maxProjects: 5,
    maxOss: 4,
    fileSlug: "FullStack",
  },

  react: {
    label: "React / Next.js",
    headline: "Frontend Software Engineer — React, Next.js, TypeScript",
    summary:
      "Frontend-focused Software Engineer with 4.5+ years building production React and Next.js applications in TypeScript. Shipped admin panels, CRMs, and customer-facing products with server-side rendering, responsive and accessible UI, Redux state management, and Tailwind CSS. Authored shared component libraries adopted across products, led a frontend team of engineers, and backs the UI with hands-on Node.js and Express API work.",
    skillOrder: [
      "languages",
      "frontend",
      "mobile",
      "backend",
      "databases",
      "cloud",
      "testing",
      "practices",
    ],
    skillOverrides: {
      // PHP/Laravel actively contradicts a frontend-specialist read; deep DB
      // and infra lists pull the CV into full-stack screens instead.
      languages: ["TypeScript", "JavaScript", "SQL", "Python (working)"],
      backend: ["Node.js", "Express", "RESTful API design", "WebSockets"],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
      cloud: [
        "CI/CD (continuous integration/continuous delivery)",
        "GitHub Actions",
        "Vercel",
        "AWS",
        "Git",
      ],
    },
    maxProjects: 6,
    maxOss: 4,
    fileSlug: "React_NextJS",
  },

  node: {
    label: "Node.js / Backend",
    headline: "Backend Software Engineer — Node.js, Express, TypeScript",
    summary:
      "Backend-leaning Full-Stack Engineer with 4.5+ years designing and shipping Node.js and Express services in TypeScript. Built and maintained RESTful APIs, real-time WebSocket systems, authentication and role-based access control, and payment integrations (Stripe, Razorpay). Hands-on across PostgreSQL, MySQL, MongoDB, Prisma, and Redis, with Docker, Nginx, CI/CD, and AWS deployment.",
    skillOrder: [
      "languages",
      "backend",
      "databases",
      "cloud",
      "integrations",
      "testing",
      "frontend",
      "practices",
    ],
    skillOverrides: {
      // Styling keywords are the single clearest "this is a frontend candidate"
      // signal on a backend screen, so the frontend group is cut to the bone.
      frontend: ["React", "Next.js", "SSR (server-side rendering)"],
      cloud: [
        "AWS",
        "Docker",
        "Nginx",
        "CI/CD (continuous integration/continuous delivery)",
        "GitHub Actions",
        "Google Cloud Platform (GCP)",
        "VPS / Linux",
        "Git",
      ],
    },
    maxProjects: 5,
    fileSlug: "NodeJS_Backend",
  },

  mobile: {
    label: "React Native / Mobile",
    headline: "React Native Engineer — iOS and Android, TypeScript",
    summary:
      "React Native Engineer with 4.5+ years building and releasing cross-platform iOS and Android applications in TypeScript. Shipped apps to the App Store and Google Play covering real-time chat, live GPS tracking, and push notifications (Firebase Cloud Messaging, OneSignal). Authored and published react-native-ui-house, an open-source TypeScript React Native component library, and builds the Node.js APIs behind the apps.",
    skillOrder: [
      "languages",
      "mobile",
      "frontend",
      "backend",
      "databases",
      "cloud",
      "integrations",
      "testing",
      "practices",
    ],
    skillOverrides: {
      frontend: [
        "React",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "SSR (server-side rendering)",
        "Responsive and cross-browser web",
      ],
      cloud: [
        "AWS",
        "CI/CD (continuous integration/continuous delivery)",
        "GitHub Actions",
        "VPS / Linux",
        "Git",
      ],
    },
    maxProjects: 5,
    fileSlug: "ReactNative",
  },

  sveltekit: {
    label: "SvelteKit",
    headline: "Full-Stack Software Engineer — SvelteKit, TypeScript, Node.js",
    summary:
      "Full-Stack Engineer with 4.5+ years, including deep production experience with Svelte and SvelteKit in TypeScript. Delivered a healthcare tele-consultation platform, multiple CRMs, and customer-facing booking products on SvelteKit with Prisma, MySQL, and Tailwind CSS — covering SvelteKit endpoints, SSR, authentication, RBAC, and Stripe/Razorpay payments — deployed on AWS with Docker, Nginx, and CI/CD.",
    skillOrder: [
      "languages",
      "frontend",
      "backend",
      "databases",
      "cloud",
      "integrations",
      "testing",
      "practices",
    ],
    maxProjects: 6,
    fileSlug: "SvelteKit",
  },

  bubble: {
    label: "Bubble / Low-Code",
    headline: "Full-Stack and Low-Code Engineer — Bubble.io, JavaScript, OpenAI",
    summary:
      "Full-Stack and Low-Code Engineer with 4.5+ years, combining production Bubble.io delivery with hands-on JavaScript and TypeScript engineering. Built and launched AI-powered products on Bubble — LinkedScribe AI, ChatMap AI, and Bonds — with OpenAI integrations, Stripe subscription billing, Firebase, and campaign/analytics tooling, and led teams delivering across both low-code and custom-code stacks.",
    skillOrder: [
      "lowcode",
      "integrations",
      "languages",
      "frontend",
      "backend",
      "databases",
      "cloud",
      "practices",
    ],
    maxProjects: 5,
    fileSlug: "Bubble_LowCode",
  },

  javascript: {
    label: "JavaScript / Frontend",
    headline: "JavaScript Software Engineer — React, Node.js, TypeScript",
    summary:
      "JavaScript Engineer with 4.5+ years building production web applications in modern JavaScript and TypeScript. Experienced across React, Next.js, and Svelte/SvelteKit on the front end and Node.js and Express on the back end, with a strong grounding in HTML5, CSS3, responsive and cross-browser development, and REST API integration. Led a frontend team, ran code reviews, and published open-source packages to npm.",
    skillOrder: [
      "languages",
      "frontend",
      "backend",
      "databases",
      "cloud",
      "integrations",
      "testing",
      "practices",
    ],
    maxProjects: 6,
    fileSlug: "JavaScript",
  },
};

/* ------------------------------------------------------------------ *
 * Market configuration
 * ------------------------------------------------------------------ */

export type MarketConfig = {
  label: string;
  location: string;
  /**
   * Appended to the professional summary. International CVs need an explicit,
   * positively-framed work-authorization line; domestic ones must not have it.
   */
  authorizationLine: string | null;
  showLanguages: boolean;
  fileSlug: string;
  /**
   * Domestic-only fields. Indian recruiter search (Naukri and similar) filters
   * on notice period and preferred location as first-class axes, so they earn
   * a line on an India CV. They have no international counterpart and must
   * never appear on the international variant.
   *
   * Deliberately absent everywhere: photo, DOB, gender, marital status,
   * father's name, current/expected CTC, and the "I hereby declare" line.
   * They read as dated, invite bias, and CTC on the document anchors your
   * offer before you can negotiate.
   */
  noticePeriod?: string | null;
  preferredLocations?: string | null;
};

export const marketConfig: Record<Market, MarketConfig> = {
  international: {
    label: "International",
    location: contact.locationInternational,
    authorizationLine:
      "Open to international relocation; visa sponsorship required. MCA (master's-level) degree supports EU Blue Card qualification, subject to the country-specific salary threshold.",
    showLanguages: true,
    fileSlug: "International",
  },
  domestic: {
    label: "India",
    location: contact.locationDomestic,
    authorizationLine: null,
    showLanguages: false,
    fileSlug: "India",
    // Fill these in when applying in India — both are things Indian recruiters
    // actively filter on. e.g. "60 days, negotiable" / "Mohali, Chandigarh, Bengaluru, Pune".
    noticePeriod: null,
    preferredLocations: null,
  },
};

/* ------------------------------------------------------------------ *
 * Resolver
 * ------------------------------------------------------------------ */

export type ResolvedResume = {
  market: Market;
  profile: ProfileId;
  name: string;
  headline: string;
  summary: string;
  contactLines: string[];
  skills: { label: string; items: string[] }[];
  experience: { title: string; company: string; location: string; period: string; bullets: string[] }[];
  projects: ResumeProject[];
  openSource: OssItem[];
  education: typeof education;
  languages: { name: string; level: string }[];
  noticePeriod: string | null;
  preferredLocations: string | null;
};

const matches = (tags: ProfileId[] | "all", profile: ProfileId) =>
  tags === "all" || tags.includes(profile);

export function buildResume(
  market: Market,
  profile: ProfileId,
  /**
   * Explicit project selection from the download dialog. When present it wins
   * outright — the caller chose these, so neither the profile's tags nor its
   * `maxProjects` cap applies. Omit for the profile's defaults.
   */
  selectedProjectIds?: number[] | null
): ResolvedResume {
  const p = profileConfig[profile];
  const m = marketConfig[market];

  const summary = m.authorizationLine
    ? `${p.summary} ${m.authorizationLine}`
    : p.summary;

  const contactLines = [
    m.location,
    contact.phone,
    contact.email,
    contact.linkedin,
    contact.github,
    contact.portfolio,
  ];

  return {
    market,
    profile,
    name: contact.name,
    headline: p.headline,
    summary,
    contactLines,
    skills: p.skillOrder.map((id) => ({
      label: skillGroups[id].label,
      items: p.skillOverrides?.[id] ?? skillGroups[id].items,
    })),
    experience: experience
      .map((job) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        period: job.period,
        bullets: job.bullets
          .filter((b) => matches(b.profiles, profile))
          .map((b) => b.text(metrics)),
      }))
      .filter((job) => job.bullets.length > 0),
    projects: selectedProjectIds?.length
      ? // Keep the pool's rank order rather than the order ids arrived in.
        projects.filter((proj) => selectedProjectIds.includes(proj.id))
      : projects
          .filter((proj) => proj.profiles.includes(profile))
          .slice(0, p.maxProjects),
    openSource: openSource
      .filter((o) => matches(o.profiles, profile))
      .slice(0, p.maxOss ?? Infinity),
    education,
    languages: m.showLanguages ? languages : [],
    noticePeriod: m.noticePeriod ?? null,
    preferredLocations: m.preferredLocations ?? null,
  };
}

/** `Mahabeer_Resume_FullStack_International.pdf` — no spaces, ATS-safe. */
export function resumeFileName(market: Market, profile: ProfileId): string {
  return `Mahabeer_Resume_${profileConfig[profile].fileSlug}_${marketConfig[market].fileSlug}.pdf`;
}
