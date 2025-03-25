"use client"

import Link from "next/link"
import { ArrowDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FadeIn } from "./animations"

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-background py-20 text-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <FadeIn>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <motion.span
                  className="text-primary inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  John Doe
                </motion.span>
              </h1>
              <motion.p
                className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Full Stack Developer
              </motion.p>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="mx-auto mt-4 sm:mt-6 max-w-xl text-center text-muted-foreground">
              <p className="mb-6 sm:mb-8 text-sm sm:text-base">
                I build exceptional and accessible digital experiences for the web.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="px-4 sm:px-6">
                <Link href="#contact" aria-label="Get in touch">
                  Get in touch
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-4 sm:px-6">
                <Link href="#projects" aria-label="View my work">
                  View my work
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
      <motion.div
        className="absolute bottom-6 sm:bottom-10 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link
          href="#about"
          className="flex items-center justify-center rounded-full p-1"
          aria-label="Scroll to About section"
        >
          <ArrowDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
        </Link>
      </motion.div>
    </section>
  )
}

