import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/data";

export default function IndustriesStrip() {
  return (
    <section className="bg-bg-light py-[clamp(72px,10vw,120px)]">
      <div className="wrap gutter">
        <p className="eyebrow m-0 mb-4 text-accent-hover">C1 — INDUSTRIES</p>
        <h2 className="display m-0 mb-9 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold">
          Where our work carries weight.
        </h2>
      </div>
      <div className="snap-strip px-[clamp(20px,5vw,48px)] pb-5 pt-1">
        {INDUSTRIES.map((ind) => (
          <Link
            key={ind.slug}
            href={`/who-we-serve#${ind.slug}`}
            className="group block flex-[0_0_292px]"
          >
            <div className="relative mb-3.5 h-[190px] overflow-hidden rounded-[8px]">
              <Image
                src={ind.img}
                alt={ind.alt}
                fill
                sizes="292px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="display m-0 mb-1.5 text-[17px] font-semibold transition-colors group-hover:text-accent-hover">
              {ind.name}
            </h3>
            <p className="m-0 text-[14px] leading-[1.55] text-ink/68">{ind.line}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
