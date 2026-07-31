import type { Metadata } from "next";
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
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["United States", "India"],
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
        eyebrow={`SERVICE ${num} / 07 — ${SITE.offices.keller.coords}`}
        title={svc.name}
        sub={svc.promise}
      >
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/contact" className="btn-solid">
            Scope a pilot →
          </Link>
          <Link href="/downloads" className="btn-ghost">
            Get the one-pager
          </Link>
        </div>
      </PageHero>

      {/* Problem statement */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <Reveal className="wrap">
          <p className="eyebrow m-0 mb-6 text-accent-hover">THE PROBLEM</p>
          <h2 className="display m-0 max-w-[22ch] text-[clamp(1.7rem,3.6vw,2.9rem)] font-semibold leading-[1.12]">
            {svc.problemTitle}
          </h2>
          <p className="m-0 mt-6 max-w-[68ch] text-[16.5px] leading-[1.65] text-ink/72">
            {svc.problem}
          </p>
        </Reveal>
      </section>

      {/* What we deliver */}
      <section className="bg-bg-light-2 px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">WHAT WE DELIVER</p>
          <h2 className="display m-0 mb-8 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            Scannable scope. No mystery line items.
          </h2>
          <div>
            {svc.deliver.map((d, i) => (
              <Reveal
                key={d.title}
                delay={i * 40}
                className="grid grid-cols-[44px_1fr] gap-3 border-t border-ink/15 py-6 sm:grid-cols-[52px_minmax(200px,320px)_1fr] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-ink/65">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display m-0 text-[18px] font-semibold leading-snug">{d.title}</h3>
                <p className="col-start-2 m-0 text-[15px] leading-[1.6] text-ink/70 sm:col-start-3">
                  {d.desc}
                </p>
              </Reveal>
            ))}
            <div className="border-t border-ink/15" />
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

      <PilotCTA
        eyebrow="PILOT PROGRAM"
        heading={`Scope a pilot for ${svc.navName.toLowerCase()}.`}
      />
    </>
  );
}
