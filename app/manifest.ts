import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahabeer Portfolio",
    short_name: "Mahabeer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/pic.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/pic.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  }
}
