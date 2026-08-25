import Image from "next/image";
import { LOGOS } from "@/lib/data";

export default function TrustMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="border-b border-ink/10 bg-bg-light px-[clamp(20px,5vw,48px)] py-9">
      <div className="wrap flex flex-wrap items-center gap-x-[clamp(28px,4vw,56px)] gap-y-6">
        <p className="m-0 shrink-0 font-mono text-[11px] tracking-[.14em] text-ink/65">
          TRUSTED BY INDUSTRY LEADERS
        </p>
        <div className="marquee-mask min-w-0 flex-[1_1_320px]">
          <div className="marquee items-center">
            {row.map((l, i) => (
              <span
                key={`${l.name}-${i}`}
                aria-hidden={i >= LOGOS.length}
                className="flex shrink-0 items-center pr-[clamp(36px,4.5vw,68px)]"
              >
                <Image
                  src={l.src}
                  alt={i < LOGOS.length ? l.name : ""}
                  width={160}
                  height={44}
                  className="h-9 w-auto max-w-[150px] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
