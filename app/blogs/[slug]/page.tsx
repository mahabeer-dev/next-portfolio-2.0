import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogs, getBlogBySlug } from "@/lib/blogs"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
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

        <div className="mt-12 border-t pt-8">
          <Button variant="outline" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all blogs
            </Link>
          </Button>
        </div>
      </article>
    </main>
  )
}
