export type Blog = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  url: string
  platform: "medium" | "devto" | "hashnode" | "personal"
}

export const blogs: Blog[] = [
  // Add your blog posts here. Example:
  // {
  //   id: 1,
  //   title: "Building a Database Explorer with React & Express",
  //   excerpt: "How I built Database Studio — a full-stack tool to visualize MySQL and MongoDB schemas...",
  //   date: "2026-03-01",
  //   readTime: "8 min read",
  //   tags: ["React", "Express", "MySQL", "MongoDB"],
  //   url: "https://medium.com/@your-handle/your-post",
  //   platform: "medium",
  // },
]

export const BLOGS_PER_PAGE = 4

export const blogListUrl = ""
