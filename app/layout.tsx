import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mahabeer | Full Stack Developer",
    template: "%s | Mahabeer Portfolio",
  },
  description:
    "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "developer",
    "full stack",
    "react",
    "next.js",
    "portfolio",
    "web development",
  ],
  authors: [{ name: "Mahabeer" }],
  creator: "Mahabeer",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mahabeer | Full Stack Developer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
    siteName: "Mahabeer Portfolio",
    images: [
      {
        url: "/pic.webp",
        width: 1200,
        height: 630,
        alt: "Mahabeer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahabeer | Full Stack Developer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
    images: ["/pic.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahabeer",
              url: siteUrl,
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Independent",
              },
              sameAs: [
                "https://github.com/mahabeer-dev",
                "https://www.linkedin.com/in/mahabeer-dev/",
                "https://x.com/mahabeer_dev",
              ],
              skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
            }),
          }}
        />
      </body>
    </html>
  );
}

import "./globals.css";
