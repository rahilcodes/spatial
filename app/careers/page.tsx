import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareersForm from "@/components/CareersForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";
import { listJobs } from "@/lib/db";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Spatial Alphabet in Keller, TX or Hyderabad, India — GIS, PLS-CADD design, BIM/Revit, AI/ML, and talent acquisition roles on first-time-right teams.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const jobs = listJobs(true).map((j) => ({ ...j, skills: JSON.parse(j.skills_json) as string[] }));

  const jobPostingSchema = jobs.map((j) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: j.blurb,
    employmentType: j.type.toUpperCase().replace("-", "_"),
    datePosted: j.created_at.slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
      logo: `${SITE.url}/uploads/spatial-alphabet-logo.png`,
    },
    jobLocation: j.office.includes("Keller")
      ? [
          {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: "Keller", addressRegion: "TX", addressCountry: "US" },
          },
          {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
          },
        ]
      : [
          {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
          },
        ],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />
      <PageHero
        eyebrow="CAREERS — TWO OFFICES, ONE STANDARD"
        title="Do work that ships right the first time."
        sub="We hire people who take pride in a deliverable that survives client review untouched. In return: real training, real standards, and programs where your work carries weight — in Keller, Texas and Hyderabad, India."
      />

      {/* Culture */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {[
            {
              k: "TRAINING FIRST",
              p: "Nobody touches production data until they've passed our gold-standard calibration. You'll be trained to a spec, not thrown at a backlog.",
            },
            {
              k: "QC IS A CRAFT",
              p: "First-time-right isn't pressure — it's process. Layered review means you learn from every error before it compounds.",
            },
            {
              k: "TWO SHORES, ONE TEAM",
              p: "Keller sets standards, Hyderabad executes at scale, and a daily handoff keeps both shores moving as one program.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 50} className="border-t-2 border-ink pt-[18px]">
              <p className="m-0 mb-2 font-mono text-[12px] tracking-[.12em] text-accent-hover">{c.k}</p>
              <p className="m-0 text-[15px] leading-[1.65] text-ink/72">{c.p}</p>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-[clamp(36px,5vw,56px)]">
          <div className="relative h-[220px] overflow-hidden rounded-[8px] sm:h-[320px]">
            <Image
              src="/assets/gen/ortho-farmland.png"
              alt="Aerial orthophoto of surveyed farmland with field boundaries and access roads"
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover"
            />
          </div>
          <p className="m-0 mt-3 font-mono text-[10.5px] tracking-[.14em] text-ink/65">
            THE WORK — REAL CORRIDORS, REAL COUNTIES, REAL CONSEQUENCES
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-bg-light-2 px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap">
          <p className="eyebrow m-0 mb-2 text-accent-hover">OPEN ROLES</p>
          <h2 className="display m-0 mb-8 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            {jobs.length > 0 ? `${jobs.length} way${jobs.length === 1 ? "" : "s"} in.` : "No open roles right now."}
          </h2>
          <div>
            {jobs.map((j, i) => (
              <Reveal key={j.slug} delay={i * 30} className="border-t border-ink/15 py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <h3 className="display m-0 text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold">
                    {j.title}
                  </h3>
                  <p className="m-0 font-mono text-[11.5px] tracking-[.1em] text-ink/65">
                    {j.office.toUpperCase()} — {j.type.toUpperCase()}
                  </p>
                </div>
                <p className="m-0 mt-2.5 max-w-[68ch] text-[15px] leading-[1.6] text-ink/72">
                  {j.blurb}
                </p>
                {j.skills.length > 0 && (
                  <p className="m-0 mt-2.5 font-mono text-[11.5px] tracking-[.06em] text-ink/65">
                    {j.skills.map((s) => s.toUpperCase()).join(" · ")}
                  </p>
                )}
              </Reveal>
            ))}
            <div className="border-t border-ink/15" />
          </div>
          {jobs.length === 0 && (
            <p className="m-0 mt-6 max-w-[60ch] text-[15px] leading-[1.6] text-ink/70">
              We still review every strong CV — send a general application below and we&apos;ll keep
              it on file for the next opening.
            </p>
          )}
        </div>
      </section>

      {/* Application form */}
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap max-w-[760px]">
          <p className="eyebrow m-0 mb-2 text-accent-hover">APPLY</p>
          <h2 className="display m-0 mb-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
            Send us your CV.
          </h2>
          <p className="m-0 mb-8 text-[15.5px] leading-[1.6] text-ink/70">
            Attach your CV and tell us which role fits. We review every application and reply
            within one week.
          </p>
          <div className="relative">
            <CareersForm roles={jobs.map((j) => j.title)} />
          </div>
        </div>
      </section>
    </>
  );
}
