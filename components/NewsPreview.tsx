import Link from "next/link";
import { ARTICLES } from "@/lib/data";

export default function NewsPreview() {
  return (
    <section className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
      <div className="wrap">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-7">
          <p className="eyebrow m-0 text-accent-hover">D1 — NEWS &amp; BLOGS</p>
          <Link href="/news" className="link-underline text-[14px]">
            All articles →
          </Link>
        </div>
        {ARTICLES.map((art) => (
          <Link
            key={art.slug}
            href={`/news/${art.slug}`}
            className="grid grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-[26px] transition-colors hover:text-accent-hover sm:grid-cols-[minmax(96px,150px)_1fr_auto]"
          >
            <span className="font-mono text-[clamp(15px,1.6vw,19px)] text-ink/65">{art.date}</span>
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
