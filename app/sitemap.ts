import type { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";
import { services } from "@/lib/services";
import { cities } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((b) => b.platform === "personal")
    .map((b) => ({
      url: `${base}/blogs/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const serviceCityEntries: MetadataRoute.Sitemap = services.flatMap((s) =>
    cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...serviceCityEntries,
    ...blogEntries,
  ];
}
