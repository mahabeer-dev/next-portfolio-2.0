"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const techPills = ["React", "Node.js", "React Native", "TypeScript", "Firebase"];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 md:px-6"
      aria-label="Introduction"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--background))_70%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        className="container flex max-w-4xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={item}
          className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Available for projects
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">Hi, I&apos;m </span>
          <span className="mt-1 block bg-gradient-to-r from-primary via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Mahabeer
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-xl font-medium text-foreground/90 sm:text-2xl md:text-3xl"
        >
          Full Stack Developer
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          I build exceptional digital experiences for the web and mobile —
          from idea to production.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {techPills.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button asChild size="lg" className="group gap-2 px-6 text-base">
            <Link href="#contact" aria-label="Get in touch">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="gap-2 px-6 text-base">
            <Link href="#projects" aria-label="View my work">
              View my work
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
