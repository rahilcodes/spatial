import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import DownloadButton from "@/components/DownloadButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SkeletonCards } from "@/components/Skeleton";
import { listDownloads } from "@/lib/db";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Capability deck, service one-pagers, case studies, and the pilot program brief — Spatial Alphabet resources for procurement and program teams.",
  alternates: { canonical: "/downloads" },
};

export const dynamic = "force-dynamic";

/** Streams in behind Suspense so the page shell and navigation never wait on the database. */
async function DownloadGrid() {
  const downloads = await listDownloads(true);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-6">
      {downloads.map((d, i) => {
        const downloadable = Boolean(d.file_path || d.url);
        return (
          <Reveal
            key={d.id}
            delay={(i % 4) * 40}
            className="flex flex-col overflow-hidden rounded-[4px] border border-ink/15 bg-white"
          >
            <div className="relative h-[128px]">
              <Image src={d.img} alt="" fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="m-0 mb-3 font-mono text-[10.5px] tracking-[.14em] text-accent-hover">{d.kind}</p>
              <h2 className="display m-0 mb-2 text-[17px] font-semibold leading-snug">{d.title}</h2>
              <p className="m-0 mb-6 text-[14px] leading-[1.6] text-ink/68">{d.descr}</p>
              {downloadable ? (
                <DownloadButton id={d.id} title={d.title} />
              ) : (
                <p className="m-0 mt-auto w-max rounded-[3px] border border-dashed border-ink/30 px-3 py-2 font-mono text-[10.5px] tracking-[.12em] text-ink/65">
                  CLIENT TO SUPPLY
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Downloads", href: "/downloads" },
        ]}
      />
      <PageHero
        eyebrow="DOWNLOADS — RESOURCES"
        title="Briefing documents for the people who sign off."
        sub="Capability decks, service one-pagers, and case studies — built for procurement reviews, program planning, and forwarding to the colleague who asks the hard questions."
      />
      <section className="bg-bg-light px-[clamp(20px,5vw,48px)] py-[clamp(56px,8vw,96px)]">
        <div className="wrap">
          <Suspense fallback={<SkeletonCards count={4} />}>
            <DownloadGrid />
          </Suspense>
          <p className="m-0 mt-10 max-w-[64ch] text-[15px] leading-[1.65] text-ink/65">
            Need something specific — an insurance certificate, a capability statement for a bid,
            or a reference project summary?{" "}
            <Link href="/contact" className="font-semibold text-accent-hover">
              Ask us directly
            </Link>{" "}
            and we&apos;ll send it within one business day.
          </p>
        </div>
      </section>
    </>
  );
}
