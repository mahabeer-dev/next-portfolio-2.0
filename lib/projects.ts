export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  category: string;
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
  },
];
