import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogs, getBlogBySlug, getRelatedBlogs, getBlogUrl, isExternalBlog } from "@/lib/blogs"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  MessageCircle,
  Twitter,
} from "lucide-react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

/**
 * Parses inline markup in blog text:
 *   ==text==  → highlighted <mark>
 *   [text](url) → <a> opening in new tab
 */
function RichText({ text }: { text: string }): ReactNode {
  const parts: ReactNode[] = []
  const regex = /==(.+?)==|\[(.+?)\]\((.+?)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      parts.push(
        <mark
          key={match.index}
          className="bg-orange-500/15 text-foreground px-1 py-0.5 rounded"
        >
          {match[1]}
        </mark>
      )
    } else if (match[2] && match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 underline underline-offset-2 hover:text-orange-400 transition-colors"
        >
          {match[2]}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogs
    .filter((b) => b.platform === "personal")
    .map((b) => ({ slug: b.slug }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}

  const blogUrl = `${siteUrl}/blogs/${post.slug}`
  const ogImage = post.coverImage ?? "/pic.webp"

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Mahabeer", url: siteUrl }],
    creator: "Mahabeer",
    publisher: "Mahabeer",
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: blogUrl,
      publishedTime: post.date,
      authors: ["Mahabeer"],
      tags: post.tags,
      siteName: "Mahabeer Portfolio",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
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
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post || !post.content) notFound()
  const blogUrl = `${siteUrl}/blogs/${post.slug}`
  const encodedUrl = encodeURIComponent(blogUrl)
  const encodedTitle = encodeURIComponent(post.title)
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-6">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Blogs
            </Link>
          </Button>
        </div>

        <header>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground mr-1">Share:</span>
            <Button variant="outline" size="sm" asChild>
              <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-1.5 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook className="mr-1.5 h-4 w-4" />
                Facebook
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-1.5 h-4 w-4" />
                X
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-6 border-b" />

          {post.coverImage && (
            <div className="mt-6 overflow-hidden rounded-xl border">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </header>

        <div className="mt-8 space-y-6">
          {post.content.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={i}
                    className="text-xl sm:text-2xl font-bold tracking-tight mt-10 first:mt-0"
                  >
                    <RichText text={block.text} />
                  </h2>
                )
              case "paragraph":
                return (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <RichText text={block.text} />
                  </p>
                )
              case "code":
                return (
                  <div
                    key={i}
                    className="rounded-xl border bg-muted/50 overflow-auto"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 border-b">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                        {block.language}
                      </span>
                    </div>
                    <pre className="px-4 py-3 text-xs sm:text-sm font-mono overflow-x-auto">
                      <code>{block.text}</code>
                    </pre>
                  </div>
                )
              case "image":
                return (
                  <figure key={i} className="my-8">
                    <div className="overflow-hidden rounded-xl border">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={block.width ?? 1200}
                        height={block.height ?? 675}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              default:
                return null
            }
          })}
        </div>

        {(() => {
          const related = getRelatedBlogs(post)
          if (related.length === 0) return null
          return (
            <div className="mt-14 border-t pt-10">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-5">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => {
                  const href = getBlogUrl(r)
                  const external = isExternalBlog(r)
                  const card = (
                    <div className="group rounded-xl border bg-gradient-to-br from-orange-600/5 to-rose-600/5 p-4 sm:p-5 hover:border-orange-500/30 transition-colors h-full flex flex-col">
                      {r.coverImage && (
                        <div className="overflow-hidden rounded-lg border mb-3">
                          <Image
                            src={r.coverImage}
                            alt={r.title}
                            width={600}
                            height={315}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="text-[10px] capitalize bg-orange-600/20 text-orange-600 dark:text-orange-400">
                          {r.platform}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(r.date)}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                        {r.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 flex-1">
                        {r.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {r.tags.slice(0, 3).map((t) => (
                          <Badge key={t} variant="outline" className="text-[9px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                  if (external) {
                    return (
                      <a key={r.id} href={href} target="_blank" rel="noopener noreferrer">
                        {card}
                      </a>
                    )
                  }
                  return (
                    <Link key={r.id} href={href}>
                      {card}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })()}

        <div className="mt-10 border-t pt-8">
          <Button variant="outline" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all blogs
            </Link>
          </Button>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage ?? "/pic.webp",
              datePublished: post.date,
              dateModified: post.date,
              author: {
                "@type": "Person",
                name: "Mahabeer",
                url: siteUrl,
              },
              publisher: {
                "@type": "Person",
                name: "Mahabeer",
                url: siteUrl,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteUrl}/blogs/${post.slug}`,
              },
              keywords: post.tags.join(", "),
              wordCount: post.content
                ?.filter((b) => b.type === "paragraph")
                .reduce((sum, b) => sum + b.text.split(/\s+/).length, 0),
            }),
          }}
        />
      </article>
    </main>
  )
}
