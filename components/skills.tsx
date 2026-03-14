"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "./animations";
import {
  Code2,
  Server,
  Database,
  GitBranch,
  Cloud,
  Smartphone,
  Palette,
  Terminal,
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: <Code2 className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/15 text-blue-500",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SvelteJs", "HTML/CSS", "JavaScript"],
  },
  {
    category: "Mobile",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/15 text-violet-500",
    items: ["React Native", "Expo", "iOS", "Android", "Push Notifications"],
  },
  {
    category: "Backend",
    icon: <Server className="h-5 w-5" />,
    color: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-500/15 text-emerald-500",
    items: ["Node.js", "Express", "REST APIs", "SvelteKit", "PHP", "Laravel", "Python"],
  },
  {
    category: "Database",
    icon: <Database className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-500/15 text-orange-500",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Prisma", "Drizzle", "Redis"],
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="h-5 w-5" />,
    color: "from-sky-500 to-blue-500",
    iconBg: "bg-sky-500/15 text-sky-500",
    items: ["Vercel", "AWS", "Docker", "Nginx", "CI/CD", "VPS", "Netlify"],
  },
  {
    category: "Version Control",
    icon: <GitBranch className="h-5 w-5" />,
    color: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-500/15 text-rose-500",
    items: ["Git", "GitHub", "GitLab", "Code Reviews", "Branch Strategy"],
  },
  {
    category: "UI / Design",
    icon: <Palette className="h-5 w-5" />,
    color: "from-fuchsia-500 to-pink-500",
    iconBg: "bg-fuchsia-500/15 text-fuchsia-500",
    items: ["Figma", "Shadcn/ui", "Radix UI", "Responsive Design", "Framer Motion"],
  },
  {
    category: "Tools",
    icon: <Terminal className="h-5 w-5" />,
    color: "from-slate-500 to-zinc-400",
    iconBg: "bg-slate-500/15 text-slate-400",
    items: ["VS Code", "Cursor", "Postman", "Chrome DevTools", "pnpm/yarn", "Webpack", "Vite"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-14 sm:py-18 md:py-22 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="px-4 md:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              The stack I use to build products from idea to production.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initialDelay={0.15}
          delayIncrement={0.08}
        >
          {skills.map((skill, i) => (
            <StaggerItem key={i} direction="up">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl border p-5 h-full bg-background/50 backdrop-blur-sm overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${skill.color} pointer-events-none`} style={{ opacity: 0 }} />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 bg-gradient-to-br ${skill.color} pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${skill.iconBg} transition-colors`}>
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold text-base">{skill.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-[11px] font-normal transition-colors"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
