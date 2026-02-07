export type Contribution = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  url: string
  type: "npm" | "website"
  installCommand?: string
  usageCode?: string
  features?: string[]
}

export const contributions: Contribution[] = [
  {
    id: 1,
    title: "react-native-ui-house",
    description:
      "A versatile React Native UI component library built with TypeScript, offering reusable, customizable components like Avatar, IconButton, Card, Badge, and inputs.",
    image: "/pic.webp",
    tags: ["React Native", "TypeScript", "UI Library", "MIT"],
    url: "https://www.npmjs.com/package/react-native-ui-house",
    type: "npm",
    installCommand: "npm i react-native-ui-house",
    usageCode: `import { Avatar } from "react-native-ui-house"\n\n<Avatar name="Mahabeer" imageUrl="https://example.com/image.jpg" />`,
  },
  {
    id: 2,
    title: "Widgets for Next.js & React",
    description:
      "An open-source website offering reusable components and widgets for Next.js and React to accelerate UI development.",
    image: "/pic.webp",
    tags: ["Next.js", "React", "UI Components", "Open Source"],
    url: "https://widgets.mahabeer.online",
    type: "website",
    features: ["Card", "Modal", "Table", "Button"],
  },
  {
    id: 3,
    title: "code-quality-setup",
    description:
      "Instantly set up ESLint, Prettier, Husky, and lint-staged for your Node.js projects with a single command.",
    image: "/pic.webp",
    tags: ["CLI", "Tooling", "DX", "Open Source"],
    url: "https://www.npmjs.com/package/code-quality-setup",
    type: "npm",
    installCommand: "npx code-quality-setup",
  },
  {
    id: 4,
    title: "git-weekly-report",
    description:
      "Generate weekly git reports for your projects. Perfect for developers who need to submit daily updates or weekly summaries.",
    image: "/pic.webp",
    tags: ["CLI", "Git", "Productivity", "Reporting"],
    url: "https://www.npmjs.com/package/git-weekly-report",
    type: "npm",
    installCommand: "npx git-weekly-report",
  },
]

