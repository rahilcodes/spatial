import type { MetadataRoute } from "next";
import { ARTICLES, SERVICES, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-27");

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/who-we-are", priority: 0.8 },
    { path: "/who-we-serve", priority: 0.8 },
    { path: "/news", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
    { path: "/downloads", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${SITE.url}${p.path}`,
      lastModified,
      priority: p.priority,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified,
      priority: 0.9,
    })),
    ...ARTICLES.map((a) => ({
      url: `${SITE.url}/news/${a.slug}`,
      lastModified: new Date(a.dateISO),
      priority: 0.5,
    })),
  ];
}
