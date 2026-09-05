import Link from "next/link";
import { listArticles, type ArticleRow } from "@/lib/db";
import { ARTICLES } from "@/lib/data";

type Teaser = Pick<ArticleRow, "slug" | "date_label" | "title" | "tag">;

/**
 * Latest three published articles. If the database is unreachable we fall back
 * to the seed list (the same content the DB is seeded from) rather than letting
 * the whole home page fail over this one widget. The error is still logged.
 */
async function latestArticles(): Promise<Teaser[]> {
  try {
    return (await listArticles(true)).slice(0, 3).map(({ slug, date_label, title, tag }) => ({ slug, date_label, title, tag }));
  } catch (e) {
    console.error("[NewsPreview] database unavailable, rendering seed articles:", e);
    return [...ARTICLES]
      .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
      .slice(0, 3)
      .map((a) => ({ slug: a.slug, date_label: a.date, title: a.title, tag: a.tag }));
  }
}

export default async function NewsPreview() {
  const articles = await latestArticles();
  return (
    <section className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
      <div className="wrap">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-7">
          <p className="eyebrow m-0 text-accent-hover">D1 — NEWS &amp; BLOGS</p>
          <Link href="/news" className="link-underline text-[14px]">
            All articles →
          </Link>
        </div>
        {articles.map((art) => (
          <Link
            key={art.slug}
            href={`/news/${art.slug}`}
            className="grid grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-[26px] transition-colors hover:text-accent-hover sm:grid-cols-[minmax(96px,150px)_1fr_auto]"
          >
            <span className="font-mono text-[clamp(15px,1.6vw,19px)] text-ink/65">{art.date_label}</span>
            <span className="display text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold tracking-[-0.01em]">
              {art.title}
            </span>
            <span className="hidden rounded-full border border-ink/25 px-2.5 py-[5px] font-mono text-[11px] tracking-[.12em] text-ink/65 sm:inline-block">
              {art.tag}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Instant placeholder shown while the article list streams in, so navigation to the home page never waits on the database. */
export function NewsPreviewSkeleton() {
  return (
    <section aria-hidden="true" className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
      <div className="wrap">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-7">
          <p className="eyebrow m-0 text-accent-hover">D1 — NEWS &amp; BLOGS</p>
          <span className="text-[14px] text-ink/50">All articles →</span>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid animate-pulse grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-[26px]">
            <span className="block h-4 w-20 rounded bg-ink/10" />
            <span className="block h-5 w-3/4 rounded bg-ink/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
