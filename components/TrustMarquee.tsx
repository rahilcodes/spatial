import { TRUSTED_BY } from "@/lib/data";

export default function TrustMarquee() {
  return (
    <section className="border-b border-ink/10 bg-bg-light px-[clamp(20px,5vw,48px)] py-9">
      <div className="wrap flex flex-wrap items-center gap-x-[clamp(28px,4vw,56px)] gap-y-6">
        <p className="m-0 font-mono text-[11px] tracking-[.14em] text-ink/65">
          TRUSTED BY INDUSTRY LEADERS
        </p>
        <div className="marquee-mask min-w-0 flex-[1_1_320px]">
          <div className="marquee display items-center font-semibold text-ink/65">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="whitespace-nowrap pr-14 text-[16px]">
                {name}
              </span>
            ))}
            {TRUSTED_BY.map((name) => (
              <span key={`${name}-dup`} aria-hidden="true" className="whitespace-nowrap pr-14 text-[16px]">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
