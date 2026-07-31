"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/data";

const COUNT = HERO_SLIDES.length;
const INTERVAL = 6000;

export default function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % COUNT), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const prev = useCallback(() => setSlide((s) => (s + COUNT - 1) % COUNT), []);
  const next = useCallback(() => setSlide((s) => (s + 1) % COUNT), []);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 48) (dx < 0 ? next : prev)();
    }
    touchX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Core expertise"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative min-h-[88vh] overflow-hidden bg-navy-panel text-bg-light"
    >
      <h1 className="sr-only">
        Spatial Alphabet — AI-enabled geospatial, engineering design, BIM, and software solutions
      </h1>
      {HERO_SLIDES.map((sl, i) => (
        <div
          key={sl.title}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${COUNT}`}
          aria-hidden={i !== slide}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{
            opacity: i === slide ? 1 : 0,
            pointerEvents: i === slide ? "auto" : "none",
            zIndex: i === slide ? 2 : 1,
          }}
        >
          <Image
            src={sl.img}
            alt={sl.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover brightness-[.42] saturate-[1.05]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,.9)_0%,rgba(4,10,22,.55)_55%,rgba(4,10,22,.22)_100%)]"
          />
          <div className="wrap relative box-border flex min-h-[88vh] flex-col justify-center px-[clamp(64px,7vw,100px)] pb-[90px] pt-[110px]">
            <p className="eyebrow m-0 mb-[18px] text-accent-light">
              CORE EXPERTISE — {String(i + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
            </p>
            <h2 className="display m-0 max-w-[16ch] text-[clamp(2.3rem,5.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              {sl.title}
            </h2>
            <p className="m-0 mb-3.5 mt-5 max-w-[52ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bg-light/75">
              {sl.sub}
            </p>
            <p className="m-0 mb-[34px] font-mono text-[11.5px] tracking-[.1em] text-bg-light/50">
              {sl.tags}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/contact" className="btn-solid">
                Start a Pilot →
              </Link>
              <Link href={sl.href} className="btn-ghost">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-[clamp(8px,1.6vw,26px)] top-1/2 z-[5] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bg-light/35 bg-navy-panel/55 pb-[3px] text-[22px] leading-none text-bg-light backdrop-blur-[4px] transition-colors hover:border-accent hover:text-accent-light"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-[clamp(8px,1.6vw,26px)] top-1/2 z-[5] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bg-light/35 bg-navy-panel/55 pb-[3px] text-[22px] leading-none text-bg-light backdrop-blur-[4px] transition-colors hover:border-accent hover:text-accent-light"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-[5] flex justify-center">
        {HERO_SLIDES.map((sl, i) => (
          <button
            key={sl.title}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === slide}
            className="flex cursor-pointer items-center border-0 bg-transparent px-[4.5px] py-4"
          >
            <span
              aria-hidden="true"
              className="block rounded-[5px] transition-all duration-[400ms]"
              style={{
                width: i === slide ? 30 : 9,
                height: 9,
                background: i === slide ? "#00A8E8" : "rgba(242,245,248,.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
