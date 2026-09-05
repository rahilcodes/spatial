import { SITE } from "@/lib/data";

export type Crumb = { name: string; href: string };

/**
 * Structured data only. Emits a BreadcrumbList JSON-LD block for search
 * engines; the visible "HOME / PAGE" trail was removed at the client's request.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
