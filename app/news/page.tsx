import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { SkeletonRows } from "@/components/Skeleton";
import { listArticles } from "@/lib/db";

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "Field notes from Spatial Alphabet — quality protocols, geospatial production at scale, and running one team across two shores.",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

/** Streams in behind Suspense so the page shell and navigation never wait on the database. */
async function ArticleList() {
  const articles = await listArticles(true);
  return (
    <>
      {articles.map((art) => (
        <Link
          key={art.slug}
          href={`/news/${art.slug}`}
          className="grid grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-[26px] transition-colors first:border-t hover:text-accent-hover sm:grid-cols-[minmax(96px,150px)_1fr_auto]"
        >
          <span className="font-mono text-[clamp(15px,1.6vw,19px)] text-ink/65">{art.date_label}</span>
          <span>
            <span className="display block text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold tracking-[-0.01em]">
              {art.title}
            </span>
            <span className="mt-1.5 block text-[14px] leading-[1.55] text-ink/65">
              {art.description}
            </span>
          </span>
          <span className="hidden rounded-full border border-ink/25 px-2.5 py-[5px] font-mono text-[11px] tracking-[.12em] text-ink/65 sm:inline-block">
            {art.tag}
          </span>
        </Link>
      ))}
      <p className="m-0 mt-8 font-mono text-[11.5px] tracking-[.1em] text-ink/65">
        MORE ARTICLES IN PRODUCTION — CHECK BACK MONTHLY
      </p>
    </>
  );
}

export default function NewsPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "News & Blog", href: "/news" },
        ]}
      />
      <PageHero
        eyebrow="D1 — NEWS & BLOG"
        title="Field notes, not press releases."
        sub="What we learn running geospatial and engineering production at scale — QC protocols, delivery models, and the occasional hard-won checklist."
      />
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap">
          <Suspense fallback={<SkeletonRows rows={4} />}>
            <ArticleList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
