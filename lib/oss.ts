export type Contribution = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  url: string
  type: "npm" | "website"
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
  },
]

