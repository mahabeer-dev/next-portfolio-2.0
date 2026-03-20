import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogs, getBlogUrl, isExternalBlog } from "@/lib/blogs"
import {
  Calendar,
  Clock,
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Articles, tutorials, and dev notes on React, React Native, Firebase, iOS, Android, and full-stack development by Mahabeer.",
  keywords: [
    "blog",
    "tutorials",
    "React",
    "React Native",
    "Firebase",
    "iOS",
    "Android",
    "full stack",
    "web development",
    "Mahabeer",
  ],
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
  openGraph: {
    title: "Blogs | Mahabeer Portfolio",
    description:
      "Articles, tutorials, and dev notes on React, React Native, Firebase, iOS, Android, and full-stack development.",
    type: "website",
    url: `${siteUrl}/blogs`,
    siteName: "Mahabeer Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/pic.webp",
        width: 1200,
        height: 630,
        alt: "Mahabeer Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Mahabeer Portfolio",
    description:
      "Articles, tutorials, and dev notes on React, React Native, Firebase, iOS, Android, and full-stack development.",
    images: ["/pic.webp"],
    creator: "@mahabeer_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
            const blogUrl = external ? href : `${siteUrl}/blogs/${blog.slug}`
            const encodedUrl = encodeURIComponent(blogUrl)
            const encodedTitle = encodeURIComponent(blog.title)
            const shareLinks = {
              linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
              facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
              twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            }

            return (
              <article
                key={blog.id}
                className="group rounded-2xl border bg-gradient-to-br from-orange-600/5 to-rose-600/5 p-5 sm:p-6 hover:border-orange-500/30 transition-colors"
              >
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
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {blog.title}
                    </a>
                  ) : (
                    <Link href={href}>{blog.title}</Link>
                  )}
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
                  <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Share ${blog.title} on LinkedIn`}>
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Share ${blog.title} on Facebook`}>
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={`Share ${blog.title} on X`}>
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="link" size="sm" asChild className="text-orange-500">
                      {external ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          Read <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </a>
                      ) : (
                        <Link href={href}>
                          Read <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-20">
            No blogs yet. Stay tuned!
          </p>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blogs | Mahabeer Portfolio",
            description:
              "Articles, tutorials, and dev notes on React, React Native, Firebase, iOS, Android, and full-stack development.",
            url: `${siteUrl}/blogs`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: blogs.length,
              itemListElement: blogs.map((blog, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${siteUrl}/blogs/${blog.slug}`,
                name: blog.title,
              })),
            },
          }),
        }}
      />
    </main>
  )
}
