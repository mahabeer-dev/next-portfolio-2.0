import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { blogs, getBlogBySlug } from "@/lib/blogs";

// Per-post Open Graph image, generated from the blog title at build time.
export const alt = "Blog post — Mahabeer";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return blogs
    .filter((b) => b.platform === "personal")
    .map((b) => ({ slug: b.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  return renderOgImage({
    eyebrow: "Blog",
    title: post?.title ?? "Mahabeer",
    subtitle: post ? `${post.readTime} · Mahabeer` : "Full Stack Developer",
  });
}
