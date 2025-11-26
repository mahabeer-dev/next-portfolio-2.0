import Projects from "@/components/projects"
import { projects } from "@/lib/projects"

export const metadata = {
  title: "Projects | Mahabeer",
  description: "All projects by Mahabeer",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Projects limit={projects.length} showMoreLink={false} showCategoryFilter={true} />
    </main>
  )
}
