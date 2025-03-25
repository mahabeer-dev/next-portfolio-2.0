import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata = {
  title: "John Doe | Full Stack Developer",
  description:
    "Professional portfolio of John Doe, a full stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["developer", "full stack", "react", "next.js", "portfolio", "web development"],
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

