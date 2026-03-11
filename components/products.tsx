"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./animations";
import { products } from "@/lib/products";
import {
  Rocket,
  ExternalLink,
  Copy,
  Terminal,
  Database,
  Layout,
  FileText,
  MousePointerClick,
} from "lucide-react";

const featureIcons: Record<string, React.ReactNode> = {
  "Interactive Data Viewer": <Database className="h-4 w-4" />,
  "Visual Schema Explorer": <Layout className="h-4 w-4" />,
  "Canvas View": <MousePointerClick className="h-4 w-4" />,
  "PDF Export": <FileText className="h-4 w-4" />,
};

function InstallCommand({ command }: { command: string }) {
  const copy = () => {
    try {
      navigator.clipboard.writeText(command);
    } catch {}
  };

  return (
    <div className="rounded-xl border bg-background/60 shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            Terminal
          </Badge>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2"
            onClick={copy}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-2">
        <Terminal className="h-4 w-4 text-emerald-500 shrink-0" />
        <pre className="text-xs sm:text-sm font-mono overflow-x-auto">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative py-14 sm:py-18 md:py-22">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-36 w-36 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      <div className="px-4 md:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              Tools I&apos;ve built and shipped for the developer community.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 flex flex-col gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-cyan-600/10 p-6 sm:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
                {/* Left: Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-500">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {product.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="text-[10px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    >
                      v{product.version}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-sky-500/30 text-sky-600 dark:text-sky-400"
                    >
                      {product.license}
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-5 max-w-md">
                    <InstallCommand command={product.installCommand} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button asChild>
                      <Link
                        href={product.npmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> View on npm
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right: Features grid */}
                <div className="mt-6 lg:mt-0 lg:w-[380px] shrink-0">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {product.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="rounded-xl border bg-background/60 p-4 flex gap-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500 shrink-0">
                          {featureIcons[feature.title] ?? (
                            <Rocket className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {feature.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": products.map((p) => ({
                "@type": "SoftwareApplication",
                name: p.title,
                description: p.description,
                url: p.npmUrl,
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Cross-platform",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@type": "Person", name: "Mahabeer" },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
