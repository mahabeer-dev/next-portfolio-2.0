"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "./animations";

export default function Projects() {
  const projects = [
    {
      title: "Minoas Rentals",
      description:
        "Minoas Rentals, rental booking platform developed with Svelte, designed for convenient and flexible vehicle rentals. Users can easily browse available cars, check rates, and book rentals for desired dates.",
      image: "/projects/minoas.webp",
      tags: ["SvelteKit", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
      liveUrl: "https://www.minoasrentals.com/",
    },
    {
      title: "LinkedScribe AI",
      description:
        "LinkedScribe is an AI-powered platform designed to simplify LinkedIn content creation. Whether you’re building your personal brand or enhancing your company’s LinkedIn presence, LinkedScribe provides the resources to make every post impactful.",
      image: "/projects/linkedscribe.webp",
      tags: ["Bubble.io", "Stripe", "Open AI"],
      liveUrl: "https://app.linkedscribe.com/",
    },
    {
      title: "Memantra Wellness",
      description:
        "MeMantra Wellness is a holistic nutrition and wellness platform designed to empower individuals on their journey to better health. We focus on personalized care with our  personalized plans",
      image: "/projects/memantra.webp",
      tags: ["SvelteKit", "Tailwind CSS", "Razorpay", "VPS", "Mysql"],
      liveUrl: "https://memantra.co.in/",
    },
    {
      title: "ClipMe Mobile App",
      description:
        "ClipMe is an Android app that enables seamless clipboard synchronization between your mobile device and other devices, such as your desktop browser or another mobile device.",
      image: "/projects/clipme.webp",
      tags: ["React Native", "Firebase", "Firestore", "One Signal"],
      liveUrl:
        "https://play.google.com/store/apps/details?id=com.clipme.extension",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-muted/40 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <FadeIn direction="up">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                My Projects
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-base xl:text-lg">
                Here are some of the projects I've worked on.
              </p>
            </div>
          </FadeIn>
        </div>
        <StaggerChildren
          className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2"
          initialDelay={0.2}
        >
          {projects.map((project, index) => (
            <StaggerItem key={index} direction="up">
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="mb-1 sm:mb-2 text-lg sm:text-2xl font-bold">
                    {project.title}
                  </h3>
                  <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" className="text-xs h-8">
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLinkIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
