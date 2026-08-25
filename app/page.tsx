import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import TrustMarquee from "@/components/TrustMarquee";
import ServicesIndex from "@/components/ServicesIndex";
import StatsBand from "@/components/StatsBand";
import IndustriesStrip from "@/components/IndustriesStrip";
import PilotCTA from "@/components/PilotCTA";
import NewsPreview from "@/components/NewsPreview";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Spatial Alphabet — AI-Enabled Geospatial & Engineering" },
  description:
    "Geospatial intelligence, engineering design, BIM, and software — delivered first-time-right by dual-shore teams in Texas and Hyderabad.",
  alternates: { canonical: "/" },
};

const WHY_POINTS = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" r="12" stroke="#0C1B33" strokeWidth="1.4" />
        <path d="M9.5 15.5l4 4 7-8" stroke="#00A8E8" strokeWidth="1.6" fill="none" />
      </svg>
    ),
    title: "100% quality, zero rework",
    desc: "Rigorous training and strict QC protocols mean deliverables ship right the first time. No revision cycles baked into your budget.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="11" cy="15" r="8" stroke="#0C1B33" strokeWidth="1.4" />
        <circle cx="19" cy="15" r="8" stroke="#00A8E8" strokeWidth="1.4" />
      </svg>
    ),
    title: "Dual-shore delivery",
    desc: "US leadership in Keller, TX sets the standard; our Hyderabad ODC executes at scale. Speed and quality, at a cost structure competitors can't match.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" r="12" stroke="#0C1B33" strokeWidth="1.4" />
        <path d="M15 15l6-6" stroke="#00A8E8" strokeWidth="1.6" />
        <circle cx="15" cy="15" r="1.6" fill="#0C1B33" />
      </svg>
    ),
    title: "~20 years leadership depth",
    desc: "Our leads have run GIS and engineering programs across railroad, water, gas, pipeline, and cadastral work in multiple countries.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="14" height="14" stroke="#0C1B33" strokeWidth="1.4" fill="none" />
        <path d="M14 14l10 10M24 24v-7M24 24h-7" stroke="#00A8E8" strokeWidth="1.6" fill="none" />
      </svg>
    ),
    title: "Pilot programs",
    desc: "Paid or pro bono: prove us on a scoped pilot before you commit a dollar of program budget.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrustMarquee />

      {/* Intro statement */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,130px)]">
        <Reveal className="wrap">
          <p className="eyebrow m-0 mb-7 text-accent-hover">A1 — WHO WE ARE</p>
          <h2 className="display m-0 max-w-[24ch] text-[clamp(1.9rem,4.2vw,3.6rem)] font-semibold leading-[1.12]">
            Spatial data is only valuable when it becomes a decision. We make that happen —{" "}
            <em className="border-b-[3px] border-accent not-italic">first time, every time.</em>
          </h2>
          <div className="mt-9 flex flex-wrap items-baseline justify-between gap-6">
            <p className="m-0 max-w-[58ch] text-[16.5px] leading-[1.65] text-ink/72">
              Incorporated in 2019 and led by a team with ~20 years in GIS and engineering design,
              Spatial Alphabet pairs US leadership in Keller, Texas with a large offshore
              development center in Hyderabad — one team, two shores, first-time-right output.
            </p>
            <Link href="/who-we-are" className="link-underline text-[15px]">
              Who We Are →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* What We Deliver — services index */}
      <section id="services" className="scroll-mt-24 bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
        <div className="wrap">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-7">
            <p className="eyebrow m-0 text-accent-hover">B1 — WHAT WE DELIVER</p>
            <h2 className="display m-0 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold">
              Four capability pillars. One accountable team.
            </h2>
          </div>
          <ServicesIndex />
        </div>
      </section>

      {/* Why Spatial Alphabet */}
      <section className="bg-bg-light-2 px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,120px)]">
        <div className="wrap flex flex-wrap gap-[clamp(36px,5vw,80px)]">
          <Reveal className="min-w-0 flex-[1_1_320px]">
            <p className="eyebrow m-0 mb-[22px] text-accent-hover">B2 — WHY SPATIAL ALPHABET</p>
            <h2 className="display m-0 text-[clamp(1.9rem,3.8vw,3.1rem)] font-semibold leading-[1.12]">
              Zero rework isn&apos;t a slogan. It&apos;s our QC protocol.
            </h2>
            <p className="m-0 mt-[22px] max-w-[44ch] text-[16px] leading-[1.65] text-ink/70">
              Every deliverable passes rigorous training-backed quality control before it reaches
              you. That discipline is why clients stop budgeting for revision cycles.
            </p>
          </Reveal>
          <div className="grid min-w-0 flex-[1.4_1_380px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[clamp(24px,3vw,40px)]">
            {WHY_POINTS.map((pt, i) => (
              <Reveal key={pt.title} delay={i * 60} className="border-t-2 border-ink pt-[18px]">
                {pt.icon}
                <h3 className="display m-0 mb-2 mt-3.5 text-[18px] font-semibold">{pt.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-ink/70">{pt.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
      <IndustriesStrip />
      <PilotCTA />
      <NewsPreview />
    </>
  );
}
