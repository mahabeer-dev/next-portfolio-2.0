"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "./animations";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Team Manager",
      company: "Clousor Technologies",
      location: "Remote",
      period: "Dec 2024 - Present",
      description: [
        "Handling direct foreign clients fro the organization",
        "Managing development team of 5+ developers.",
        "Learning AI/ML for future projects",
      ],
      skills: ["SvelteJs", "Bubble.io", "Client Handling"],
    },
    {
      title: "Fron End Team Lead",
      company: "Ellocent Labs IT Solutions",
      location: "Mohali",
      period: "May 2024 - Nov 2024",
      description: [
        "Building reusable components for future use",
        "Deploying apps on App Store/Google play",
        "Logistics project mobile ( implementing real chat on web sockets, work with google cloud api",
        "Making admin panels on React js ( for managing mobile applications",
        "Mentored junior developers and conducted code reviews",
      ],
      skills: ["Team Leasdership", "React Native", "TypeScript", "SvelteJs"],
    },
    {
      title: "Front End Developer",
      company: "Ellocent Labs IT Solutions",
      location: "Mohali",
      period: "May 2022 - May 2024",
      description: [
        "Assisted in the development of the company's marketing website",
        "Created interactive UI components using modern JavaScript frameworks",
        "Participated in daily stand-ups and sprint planning meetings",
        "Gained experience with version control and collaborative development",
      ],
      skills: [
        "React Native",
        "React",
        "JavaScript",
        "HTML/CSS",
        "Git",
        "Tailwind CSS",
      ],
    },
    {
      title: "Front End developer",
      company: "Freelancer",
      location: "Remote",
      period: "April 2020 - March 2022",
      description: [
        "Developed and delivered web applications using HTML5, CSS, and PHP for various freelance projects.",
        "Built reusable and modular components to optimize development workflows and ensure scalability.",
        "Integrated third-party APIs and services to enhance application features and user experience.",
        "Optimized website performance and ensured cross-browser compatibility.",
      ],
      skills: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <FadeIn direction="up">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                Work Experience
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-base xl:text-lg">
                My professional journey and career highlights.
              </p>
            </div>
          </FadeIn>
        </div>
        <StaggerChildren
          className="mx-auto mt-8 sm:mt-12 max-w-3xl space-y-6 sm:space-y-8"
          initialDelay={0.2}
        >
          {experiences.map((experience, index) => (
            <StaggerItem key={index} direction="up">
              <Card className="overflow-hidden border-l-4 border-l-primary transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">
                          {experience.title}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {experience.company} • {experience.location}
                        </div>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        {experience.period}
                      </div>
                    </div>
                    <ul className="ml-4 sm:ml-6 list-disc space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      {experience.description.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
