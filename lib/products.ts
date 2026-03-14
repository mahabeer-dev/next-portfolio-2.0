export type Product = {
  id: number
  title: string
  tagline: string
  description: string
  url: string
  npmUrl?: string
  installCommand?: string
  version?: string
  license?: string
  tags: string[]
  features: {
    title: string
    description: string
  }[]
  techStack: string[]
}

export const products: Product[] = [
  {
    id: 1,
    title: "Database Studio",
    tagline: "Explore, visualize & document your databases",
    description:
      "A high-performance, full-stack database viewer and schema explorer. Designed for developers and DBAs, it provides a modern interface to explore, analyze, and document MySQL and MongoDB databases — all from a single command.",
    url: "https://www.npmjs.com/package/database-studio",
    npmUrl: "https://www.npmjs.com/package/database-studio",
    installCommand: "npx database-studio",
    version: "1.0.7",
    license: "MIT",
    tags: ["Developer Tool", "MySQL", "MongoDB", "CLI", "Full-Stack"],
    features: [
      {
        title: "Interactive Data Viewer",
        description: "Browse data with a paginated table for MySQL tables and MongoDB collections.",
      },
      {
        title: "Visual Schema Explorer",
        description: "Grid-based schema view with interactive cards and dynamic color-coding.",
      },
      {
        title: "Canvas View",
        description: "Drag-and-drop schema visualization with table relationships on a canvas.",
      },
      {
        title: "PDF Export",
        description: "Generate professional A4 schema documentation with a single click.",
      },
    ],
    techStack: ["React 18", "Express 5", "Tailwind CSS", "Radix UI", "Vite", "Puppeteer"],
  },
  {
    id: 2,
    title: "Highlightly",
    tagline: "PDF highlighting & annotation in the browser",
    description:
      "A web-based PDF highlighting and annotation tool. Highlight text, add notes, and organize your reading — all in the browser. No install required.",
    url: "https://highlightly.mahabeer.online",
    tags: ["Web App", "PDF", "Annotation", "Productivity", "Reader"],
    features: [
      {
        title: "PDF Highlighting",
        description: "Highlight text in PDFs with customizable colors.",
      },
      {
        title: "Annotations & Notes",
        description: "Add notes and comments linked to selected text.",
      },
      {
        title: "Browser-Based",
        description: "Works entirely in the browser — no desktop install.",
      },
      {
        title: "Organized Reading",
        description: "Keep your highlights and notes in one place.",
      },
    ],
    techStack: ["React", "PDF.js", "TypeScript", "Tailwind CSS"],
  },
]
