import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareLinks from "@/components/ShareLinks";
import { SITE } from "@/lib/data";
import { getArticle, listArticles, type ArticleBody } from "@/lib/db";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const art = await getArticle(slug);
  if (!art || !art.published) return {};
  return {
    title: art.meta_title,
    description: art.description,
    alternates: { canonical: `/news/${art.slug}` },
    openGraph: {
      type: "article",
      publishedTime: art.date_iso,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const art = await getArticle(slug);
  if (!art || !art.published) notFound();

  const body = JSON.parse(art.body_json) as ArticleBody;
  const url = `${SITE.url}/news/${art.slug}`;
  const related = (await listArticles(true)).filter((a) => a.slug !== art.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: art.title,
    description: art.description,
    datePublished: art.date_iso,
    dateModified: art.updated_at.slice(0, 10),
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
            {art.tag} — {art.date_label.replace(/\s/g, "")} — {art.reading_time.toUpperCase()}
          </p>
          <h1 className="display m-0 text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            {art.title}
          </h1>
        </div>
      </header>

      {/* Lead image — local paths go through next/image; admin-pasted external
          URLs (e.g. Drive links) render directly since their hosts aren't
          whitelisted for the image optimizer. */}
      <div className="bg-bg-light px-[clamp(20px,5vw,48px)] pt-[clamp(28px,4vw,52px)]">
        <div className="wrap relative h-[220px] max-w-[880px] overflow-hidden rounded-[8px] sm:h-[360px]">
          {art.img.startsWith("/") ? (
            <Image
              src={art.img}
              alt={art.img_alt}
              fill
              priority
              sizes="(max-width: 920px) 100vw, 880px"
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={art.img}
              alt={art.img_alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <article className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(48px,7vw,88px)]">
        <div className="wrap max-w-[760px]">
          {body.map((block, i) => (
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
              <span className="font-mono text-[15px] text-ink/65">{r.date_label}</span>
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
