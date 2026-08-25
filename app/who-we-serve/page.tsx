import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import PilotCTA from "@/components/PilotCTA";
import Reveal from "@/components/Reveal";
import { INDUSTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Electrical Utilities, Telecommunications, Oil & Gas, Transportation, and Government & Public Sector — five sectors served from one US + India delivery model.",
  alternates: { canonical: "/who-we-serve" },
};

export default function WhoWeServePage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Who We Serve", href: "/who-we-serve" },
        ]}
      />
      <PageHero
        eyebrow="WHO WE SERVE — FIVE SECTORS"
        title="Five sectors, one delivery model."
        sub="Spatial Alphabet applies its engineering, AI-powered geospatial, application-development, and talent-acquisition capabilities across five core industry sectors — the same US + India team, applied locally in each market."
      >
        <nav aria-label="Industries on this page" className="mt-9 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((ind) => (
            <a
              key={ind.slug}
              href={`#${ind.slug}`}
              className="rounded-[3px] border border-bg-light/30 px-3.5 py-2 font-mono text-[11.5px] tracking-[.08em] text-bg-light/80 transition-colors hover:border-accent hover:text-accent-light"
            >
              {ind.name.toUpperCase()}
            </a>
          ))}
        </nav>
      </PageHero>

      {INDUSTRIES.map((ind, i) => (
        <section
          key={ind.slug}
          id={ind.slug}
          className={`scroll-mt-24 px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)] ${
            i % 2 === 1 ? "bg-bg-light-2" : "bg-bg-light"
          }`}
        >
          <div
            className={`wrap flex flex-wrap gap-[clamp(32px,5vw,72px)] ${
              i % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <Reveal className="min-w-0 flex-[1_1_340px]">
              <p className="eyebrow m-0 mb-3 text-accent-hover">
                {String(i + 1).padStart(2, "0")} / 05 — INDUSTRY
              </p>
              <h2 className="display m-0 mb-3 text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold">
                {ind.name}
              </h2>
              <p className="m-0 mb-6 max-w-[52ch] text-[16px] leading-[1.65] text-ink/75">{ind.line}</p>
              <figure className="m-0">
                <div className="relative mb-2 h-[240px] max-w-[540px] overflow-hidden rounded-[8px] border border-ink/10">
                  <Image
                    src={ind.img}
                    alt={ind.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="m-0 max-w-[540px] font-mono text-[10.5px] leading-relaxed tracking-[.06em] text-ink/60">
                  {ind.caption}
                </figcaption>
              </figure>
            </Reveal>
            <div className="min-w-0 flex-[1.05_1_360px]">
              <div className="mb-8 flex flex-col gap-4">
                {ind.narrative.map((para, k) => (
                  <p key={k} className="m-0 max-w-[64ch] text-[15.5px] leading-[1.7] text-ink/78">
                    {para}
                  </p>
                ))}
              </div>
              <p className="m-0 mb-5 font-mono text-[11px] tracking-[.14em] text-ink/65">HOW WE HELP</p>
              <div className="flex flex-col gap-5">
                {ind.help.map((h, j) => (
                  <Reveal key={h.title} delay={j * 40} className="border-t border-ink/20 pt-3.5">
                    <h3 className="display m-0 mb-1 text-[16px] font-semibold">{h.title}</h3>
                    <p className="m-0 text-[14px] leading-[1.6] text-ink/70">{h.desc}</p>
                  </Reveal>
                ))}
              </div>
              <Link
                href="/contact"
                className="hit-area mt-7 inline-block text-[14px] font-semibold text-accent-hover"
              >
                Scope a pilot in {ind.name.toLowerCase()} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      <div className="pt-[clamp(24px,4vw,48px)]">
        <PilotCTA />
      </div>
    </>
  );
}
