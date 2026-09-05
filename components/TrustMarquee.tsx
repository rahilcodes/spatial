import Image from "next/image";
import { LOGOS } from "@/lib/data";

/**
 * Trust band shown directly beneath every banner. One short row: the heading
 * sits on the left and the logos scroll beside it, so the band stays compact
 * and the banner above keeps most of the first screen.
 */
export default function TrustMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="shrink-0 border-t border-ink/10 bg-white px-[clamp(16px,4vw,40px)] py-[clamp(10px,1.6vh,16px)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 md:flex-row md:items-center md:gap-[clamp(16px,2.5vw,40px)]">
        <p className="m-0 shrink-0 text-center font-mono text-[10.5px] leading-[1.5] tracking-[.22em] text-ink/60 md:w-[clamp(120px,12vw,180px)] md:border-r md:border-ink/15 md:pr-[clamp(12px,2vw,28px)] md:text-left">
          TRUSTED BY
          <br className="hidden md:inline" /> INDUSTRY LEADERS
        </p>
        <div className="marquee-mask min-w-0 flex-1">
          <div className="marquee items-center">
            {row.map((l, i) => (
              <span
                key={`${l.name}-${i}`}
                aria-hidden={i >= LOGOS.length}
                className="flex shrink-0 items-center justify-center px-[clamp(22px,3vw,48px)]"
              >
                <Image
                  src={l.src}
                  alt={i < LOGOS.length ? l.name : ""}
                  width={240}
                  height={72}
                  className="h-[clamp(34px,4.6vh,48px)] w-auto max-w-[170px] object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
