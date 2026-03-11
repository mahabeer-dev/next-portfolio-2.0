import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogs, getBlogUrl, isExternalBlog } from "@/lib/blogs"
import { Calendar, Clock, ArrowLeft, ExternalLink, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blogs",
  description: "Articles, tutorials, and dev notes by Mahabeer.",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogsPage() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
            All Blogs
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          {blogs.length} article{blogs.length !== 1 ? "s" : ""} published
        </p>

        <div className="mt-10 flex flex-col gap-5">
          {blogs.map((blog) => {
            const href = getBlogUrl(blog)
            const external = isExternalBlog(blog)

            const inner = (
              <div className="group rounded-2xl border bg-gradient-to-br from-orange-600/5 to-rose-600/5 p-5 sm:p-6 hover:border-orange-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="text-[10px] capitalize bg-orange-600/20 text-orange-600 dark:text-orange-400">
                    {blog.platform}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(blog.date)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {blog.readTime}
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold group-hover:text-orange-500 transition-colors">
                  {blog.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {blog.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-orange-500">
                    Read{" "}
                    {external ? (
                      <ExternalLink className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
              </div>
            )

            if (external) {
              return (
                <a key={blog.id} href={href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              )
            }

            return (
              <Link key={blog.id} href={href}>
                {inner}
              </Link>
            )
          })}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-20">
            No blogs yet. Stay tuned!
          </p>
        )}
      </div>
    </main>
  )
}
