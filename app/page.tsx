import Hero from "@/components/hero"
import About from "@/components/about"
import Blogs from "@/components/blogs"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import OpenSource from "@/components/open-source"
import Products from "@/components/products"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata = {
  title: "Mahabeer | Full Stack Developer",
  description:
    "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["developer", "full stack", "react", "next.js", "portfolio", "web development"],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mahabeer | Full Stack Developer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahabeer | Full Stack Developer",
    description:
      "Professional portfolio of Mahabeer, a full stack developer specializing in React, Next.js, and modern web technologies.",
  },
  robots: { index: true, follow: true },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Blogs />
      <Skills />
      <Experience />
      <Projects />
      <OpenSource />
      <Products />
      <Contact />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Mahabeer Portfolio",
            url: siteUrl,
          }),
        }}
      />
    </main>
  )
}
