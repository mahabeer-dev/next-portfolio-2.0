import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/services";
import { cities } from "@/lib/locations";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    absolute: "Services — Web, App & SEO Across the Tricity & Delhi | Mahabeer",
  },
  description:
    "Web development, mobile app development and SEO services for businesses in Mohali, Chandigarh, Panchkula, Zirakpur and Delhi. Built fast, built to rank.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    title: "Services — Web, App & SEO Across the Tricity & Delhi | Mahabeer",
    description:
      "Web development, mobile app development and SEO services for businesses in Mohali, Chandigarh, Panchkula, Zirakpur and Delhi.",
    siteName: "Mahabeer Portfolio",
  },
  robots: { index: true, follow: true },
};

export default function ServicesHub() {
  return (
    <main className="min-h-screen">
      <section className="border-b bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Web, App &amp; SEO services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Fast, modern websites and apps — plus the SEO to get found —
            for businesses across the Tricity and Delhi.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4 space-y-12">
          {services.map((service) => (
            <div key={service.slug}>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {service.label}
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {service.intro}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/services/${service.slug}/${city.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-colors hover:border-primary">
                      <CardContent className="flex items-center justify-between pt-6">
                        <div>
                          <div className="flex items-center gap-1.5 font-semibold">
                            <MapPin className="h-4 w-4 text-primary" />
                            {service.shortLabel} in {city.name}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {city.region}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 border-t pt-8">
            <span className="text-sm text-muted-foreground">Cities:</span>
            {cities.map((c) => (
              <Badge key={c.slug} variant="secondary">
                {c.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
