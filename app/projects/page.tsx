import Projects from "@/components/projects"
import { projects } from "@/lib/projects"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata = {
  title: "Projects | Mahabeer",
  description: "All projects by Mahabeer",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    title: "Projects | Mahabeer",
    description: "All projects by Mahabeer",
    images: [{ url: "/pic.webp", width: 1200, height: 630, alt: "Mahabeer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mahabeer",
    description: "All projects by Mahabeer",
    images: ["/pic.webp"],
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Projects limit={projects.length} showMoreLink={false} showCategoryFilter={true} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: p.liveUrl || `${siteUrl}/projects`,
            })),
          }),
        }}
      />
    </main>
  )
}
