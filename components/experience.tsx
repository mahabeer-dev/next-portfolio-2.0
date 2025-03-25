"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { FadeIn, StaggerChildren, StaggerItem } from "./animations"

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "Jan 2021 - Present",
      description: [
        "Led the development of the company's flagship SaaS product, improving performance by 40%",
        "Managed a team of 5 developers, implementing agile methodologies that increased sprint velocity by 25%",
        "Architected and implemented a component library used across multiple products",
        "Collaborated with design and product teams to create intuitive user experiences",
      ],
      skills: ["React", "TypeScript", "Next.js", "Redux", "GraphQL"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions LLC",
      location: "Austin, TX",
      period: "Mar 2018 - Dec 2020",
      description: [
        "Developed responsive web applications for clients across various industries",
        "Implemented CI/CD pipelines that reduced deployment time by 50%",
        "Optimized existing applications for performance and accessibility",
        "Mentored junior developers and conducted code reviews",
      ],
      skills: ["JavaScript", "React", "Node.js", "CSS/SCSS", "Jest"],
    },
    {
      title: "Web Developer Intern",
      company: "StartUp Ventures",
      location: "Remote",
      period: "Jun 2017 - Feb 2018",
      description: [
        "Assisted in the development of the company's marketing website",
        "Created interactive UI components using modern JavaScript frameworks",
        "Participated in daily stand-ups and sprint planning meetings",
        "Gained experience with version control and collaborative development",
      ],
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
    },
  ]

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 overflow-hidden">
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
        <StaggerChildren className="mx-auto mt-8 sm:mt-12 max-w-3xl space-y-6 sm:space-y-8" initialDelay={0.2}>
          {experiences.map((experience, index) => (
            <StaggerItem key={index} direction="up">
              <Card className="overflow-hidden border-l-4 border-l-primary transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{experience.title}</h3>
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
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
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
  )
}

