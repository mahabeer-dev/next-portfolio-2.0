"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./animations";
import { contributions } from "@/lib/oss";
import {
  Package,
  Globe,
  Copy,
  Star,
  ShieldCheck,
  Code2,
  ExternalLink,
} from "lucide-react";

function CodeSnippet({ text, label }: { text: string; label: string }) {
  const copy = () => {
    try {
      navigator.clipboard.writeText(text);
    } catch {}
  };
  return (
    <div className="rounded-xl border bg-background/60 shadow-sm overflow-auto">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {label}
          </Badge>
          <Button size="sm" variant="outline" className="h-8 px-2" onClick={copy}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="px-4 py-3">
        <pre className="text-xs sm:text-sm font-mono overflow-x-auto">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
}

export default function OpenSource() {
  return (
    <section id="open-source" className="relative py-14 sm:py-18 md:py-22">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-28 w-28 rounded-full bg-sky-500/20 blur-2xl" />
      </div>

      <div className="px-4 md:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                Open Source Showcase
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              Crafted libraries and reusable widgets for mobile and web.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contributions.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`rounded-2xl border p-5 sm:p-6 ${
                item.type === "npm"
                  ? "bg-gradient-to-br from-purple-600/10 to-pink-600/10"
                  : "bg-gradient-to-br from-sky-600/10 to-cyan-600/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    item.type === "npm"
                      ? "bg-purple-600/20 text-purple-600"
                      : "bg-sky-600/20 text-sky-600"
                  }`}
                >
                  {item.type === "npm" ? (
                    <Package className="h-5 w-5" />
                  ) : (
                    <Globe className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                {item.description}
              </p>

              {item.type === "npm" && (
                <div className="mt-5 grid gap-4">
                  {item.installCommand && (
                    <CodeSnippet text={item.installCommand} label="Install" />
                  )}
                  {item.usageCode && (
                    <CodeSnippet text={item.usageCode} label="Usage" />
                  )}
                </div>
              )}

              {item.type === "website" && item.features && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-xl border bg-background/60 p-4"
                    >
                      <div className="text-xs text-muted-foreground">
                        Component
                      </div>
                      <div className="mt-2 text-sm font-medium">{feature}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {item.type === "npm" ? (
                  <>
                    <Button asChild>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> View on npm
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code2 className="mr-2 h-4 w-4" /> Docs
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Explore
                        Widgets
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" /> Visit Site
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": contributions.map((c) => {
                if (c.type === "npm") {
                  return {
                    "@type": "SoftwareSourceCode",
                    name: c.title,
                    description: c.description,
                    url: c.url,
                    programmingLanguage: "TypeScript",
                    license: "MIT",
                    creator: { "@type": "Person", name: "Mahabeer" },
                  };
                } else {
                  return {
                    "@type": "WebSite",
                    name: c.title,
                    url: c.url,
                    description: c.description,
                  };
                }
              }),
            }),
          }}
        />
      </div>
    </section>
  );
}
