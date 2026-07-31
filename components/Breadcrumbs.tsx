import Link from "next/link";
import { SITE } from "@/lib/data";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. */
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

  return (
    <nav aria-label="Breadcrumb" className="bg-navy-deepest px-[clamp(20px,5vw,48px)] pt-6 text-bg-light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="wrap m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-[11px] tracking-[.1em] text-bg-light/50">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-accent-light">
                  {c.name.toUpperCase()}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-accent-light">
                    {c.name.toUpperCase()}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
