"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Code2Icon,
  DatabaseIcon,
  ServerIcon,
  PaletteIcon,
  LayoutIcon,
  GitBranchIcon,
  TerminalIcon,
  CloudIcon,
} from "lucide-react";
import { StaggerChildren, StaggerItem } from "./animations";

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      icon: <Code2Icon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["React/NextJs", "TypeScript", , "Tailwind CSS", "SvelteJs"],
    },
    {
      category: "Backend",
      icon: <ServerIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["Node.js", "Express", "REST APIs", "SvelteKit"],
    },
    {
      category: "Database",
      icon: <DatabaseIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["MongoDB", "MySQL", "Prisma", "Drizzle"],
    },
    {
      category: "Tools",
      icon: <LayoutIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["VS Code", "Postman", "Chrome DevTools", "pnpm/yarn", "Webpack"],
    },
    {
      category: "Version Control",
      icon: <GitBranchIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["Git", "GitHub", "GitLab", "CI/CD", "Code Reviews"],
    },
    {
      category: "Deployment",
      icon: <CloudIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
      items: ["Vercel", "Netlify", "AWS", "VPS"],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Skills & Technologies
            </h2>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-base xl:text-lg">
              Here are some of the technologies and tools I work with.
            </p>
          </div>
        </div>
        <StaggerChildren
          className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initialDelay={0.2}
        >
          {skills.map((skill, index) => (
            <StaggerItem key={index} direction="up">
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="rounded-full bg-primary/10 p-2 sm:p-3 text-primary">
                      {skill.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">
                      {skill.category}
                    </h3>
                    <ul className="space-y-1 sm:space-y-2 text-center text-xs sm:text-sm text-muted-foreground">
                      {skill.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
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
