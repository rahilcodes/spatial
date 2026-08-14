import Link from "next/link";

const STEPS = [
  {
    num: "01 — SCOPE",
    desc: "We define a bounded, representative work package with you — real data, real specs, one to three weeks.",
  },
  {
    num: "02 — DELIVER",
    desc: "Our dual-shore team executes under the same QC protocol as a full engagement. No demo-grade shortcuts.",
  },
  {
    num: "03 — EVALUATE",
    desc: "You audit the deliverables against your own acceptance criteria. Then decide — with evidence, not promises.",
  },
];

type Props = {
  eyebrow?: string;
  heading?: string;
  ctaLabel?: string;
};

export default function PilotCTA({
  eyebrow = "C2 — PILOT PROGRAM",
  heading = "Not ready to commit? Start with a pilot.",
  ctaLabel = "Scope a Pilot →",
}: Props) {
  return (
    <section className="bg-bg-light px-[clamp(20px,5vw,48px)] pb-[clamp(72px,10vw,120px)]">
      <div className="wrap blueprint-panel p-[clamp(36px,6vw,72px)]">
        <p className="eyebrow m-0 mb-[18px] text-accent-hover">{eyebrow}</p>
        <div className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-8">
          <h2 className="display m-0 max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.1]">
            {heading}
          </h2>
          <Link href="/contact" className="btn-solid btn-solid--invert">
            {ctaLabel}
          </Link>
        </div>
        <p className="m-0 mb-9 max-w-[62ch] text-[16px] leading-[1.6] text-ink/72">
          Paid or pro bono — your call. We take a real slice of your program, deliver it to
          production standard, and you evaluate the result before committing anything further.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {STEPS.map((s) => (
            <div key={s.num} className="border-t border-ink/25 pt-4">
              <p className="m-0 mb-2 font-mono text-[12px] text-accent-hover">{s.num}</p>
              <p className="m-0 text-[14.5px] leading-[1.6] text-ink/72">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
