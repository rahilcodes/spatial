import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareLinks from "@/components/ShareLinks";
import { ARTICLES, SITE } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const art = ARTICLES.find((a) => a.slug === slug);
  if (!art) return {};
  return {
    title: art.metaTitle,
    description: art.description,
    alternates: { canonical: `/news/${art.slug}` },
    openGraph: {
      type: "article",
      publishedTime: art.dateISO,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const art = ARTICLES.find((a) => a.slug === slug);
  if (!art) notFound();

  const url = `${SITE.url}/news/${art.slug}`;
  const related = ARTICLES.filter((a) => a.slug !== art.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: art.title,
    description: art.description,
    datePublished: art.dateISO,
    dateModified: art.dateISO,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/uploads/spatial-alphabet-logo.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "News & Blog", href: "/news" },
          { name: art.tag, href: `/news/${art.slug}` },
        ]}
      />
      {/* Article header */}
      <header className="carto-dark relative overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] pb-[clamp(48px,6vw,80px)] pt-[clamp(56px,7vw,96px)] text-bg-light">
        <div className="wrap relative max-w-[880px]">
          <p className="eyebrow m-0 mb-5 text-accent-light">
            {art.tag} — {art.date.replace(/\s/g, "")} — {art.readingTime.toUpperCase()}
          </p>
          <h1 className="display m-0 text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            {art.title}
          </h1>
        </div>
      </header>

      <article className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(48px,7vw,88px)]">
        <div className="wrap max-w-[760px]">
          {art.body.map((block, i) => (
            <div key={i}>
              {block.h && (
                <h2 className="display mb-3 mt-10 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold first:mt-0">
                  {block.h}
                </h2>
              )}
              <p className="m-0 mb-5 text-[17px] leading-[1.7] text-ink/80">{block.p}</p>
            </div>
          ))}
          <div className="mt-10 border-t border-ink/15 pt-6">
            <ShareLinks url={url} title={art.title} />
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(64px,9vw,100px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">RELATED READING</p>
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/news/${r.slug}`}
              className="grid grid-cols-[minmax(96px,150px)_1fr] items-baseline gap-4 border-b border-ink/15 py-5 transition-colors first-of-type:border-t hover:text-accent-hover"
            >
              <span className="font-mono text-[15px] text-ink/65">{r.date}</span>
              <span className="display text-[clamp(1rem,2vw,1.25rem)] font-semibold">{r.title}</span>
            </Link>
          ))}
          <Link href="/news" className="link-underline mt-8 inline-block text-[14px]">
            All articles →
          </Link>
        </div>
      </section>
    </>
  );
}
