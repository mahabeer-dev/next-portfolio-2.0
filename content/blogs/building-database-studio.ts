import type { BlogPost } from "@/lib/blogs"

const post: BlogPost = {
  id: 1,
  slug: "building-database-studio",
  title: "Building Database Studio — A Full-Stack Database Viewer from Scratch",
  excerpt:
    "How I designed and shipped a developer tool that lets you explore, visualize, and document MySQL & MongoDB databases with a single npx command.",
  date: "2026-03-05",
  readTime: "10 min read",
  tags: ["React", "Express", "MySQL", "MongoDB", "Developer Tools"],
  platform: "personal",
  coverImage: "/pic.webp",
  content: [
    {
      type: "paragraph",
      text: "As a developer who spends a lot of time working with databases, I always felt the friction of switching between different GUI tools — one for MySQL, another for MongoDB, each with a learning curve. I wanted something lightweight that I could spin up instantly inside any project without installing heavy desktop apps. That's how Database Studio was born.",
    },
    {
      type: "heading",
      text: "The Problem",
    },
    {
      type: "paragraph",
      text: "Most database GUIs are either too bloated, paid, or limited to a single database engine. As someone juggling MySQL and MongoDB across multiple projects, I needed a unified interface that could auto-detect the database, display schemas visually, and let me browse data — all from the terminal with zero config.",
    },
    {
      type: "image",
      src: "/blogs/building-database-studio/architecture.webp",
      alt: "Database Studio architecture overview",
      caption: "High-level architecture of Database Studio",
    },
    {
      type: "heading",
      text: "Architecture & Design Decisions",
    },
    {
      type: "paragraph",
      text: "I went with a monorepo-style architecture: a React 18 SPA for the frontend, an Express 5 server for the backend, and a CLI entry point that wires everything together. The key design decision was the Driver Pattern — a DbDriver interface that abstracts all database operations so route handlers never contain database-specific conditionals.",
    },
    {
      type: "code",
      language: "typescript",
      text: `interface DbDriver {
  getDatabaseName(): Promise<string>
  getTables(): Promise<string[]>
  getTableSchema(table: string): Promise<Column[]>
  getTableData(table: string, page: number, limit: number): Promise<Row[]>
}`,
    },
    {
      type: "paragraph",
      text: "The server auto-detects which driver to use based on environment variables — if MYSQL_URL is set, it uses the MySQL driver; if MONGODB_URL or MONGODB_URI is present, it uses the MongoDB driver. This zero-config approach means developers don't have to think about setup.",
    },
    {
      type: "heading",
      text: "The Schema Visualizer",
    },
    {
      type: "paragraph",
      text: "The most challenging and rewarding feature was the visual schema explorer. For MySQL, it's straightforward — SHOW COLUMNS and foreign key queries give you everything. But for MongoDB, there's no predefined schema. I solved this by sampling 100 documents from each collection and inferring field types using a recursive type-merger that handles nested objects and arrays.",
    },
    {
      type: "paragraph",
      text: "The Canvas View takes it further — a drag-and-drop interface where tables are rendered as interactive nodes with relationship edges drawn between them. This was built using absolute positioning and SVG paths rather than pulling in a heavy graph library.",
    },
    {
      type: "heading",
      text: "PDF Export Engine",
    },
    {
      type: "paragraph",
      text: "One feature that got surprisingly positive feedback was the PDF export. It uses Puppeteer under the hood — the server spins up a headless browser, navigates to the schema view with an export flag, and captures multi-page A4 output with full Tailwind CSS fidelity. The print-specific CSS hides all interactive elements and adapts the layout for paper.",
    },
    {
      type: "heading",
      text: "Shipping as an npx Package",
    },
    {
      type: "code",
      language: "bash",
      text: "npx database-studio",
    },
    {
      type: "paragraph",
      text: "The entire app — frontend SPA, Express server, and CLI — is bundled into a single npm package using tsup. The CLI boots the Express server, serves the pre-built React SPA as static assets, and opens the browser automatically. First-time users see a setup mode with inline documentation when no database connection is configured.",
    },
    {
      type: "heading",
      text: "Tech Stack",
    },
    {
      type: "paragraph",
      text: "Frontend: React 18, React Router 6, Tailwind CSS 3, Radix UI, Lucide Icons. Backend: Express 5, Puppeteer, mysql2, MongoDB native driver. Build: Vite for the SPA, tsup for the server and CLI. The entire project compiles down to ~600KB of JavaScript.",
    },
    {
      type: "heading",
      text: "What I Learned",
    },
    {
      type: "paragraph",
      text: "Building Database Studio taught me a lot about shipping developer tools — from designing zero-config CLIs, to handling cross-database abstractions, to thinking about DX from the very first command. If you're working with MySQL or MongoDB, give it a spin and let me know what you think.",
    },
    {
      type: "code",
      language: "bash",
      text: "npx database-studio",
    },
  ],
}

export default post
