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
  {
    id: 5,
    title: "Emrit Android App",
    description:
      "Worked as a Junior React Native Developer on the Android app for this organization, contributing to features and improvements for a better mobile experience.",
    image: "/projects/emrit.webp",
    tags: ["React Native", "Android", "Mobile"],
    liveUrl: "https://emrit.io/about/",
    category: "react-native",
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
  },
  {
    id: 7,
    title: "ChatMap AI",
    description:
      "Watch entertaining, AI-powered social media trends on an innovative microblogging platform fully loaded with advanced AI content creation tools in a live AI data ecosystem. ChatMap AI is a dedicated AI-content sharing social platform where users can share AI content, build audience, and earn.",
    image: "/projects/chatmap.webp",
    tags: ["Bubble.io", "Stripe", "CSS"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.chatmap.ai&hl=en",
    category: "bubble",
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
  },
  {
    id: 10,
    title: "Akairis Web App",
    description:
      "Frontend development for the Akairis landing web app using SvelteKit and Tailwind CSS, with data modeled via Prisma and MySQL. Focused on responsive UI and clean component architecture.",
    image: "/projects/akairis.webp",
    tags: ["SvelteKit", "Tailwind CSS", "Prisma", "MySQL"],
    liveUrl: "https://akairis.com/",
    category: "sveltekit",
  },
];
