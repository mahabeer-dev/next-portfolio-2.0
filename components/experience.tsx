"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "./animations";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "Indi IT Solutions",
    location: "Mohali",
    period: "Dec 2025 - Present",
    current: true,
    description: [
      "Developing and maintaining full-stack applications using React.js, React Native, Node.js, Express, and MongoDB.",
      "Designing and optimizing RESTful APIs and backend services with Node.js and Express.",
      "Collaborating on database design and performance optimization using MongoDB and MySQL.",
      "Continuously upskilling in AI/ML concepts to align with future project requirements.",
    ],
    skills: ["React Native", "ReactJs", "Express", "NodeJs", "MongoDB", "MySQL"],
  },
  {
    title: "Sr. Full Stack Developer",
    company: "Clousor Technologies Pvt Ltd",
    location: "Remote",
    period: "Dec 2024 - Present",
    current: true,
    description: [
      "Handling direct foreign clients for the organization.",
      "Managing development team of 5+ developers.",
      "Learning AI/ML for future projects.",
    ],
    skills: ["SvelteJs", "Bubble.io", "Client Handling"],
  },
  {
    title: "Front End Team Lead",
    company: "Ellocent Labs IT Solutions",
    location: "Mohali",
    period: "May 2024 - Nov 2024",
    description: [
      "Building reusable components for future use across projects.",
      "Deploying apps on App Store and Google Play.",
      "Led logistics project mobile — real-time chat on WebSockets, Google Cloud API integration.",
      "Building admin panels on React.js for managing mobile applications.",
      "Mentored junior developers and conducted code reviews.",
    ],
    skills: ["Team Leadership", "React Native", "TypeScript", "SvelteJs"],
  },
  {
    title: "Front End Developer",
    company: "Ellocent Labs IT Solutions",
    location: "Mohali",
    period: "May 2022 - May 2024",
    description: [
      "Assisted in the development of the company's marketing website.",
      "Created interactive UI components using modern JavaScript frameworks.",
      "Participated in daily stand-ups and sprint planning meetings.",
      "Gained experience with version control and collaborative development.",
    ],
    skills: ["React Native", "React", "JavaScript", "HTML/CSS", "Git", "Tailwind CSS"],
  },
  {
    title: "Front End Developer",
    company: "Freelancer",
    location: "Remote",
    period: "Apr 2020 - Mar 2022",
    description: [
      "Developed and delivered web applications using HTML5, CSS, and PHP for various freelance projects.",
      "Built reusable and modular components to optimize development workflows.",
      "Integrated third-party APIs and services to enhance application features.",
      "Optimized website performance and ensured cross-browser compatibility.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-14 sm:py-18 md:py-22 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="px-4 md:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              My professional journey and career highlights.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group"
            >
              {/* Timeline line */}
              {i < experiences.length - 1 && (
                <div className="absolute left-[11px] sm:left-[15px] top-[28px] bottom-0 w-px bg-border group-hover:bg-indigo-500/30 transition-colors duration-500" />
              )}

              {/* Timeline dot */}
              <div className={`absolute left-0 sm:left-1 top-[6px] flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                exp.current
                  ? "border-indigo-500 bg-indigo-500/20 text-indigo-500"
                  : "border-border bg-background text-muted-foreground group-hover:border-indigo-500/50 group-hover:text-indigo-500"
              }`}>
                <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`rounded-2xl border p-5 sm:p-6 transition-colors duration-300 ${
                  exp.current
                    ? "bg-gradient-to-br from-indigo-600/8 via-purple-600/4 to-cyan-600/8 border-indigo-500/20 hover:border-indigo-500/40"
                    : "bg-background/50 hover:border-indigo-500/20"
                }`}
              >
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold">{exp.title}</h3>
                      {exp.current && (
                        <Badge className="bg-indigo-500/15 text-indigo-500 border-indigo-500/30 text-[10px] uppercase tracking-wider font-semibold">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">{exp.company}</span>
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </div>
                </div>

                {/* Description */}
                <ul className="mt-4 space-y-2">
                  {exp.description.map((item, j) => (
                    <li key={j} className="flex gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-indigo-500/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-[10px] font-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
