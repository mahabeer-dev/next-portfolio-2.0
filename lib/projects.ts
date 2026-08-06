import type { ProfileId } from "./resume";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  category: string;

  /* ---- Resume fields. This file is the single source of truth: add a
     project here once and it flows to both the site and every CV variant.
     Omit `profiles` and the project stays on the site only. ---- */

  /** CV profiles this project appears under. Omitted = never on the CV. */
  profiles?: ProfileId[];
  /** Lower sorts earlier in the CV pool; each variant takes the top N. Unranked sort last. */
  resumeRank?: number;
  /** Shorter name for the CV, e.g. "ClipMe" rather than "ClipMe Mobile App". */
  resumeName?: string;
  /** Terse achievement-oriented line for the CV. Falls back to `description`. */
  resumeSummary?: string;
  /** Stack for the CV when `tags` carries non-stack labels. Falls back to `tags`. */
  resumeStack?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Minoas Rentals",
    description:
      "Minoas Rentals, rental booking platform developed with Svelte, designed for convenient and flexible vehicle rentals. Users can easily browse available cars, check rates, and book rentals for desired dates.",
    image: "/projects/minoas.webp",
    tags: ["SvelteKit", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    liveUrl: "https://www.minoasrentals.com/",
    category: "sveltekit",
    resumeRank: 1,
    profiles: ["fullstack", "sveltekit", "javascript", "node"],
    resumeSummary:
      "Vehicle rental booking platform with date-based availability and Stripe payments.",
  },
  {
    id: 2,
    title: "LinkedScribe AI",
    description:
      "LinkedScribe is an AI-powered platform designed to simplify LinkedIn content creation. Whether you’re building your personal brand or enhancing your company’s LinkedIn presence, LinkedScribe provides the resources to make every post impactful.",
    image: "/projects/linkedscribe.webp",
    tags: ["Bubble.io", "Stripe", "Open AI"],
    liveUrl: "https://app.linkedscribe.com/",
    category: "bubble",
    resumeRank: 11,
    profiles: ["bubble", "fullstack"],
    resumeSummary:
      "AI-powered LinkedIn content platform with OpenAI generation and Stripe subscription billing.",
    resumeStack: ["Bubble.io", "OpenAI API", "Stripe"],
  },
  {
    id: 3,
    title: "Memantra Wellness",
    description:
      "MeMantra Wellness is a holistic nutrition and wellness platform designed to empower individuals on their journey to better health. We focus on personalized care with our  personalized plans",
    image: "/projects/memantra.webp",
    tags: ["SvelteKit", "Tailwind CSS", "Razorpay", "VPS", "Mysql"],
    liveUrl: "https://memantra.co.in/",
    category: "sveltekit",
    resumeRank: 7,
    profiles: ["sveltekit", "fullstack", "node"],
    resumeSummary:
      "Nutrition and wellness platform with personalized plans and Razorpay checkout, self-hosted on a Linux VPS.",
    resumeStack: ["SvelteKit", "Tailwind CSS", "Razorpay", "MySQL", "VPS"],
  },
  {
    id: 4,
    title: "ClipMe Mobile App",
    description:
      "ClipMe is an Android app that enables seamless clipboard synchronization between your mobile device and other devices, such as your desktop browser or another mobile device.",
    image: "/projects/clipme.webp",
    tags: ["React Native", "Firebase", "Firestore", "One Signal"],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.clipme.extension",
    category: "react-native",
    resumeRank: 5,
    profiles: ["mobile", "fullstack"],
    resumeName: "ClipMe",
    resumeSummary:
      "Android app that syncs the clipboard between mobile and desktop browsers in real time.",
    resumeStack: ["React Native", "Firebase", "Firestore", "OneSignal"],
  },
  {
    id: 5,
    title: "Emrit Android App",
    description:
      "Worked as a Junior React Native Developer on the Android app for this organization, contributing to features and improvements for a better mobile experience.",
    image: "/projects/emrit.webp",
    tags: ["React Native", "Android", "Mobile"],
    liveUrl: "https://emrit.io/about/",
    category: "react-native",
    resumeRank: 14,
    profiles: ["mobile"],
    resumeSummary:
      "Contributed features and improvements to the Android app for a hardware/network product.",
  },
  {
    id: 6,
    title: "Top Notch Security Website",
    description:
      "Frontend development for Top Notch Security’s website using SvelteKit, Tailwind CSS, and Strapi CMS.",
    image: "/projects/topnotch.webp",
    tags: ["SvelteKit", "Tailwind CSS", "Strapi CMS"],
    liveUrl: "https://topnotchsecurityinc.com/",
    category: "sveltekit",
    resumeRank: 10,
    profiles: ["sveltekit", "javascript"],
    resumeName: "Top Notch Security",
    resumeSummary:
      "Marketing website built against a Strapi CMS backend.",
  },
  {
    id: 7,
    title: "ChatMap AI",
    description:
      "Watch entertaining, AI-powered social media trends on an innovative microblogging platform fully loaded with advanced AI content creation tools in a live AI data ecosystem. ChatMap AI is a dedicated AI-content sharing social platform where users can share AI content, build audience, and earn.",
    image: "/projects/chatmap.webp",
    tags: ["Bubble.io", "Stripe", "CSS"],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.chatmap.ai&hl=en",
    category: "bubble",
    resumeRank: 13,
    profiles: ["bubble"],
    resumeSummary:
      "AI-content social platform where users create and share generated content, with Stripe monetization.",
    resumeStack: ["Bubble.io", "OpenAI API", "Stripe"],
  },
  {
    id: 8,
    title: "ElloMed",
    description:
      "Mobile app developer and web frontend developer for ElloMed, contributing across the React Native app and the Next.js website. Built responsive UI and components using Tailwind CSS.",
    image: "/projects/ellomed.webp",
    tags: ["React Native", "React.js", "Tailwind CSS"],
    liveUrl: "https://www.ellomed.com/",
    category: "reactJs",
    resumeRank: 6,
    profiles: ["mobile", "react", "javascript"],
    resumeSummary:
      "Healthcare product delivered across a React Native app and a Next.js marketing site, with a shared responsive component system.",
    resumeStack: ["React Native", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: 9,
    title: "Skylark Logistics Driver App",
    description:
      "Android and iOS app for drivers at Skylark (Canada) to manage assigned loads, chat with dispatchers, share media, track location, and view history. Built with React Native, realtime communication, and push notifications.",
    image: "/projects/skylark.webp",
    tags: [
      "React Native",
      "WebSockets",
      "Realtime Chat",
      "One Signal",
      "Location Tracking",
    ],
    liveUrl: "",
    category: "react-native",
    resumeRank: 4,
    profiles: ["fullstack", "mobile", "react", "node"],
    resumeSummary:
      "iOS and Android driver app for a Canadian logistics operator: load management, real-time dispatcher chat, media sharing, and live location tracking.",
    resumeStack: ["React Native", "WebSockets", "OneSignal"],
  },
  {
    id: 10,
    title: "Akairis Web App (Landing)",
    description:
      "Frontend development for the Akairis landing web app using SvelteKit and Tailwind CSS, with data modeled via Prisma and MySQL. Focused on responsive UI and clean component architecture.",
    image: "/projects/akairis.webp",
    tags: ["SvelteKit", "Tailwind CSS", "Prisma", "MySQL"],
    liveUrl: "https://akairis.com/",
    category: "sveltekit",
    resumeRank: 9,
    profiles: ["sveltekit", "javascript"],
    resumeName: "Akairis",
    resumeSummary:
      "Landing web app with a clean component architecture and Prisma/MySQL-backed data model.",
  },
  {
    id: 11,
    title: "Lexium World CRM",
    description:
      "Full-stack CRM built with SvelteKit and integrated with n8n for WhatsApp bot automation. Customers register household appliance complaints via WhatsApp; complaints appear in the admin panel where Super Admin creates Sub Admins, and Sub Admins create Team Members and assign complaints. Complaints are tracked with milestones until completion, requiring customer OTP to mark as done.",
    image: "/projects/lexium.webp",
    tags: [
      "SvelteKit",
      "Prisma",
      "MySQL",
      "n8n",
      "WhatsApp API",
      "Tailwind CSS",
    ],
    liveUrl: "https://lexiumworld.com/",
    category: "sveltekit",
    resumeRank: 2,
    profiles: ["fullstack", "sveltekit", "node", "bubble"],
    resumeSummary:
      "Full-stack CRM with an n8n-powered WhatsApp bot: customers file complaints over WhatsApp, and multi-level admins assign and track them to OTP-verified completion.",
  },
  {
    id: 12,
    title: "Sirlekh Website & CRM",
    description:
      "Full-stack development for Sirlekh’s website and internal CRM using SvelteKit, Prisma, and MySQL. Implemented responsive UI with Tailwind CSS and Gemini-powered features to assist content and workflows.",
    image: "/projects/sirlekh.webp",
    tags: ["SvelteKit", "Prisma", "MySQL", "Tailwind CSS", "Gemini"],
    liveUrl: "https://www.sirlekhtv.com/",
    category: "sveltekit",
    resumeRank: 8,
    profiles: ["sveltekit", "fullstack"],
    resumeSummary:
      "Public website plus internal CRM with Gemini-assisted content workflows.",
    resumeStack: ["SvelteKit", "Prisma", "MySQL", "Gemini API"],
  },
  {
    id: 13,
    title: "Cultivaid CRM",
    description:
      "CRM platform with roles for Super Admin, Agronomist, Farmer, and Student. Shares farming guides, tools, and information with notifications for new crops and training materials. Includes messaging between team members.",
    image: "/projects/cultivaid.webp",
    tags: ["Next.js", "MySQL", "Prisma", "NextAuth", "JWT"],
    liveUrl: "https://cultivaid.vercel.app/",
    category: "nextjs",
    resumeRank: 3,
    profiles: ["fullstack", "react", "node", "javascript"],
    resumeSummary:
      "Multi-role agriculture CRM (Super Admin, Agronomist, Farmer, Student) with role-based access control, notifications, and in-app messaging.",
  },
  {
    id: 14,
    title: "Bonds Relationship App",
    description:
      "Relationship coaching app built on Bubble. Integrated OpenAI-driven guidance, Firebase, Google Tag Manager, and Facebook Ad Campaign tracking. Delivered web and Android app experience.",
    image: "/projects/bonds.webp",
    tags: [
      "Bubble.io",
      "OpenAI API",
      "Firebase",
      "Google Tag Manager",
      "Facebook Ad Campaign",
    ],
    liveUrl: "https://www.heybonds.com/",
    category: "bubble",
    resumeRank: 12,
    profiles: ["bubble"],
    resumeName: "Bonds",
    resumeSummary:
      "Relationship coaching product on web and Android with OpenAI-driven guidance, Firebase, and campaign/analytics tracking.",
    resumeStack: ["Bubble.io", "OpenAI API", "Firebase", "Google Tag Manager"],
  },
];
