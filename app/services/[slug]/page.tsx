import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import PilotCTA from "@/components/PilotCTA";
import Reveal from "@/components/Reveal";
import { INDUSTRIES, SERVICES, SITE } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: { absolute: svc.metaTitle },
    description: svc.metaDescription,
    alternates: { canonical: `/services/${svc.slug}` },
  };
}

const TOTAL = SERVICES.length;

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();
  const svc = SERVICES[idx];
  const num = String(idx + 1).padStart(2, "0");

  const related = INDUSTRIES.filter((i) => svc.industries.includes(i.name));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.promise,
    url: `${SITE.url}/services/${svc.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: ["United States", "India"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${svc.name} capabilities`,
      itemListElement: svc.groups.flatMap((g) =>
        g.items.map((it) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it.title } }))
      ),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "What We Deliver", href: "/#services" },
          { name: svc.navName, href: `/services/${svc.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`SERVICE ${num} / 0${TOTAL} — ${SITE.offices.keller.coords}`}
        title={svc.name}
        sub={svc.promise}
        image={{ src: svc.heroImg, alt: svc.heroAlt }}
      >
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/contact" className="btn-solid">
            Scope a Pilot →
          </Link>
          <Link href="/downloads" className="btn-ghost">
            Get the one-pager
          </Link>
        </div>
      </PageHero>

      {/* Problem statement */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
          <Reveal className="min-w-0 flex-[1.15_1_340px]">
            <p className="eyebrow m-0 mb-6 text-accent-hover">THE PROBLEM</p>
            <h2 className="display m-0 max-w-[24ch] text-[clamp(1.7rem,3.6vw,2.9rem)] font-semibold leading-[1.12]">
              {svc.problemTitle}
            </h2>
            <p className="m-0 mt-6 max-w-[68ch] text-[16.5px] leading-[1.65] text-ink/72">
              {svc.problem}
            </p>
          </Reveal>
          <Reveal delay={80} className="min-w-0 flex-[1_1_300px]">
            <div className="relative h-[240px] overflow-hidden rounded-[8px] border border-ink/12 bg-white sm:h-[320px]">
              <Image
                src={svc.sideImg}
                alt={svc.sideAlt}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-contain p-3"
              />
            </div>
            <p className="m-0 mt-3 font-mono text-[10.5px] tracking-[.14em] text-ink/65">
              FIG. {num} — {svc.navName.toUpperCase()} WORK PRODUCT
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we deliver — nested capability groups */}
      <section className="bg-bg-light-2 px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">WHAT WE DELIVER</p>
          <h2 className="display m-0 mb-2 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            {svc.groups.length > 1 ? `${svc.groups.length} capability areas.` : "Scannable scope, no mystery line items."}
          </h2>
          <div className="mt-10 flex flex-col gap-[clamp(44px,6vw,80px)]">
            {svc.groups.map((g, gi) => (
              <Reveal key={g.title}>
                <div className="flex flex-wrap gap-[clamp(28px,4vw,60px)]">
                  <div className="min-w-0 flex-[1.4_1_360px]">
                    <div className="mb-2 flex items-baseline gap-3">
                      <span className="font-mono text-[13px] text-accent-hover">
                        {String(gi + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold leading-tight">
                        {g.title}
                      </h3>
                    </div>
                    {g.intro && (
                      <p className="m-0 mb-5 max-w-[62ch] text-[15.5px] leading-[1.6] text-ink/72">{g.intro}</p>
                    )}
                    <div>
                      {g.items.map((it) => (
                        <div
                          key={it.title}
                          className="grid grid-cols-1 gap-1 border-t border-ink/15 py-4 sm:grid-cols-[minmax(180px,260px)_1fr] sm:gap-6"
                        >
                          <h4 className="display m-0 text-[15.5px] font-semibold leading-snug">{it.title}</h4>
                          <p className="m-0 text-[14.5px] leading-[1.6] text-ink/70">{it.desc}</p>
                        </div>
                      ))}
                      <div className="border-t border-ink/15" />
                    </div>
                  </div>
                  {g.img && (
                    <div className="min-w-0 flex-[1_1_300px]">
                      <div className="relative h-[220px] overflow-hidden rounded-[8px] border border-ink/12 bg-white sm:h-[300px] lg:sticky lg:top-24">
                        <Image
                          src={g.img}
                          alt={g.imgAlt ?? ""}
                          fill
                          sizes="(max-width: 768px) 100vw, 520px"
                          className="object-contain p-3"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & platforms */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(48px,6vw,72px)]">
        <div className="wrap flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <p className="eyebrow m-0 text-accent-hover">TOOLS &amp; PLATFORMS</p>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {svc.tools.map((t) => (
              <li
                key={t}
                className="rounded-[3px] border border-ink/20 px-3 py-1.5 font-mono text-[12px] tracking-[.06em] text-ink/70"
              >
                {t.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="dotgrid-dark relative bg-navy-deepest px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)] text-bg-light">
        <div className="wrap relative">
          <p className="eyebrow m-0 mb-2 text-accent-light">HOW AN ENGAGEMENT RUNS</p>
          <h2 className="display m-0 mb-10 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            Four steps. QC gates at every one.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(24px,3vw,40px)]">
            {svc.process.map((step) => (
              <Reveal key={step.num} className="border-t border-bg-light/20 pt-4">
                <p className="m-0 mb-2 font-mono text-[12px] tracking-[.1em] text-accent-light">
                  {step.num} — {step.title.toUpperCase()}
                </p>
                <p className="m-0 text-[14.5px] leading-[1.6] text-bg-light/70">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related industries */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,100px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">WHERE THIS SERVICE LANDS</p>
          <h2 className="display m-0 mb-7 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            Related industries
          </h2>
          <div className="flex flex-wrap gap-3">
            {related.map((ind) => (
              <Link
                key={ind.slug}
                href={`/who-we-serve#${ind.slug}`}
                className="btn-ghost-dark text-[14px]"
              >
                {ind.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PilotCTA eyebrow="PILOT PROGRAM" heading={`Scope a pilot for ${svc.navName.toLowerCase()}.`} />
    </>
  );
}
