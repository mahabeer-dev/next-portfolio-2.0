"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./animations";
import { blogs, BLOGS_PER_PAGE, getBlogUrl, isExternalBlog } from "@/lib/blogs";
import {
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const platformColors: Record<string, string> = {
  medium: "bg-emerald-600/20 text-emerald-600 dark:text-emerald-400",
  devto: "bg-indigo-600/20 text-indigo-600 dark:text-indigo-400",
  hashnode: "bg-blue-600/20 text-blue-600 dark:text-blue-400",
  personal: "bg-orange-600/20 text-orange-600 dark:text-orange-400",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blogs() {
  if (blogs.length === 0) return null;

  const visibleBlogs = blogs.slice(0, BLOGS_PER_PAGE);
  const hasMore = blogs.length > BLOGS_PER_PAGE;

  return (
    <section id="blogs" className="relative py-14 sm:py-18 md:py-22">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/3 top-16 h-40 w-40 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute left-1/4 bottom-16 h-32 w-32 rounded-full bg-rose-500/15 blur-3xl" />
      </div>

      <div className="px-4 md:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                Blogs
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              Thoughts, tutorials, and things I&apos;ve learned along the way.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {visibleBlogs.map((blog, index) => {
            const href = getBlogUrl(blog);
            const external = isExternalBlog(blog);

            const cardContent = (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`text-[10px] capitalize ${platformColors[blog.platform] ?? platformColors.personal}`}
                    >
                      {blog.platform}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(blog.date)}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold leading-snug group-hover:text-orange-500 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {blog.readTime}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article{" "}
                  {external ? (
                    <ExternalLink className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </div>
              </>
            );

            const className =
              "group rounded-2xl border bg-gradient-to-br from-orange-600/5 to-rose-600/5 p-5 sm:p-6 flex flex-col justify-between cursor-pointer";

            if (external) {
              return (
                <motion.a
                  key={blog.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={className}
                >
                  {cardContent}
                </motion.a>
              );
            }

            return (
              <Link key={blog.id} href={href}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={className}
                >
                  {cardContent}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {hasMore && (
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/blogs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
