"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FadeIn } from "./animations"

export default function About() {
  return (
    <section id="about" className="bg-muted/40 py-12 sm:py-16 md:py-20 overflow-hidden" aria-label="About Me">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <FadeIn direction="up">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">About Me</h2>
                <p className="max-w-[600px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-base xl:text-lg">
                  I'm a passionate full stack developer with a focus on creating intuitive and performant web
                  applications.
                </p>
              </div>
            </FadeIn>
            <div className="space-y-4 text-muted-foreground">
              <FadeIn direction="up" delay={0.1}>
                <p className="text-sm sm:text-base">
                  With over 5 years of experience in web development, I've worked on a variety of projects from small
                  business websites to complex enterprise applications. I specialize in React, Next.js, Node.js, and
                  modern web technologies.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-sm sm:text-base">
                  When I'm not coding, you can find me hiking, reading, or experimenting with new technologies. I'm
                  always looking to learn and grow as a developer.
                </p>
              </FadeIn>
            </div>
            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-2">
                <Button variant="outline" className="w-full min-[400px]:w-auto text-sm" aria-label="Download Resume">
                  Download Resume
                </Button>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] overflow-hidden rounded-full border-4 border-primary">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="John Doe - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

