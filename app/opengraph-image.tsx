import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

// Default Open Graph image for the homepage and any route without its own.
export const alt = "Mahabeer — Full Stack Developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: "Mahabeer",
    subtitle: "Full Stack Developer — React, Next.js & React Native",
  });
}
