import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services, getService, fill } from "@/lib/services";
import { cities, getCity } from "@/lib/locations";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  params: Promise<{ service: string; city: string }>;
};

export function generateStaticParams() {
  return services.flatMap((s) =>
    cities.map((c) => ({ service: s.slug, city: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) return {};

  const url = `${siteUrl}/services/${service.slug}/${city.slug}`;
  const title = fill(service.metaTitle, city.name);
  const description = fill(service.metaDescription, city.name);

  return {
    // Absolute: metaTitle already carries the brand, so skip the layout's
    // "%s | Mahabeer Portfolio" template to avoid a doubled brand suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Mahabeer Portfolio",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@mahabeer_dev",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();

  const h1 = fill(service.h1, city.name);
  const tagline = fill(service.tagline, city.name);
  const url = `${siteUrl}/services/${service.slug}/${city.slug}`;
  const faqs = [...service.faqs, ...city.faqs];

  // Internal links: same service in other cities, other services in this city.
  const otherCities = cities.filter((c) => c.slug !== city.slug);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${service.label} in ${city.name}`,
        item: url,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    serviceType: service.schemaServiceType,
    description: fill(service.metaDescription, city.name),
    url,
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: "IN",
      },
    },
    provider: {
      "@type": "Person",
      name: "Mahabeer",
      url: siteUrl,
      jobTitle: "Full Stack Developer",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-foreground">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {service.label} in {city.name}
            </span>
          </nav>

          <Badge variant="secondary" className="mb-4">
            <MapPin className="mr-1 h-3 w-3" />
            {city.region}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#contact">
                Get a free quote <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">
                <MessageCircle className="mr-1 h-4 w-4" /> Talk to me
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>{city.intro}</p>
            <p>{service.intro}</p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="border-t py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {service.label} for {city.name} businesses — what you get
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.includes.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.stack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Card key={p.step}>
                <CardContent className="pt-6">
                  <div className="mb-2 text-sm font-semibold text-primary">
                    Step {i + 1}
                  </div>
                  <div className="font-semibold">{p.step}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="border-t py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Areas served in &amp; around {city.name}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {city.areas.map((a) => (
              <Badge key={a} variant="secondary">
                {a}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Also serving nearby: {city.nearby.join(", ")}.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {service.label} in {city.name} — FAQs
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-1 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-4 space-y-8">
          <div>
            <h2 className="text-xl font-bold">
              {service.label} in other cities
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <Button key={c.slug} asChild variant="outline" size="sm">
                  <Link href={`/services/${service.slug}/${c.slug}`}>
                    {service.shortLabel} in {c.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Other services in {city.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Button key={s.slug} asChild variant="outline" size="sm">
                  <Link href={`/services/${s.slug}/${city.slug}`}>
                    {s.label} in {city.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to grow your {city.name} business online?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell me what you need and I&apos;ll send a clear, fixed quote — no
            obligation.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/#contact">
              Get a free quote <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
