import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Incorporated in 2019, Spatial Alphabet pairs ~20 years of GIS and engineering leadership in Keller, TX with a Hyderabad offshore development center.",
  alternates: { canonical: "/who-we-are" },
};

const WAYPOINTS = [
  {
    year: "2019",
    title: "Incorporated in Texas",
    desc: "Spatial Alphabet is founded in Keller, TX by leadership with nearly two decades of GIS and engineering design programs behind them — and one conviction: rework is a process failure, not a cost of doing business.",
  },
  {
    year: "2021",
    title: "Services expansion",
    desc: "From geospatial data services into engineering design, BIM modeling, and application development — one QC protocol carried across every new discipline.",
  },
  {
    year: "2023",
    title: "Hyderabad ODC scale-up",
    desc: "The offshore development center in Hyderabad grows into a full production floor: trained teams across GIS, PLS-CADD design, Revit, and AI annotation, working as one shift-extended team with Texas.",
  },
  {
    year: "TODAY",
    title: "One team, two shores",
    desc: "Six-plus years in, the model is proven: US-facing leadership, Hyderabad execution at scale, and a first-time-right record our clients audit for themselves through pilot programs.",
  },
];

const HERITAGE = [
  "RailRoad",
  "Water",
  "Gas",
  "Pipeline",
  "Water Resources",
  "Urban Planning",
  "Cadastral",
];

export default function WhoWeArePage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Who We Are", href: "/who-we-are" },
        ]}
      />
      <PageHero
        eyebrow={`WHO WE ARE — EST. 2019 — ${SITE.offices.keller.coords}`}
        title={
          <>
            Surveyors of a simple idea: <em className="not-italic text-accent">get it right the first time.</em>
          </>
        }
        sub="Spatial Alphabet exists because the industry normalized rework. We built a company — and a dual-shore delivery model — around refusing to."
      />

      {/* Surveyed-route timeline */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">A1 — THE ROUTE SO FAR</p>
          <h2 className="display m-0 mb-12 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold">
            A surveyed route, not a highlight reel.
          </h2>
          <ol className="relative m-0 list-none p-0 pl-8 sm:pl-12">
            {/* survey line */}
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/25 sm:left-[11px]"
            />
            {WAYPOINTS.map((w, i) => (
              <li key={w.year} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-8 top-1.5 block h-[13px] w-[13px] rotate-45 border sm:-left-12 ${
                    i === WAYPOINTS.length - 1
                      ? "border-accent bg-accent"
                      : "border-ink bg-bg-light"
                  }`}
                />
                <Reveal>
                  <p className="m-0 mb-1 font-mono text-[13px] tracking-[.12em] text-accent-hover">
                    WAYPOINT {String(i + 1).padStart(2, "0")} — {w.year}
                  </p>
                  <h3 className="display m-0 mb-2 text-[clamp(1.2rem,2.4vw,1.6rem)] font-semibold">
                    {w.title}
                  </h3>
                  <p className="m-0 max-w-[62ch] text-[15.5px] leading-[1.65] text-ink/72">{w.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership philosophy */}
      <section className="bg-bg-light-2 px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap flex flex-wrap gap-[clamp(36px,5vw,80px)]">
          <Reveal className="min-w-0 flex-[1_1_340px]">
            <p className="eyebrow m-0 mb-[22px] text-accent-hover">A2 — LEADERSHIP PHILOSOPHY</p>
            <h2 className="display m-0 text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.12]">
              ~20 years of programs where wrong data has consequences.
            </h2>
            <p className="m-0 mt-[22px] max-w-[52ch] text-[16px] leading-[1.65] text-ink/72">
              Our leadership earned its standards on programs where an error surfaces as a field
              crew at the wrong pole, a permit rejected, or a boundary dispute in court. That is
              the bar every Spatial Alphabet deliverable is held to — regardless of which shore
              produced it.
            </p>
          </Reveal>
          <div className="min-w-0 flex-[1_1_320px]">
            <p className="m-0 mb-4 font-mono text-[11px] tracking-[.14em] text-ink/65">
              DOMAINS LED ACROSS MULTIPLE COUNTRIES
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              {HERITAGE.map((h) => (
                <li
                  key={h}
                  className="rounded-[3px] border border-ink/25 px-3.5 py-2 font-mono text-[12.5px] tracking-[.06em] text-ink/75"
                >
                  {h.toUpperCase()}
                </li>
              ))}
            </ul>
            <p className="m-0 mt-6 max-w-[46ch] text-[15px] leading-[1.6] text-ink/65">
              GIS and engineering design programs spanning railroad, water, gas, pipeline, water
              resources, urban planning, and cadastral systems.
            </p>
          </div>
        </div>
      </section>

      {/* Dual-shore model diagram */}
      <section className="dotgrid-dark relative bg-navy-deepest px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)] text-bg-light">
        <div className="wrap relative">
          <p className="eyebrow m-0 mb-2 text-accent-light">A3 — THE DUAL-SHORE MODEL</p>
          <h2 className="display m-0 mb-10 max-w-[24ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold">
            US leadership sets the standard. Hyderabad executes at scale.
          </h2>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-[4px] border border-bg-light/16 bg-navy-panel/80 p-7">
              <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-light">
                {SITE.offices.keller.label}
              </p>
              <p className="m-0 mb-4 font-mono text-[12.5px] text-bg-light/60">
                {SITE.offices.keller.coords}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[14.5px] leading-[1.5] text-bg-light/80">
                <li>Client standards &amp; acceptance criteria</li>
                <li>Engineering oversight &amp; final QC bar</li>
                <li>US-facing program management</li>
                <li>Same-day decisions for blocked work</li>
              </ul>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center font-mono text-[13px] tracking-[.14em] text-accent md:flex-col md:px-4"
            >
              <span className="hidden md:block">⟵&nbsp;24-HR&nbsp;CYCLE&nbsp;⟶</span>
              <span className="md:hidden">⟵ 24-HR CYCLE ⟶</span>
            </div>
            <div className="rounded-[4px] border border-bg-light/16 bg-navy-panel/80 p-7">
              <p className="m-0 mb-1.5 font-mono text-[11px] tracking-[.14em] text-accent-light">
                {SITE.offices.hyderabad.label}
              </p>
              <p className="m-0 mb-4 font-mono text-[12.5px] text-bg-light/60">
                {SITE.offices.hyderabad.coords}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[14.5px] leading-[1.5] text-bg-light/80">
                <li>Trained production teams at scale</li>
                <li>GIS · PLS-CADD · Revit · AI annotation</li>
                <li>Layered QC on every batch</li>
                <li>Structured end-of-day handoffs</li>
              </ul>
            </div>
          </div>
          <p className="m-0 mt-8 max-w-[64ch] text-[15px] leading-[1.65] text-bg-light/65">
            Standards flow one way; questions flow the other. Production never guesses at intent,
            and your program moves while you sleep — an 11.5-hour offset turned into a 24-hour
            work cycle.
          </p>
        </div>
      </section>

      {/* Team grid — intentionally empty slots */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(64px,9vw,110px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">A4 — LEADERSHIP TEAM</p>
          <h2 className="display m-0 mb-8 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            The people behind the protocol.
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-ink/30 bg-bg-light-2/60 p-4 text-center"
              >
                <span
                  aria-hidden="true"
                  className="block h-10 w-10 rounded-full border border-ink/30"
                />
                <p className="m-0 font-mono text-[10.5px] tracking-[.12em] text-ink/65">
                  PHOTO &amp; BIO
                  <br />
                  CLIENT TO SUPPLY
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
        <div className="wrap blueprint-panel flex flex-wrap items-end justify-between gap-8 p-[clamp(36px,6vw,72px)]">
          <div>
            <p className="eyebrow m-0 mb-4 text-accent-hover">NEXT STEP</p>
            <h2 className="display m-0 max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.8rem)] font-semibold leading-[1.1]">
              Judge us by a deliverable, not a deck.
            </h2>
          </div>
          <Link href="/contact" className="btn-solid btn-solid--invert">
            Start a pilot →
          </Link>
        </div>
      </section>
    </>
  );
}
