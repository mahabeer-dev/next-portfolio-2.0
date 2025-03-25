import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndoe-portfolio.com",
    title: "Mahabeer | Full Stack Developer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
    siteName: "Mahabeer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://johndoe-portfolio.com" />
      </head>
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
              url: "https://johndoe-portfolio.com",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Tech Innovations Inc.",
              },
              sameAs: [
                "https://github.com/johndoe",
                "https://linkedin.com/in/johndoe",
                "https://twitter.com/johndoe",
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
