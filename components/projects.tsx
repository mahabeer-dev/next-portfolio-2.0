"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "./animations";
import { projects as allProjects } from "@/lib/projects";
import { useMemo, useState } from "react";

type ProjectsProps = {
  limit?: number;
  showMoreLink?: boolean;
  showCategoryFilter?: boolean; // show filter controls
};

export default function Projects({
  limit = 4,
  showMoreLink = true,
  showCategoryFilter = true,
}: ProjectsProps) {
  const categories = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.category))),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const currentCategory = showCategoryFilter ? selectedCategory : "all";

    const base =
      currentCategory === "all" || !currentCategory
        ? allProjects
        : allProjects.filter((p) => p.category === currentCategory);

    // If filter UI is shown, ignore limit entirely for a consistent UX.
    const shouldLimit = true;

    return shouldLimit && typeof limit === "number"
      ? base.slice(0, limit)
      : base;
  }, [selectedCategory, limit, showCategoryFilter]);

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
        {showCategoryFilter && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="capitalize"
              >
                {cat.replace("-", " ")}
              </Button>
            ))}
          </div>
        )}
        <StaggerChildren
          className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2"
          initialDelay={0.2}
          forceVisible={showCategoryFilter}
        >
          {filtered.length > 0 &&
            filtered.map((project) => (
              <StaggerItem key={project.id} direction="up">
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
                      {project.liveUrl && project.liveUrl.trim().length > 0 ? (
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
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
        </StaggerChildren>
        {showMoreLink && (
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/projects">Show More</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
