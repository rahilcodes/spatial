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
    setPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Core expertise"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative min-h-0 flex-1 overflow-hidden bg-navy-deepest text-bg-light"
    >
      <h1 className="sr-only">
        Spatial Alphabet — AI-enabled geospatial, engineering, application development, and talent solutions
      </h1>

      {/* Sliding filmstrip: the whole track translates horizontally */}
      <div
        className="flex h-full transition-transform duration-[750ms]"
        style={{ transform: `translateX(-${slide * 100}%)`, transitionTimingFunction: "cubic-bezier(.77,0,.18,1)" }}
      >
        {HERO_SLIDES.map((sl, i) => (
          <div
            key={sl.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${COUNT}`}
            aria-hidden={i !== slide}
            className="relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden"
          >
            {/* Ken Burns: active slide slowly settles from 1.08 → 1 */}
            <div
              className="absolute inset-0 transition-transform duration-[6000ms] ease-out"
              style={{ transform: i === slide ? "scale(1)" : "scale(1.08)" }}
            >
              <Image
                src={sl.img}
                alt={sl.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover brightness-[.6] saturate-[1.1]"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,22,.86)_0%,rgba(4,10,22,.55)_45%,rgba(4,10,22,.2)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(4,10,22,.55))]"
            />
            <div className="wrap relative flex h-full flex-col justify-center px-[clamp(20px,6vw,90px)] pb-20 pt-10">
              <p className="mb-4 inline-flex w-max items-center rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-mono text-[10.5px] tracking-[.2em] text-accent-light">
                CORE EXPERTISE — {String(i + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </p>
              <h2 className="display m-0 max-w-[16ch] text-[clamp(2rem,4.1vw,3.8rem)] font-bold leading-[1.03] tracking-[-0.02em]">
                {sl.title}
              </h2>
              <p className="m-0 mb-3 mt-4 max-w-[54ch] text-[clamp(15px,1.05vw,17px)] leading-[1.55] text-bg-light/78">
                {sl.sub}
              </p>
              <p className="m-0 mb-7 font-mono text-[11px] tracking-[.1em] text-bg-light/55">{sl.tags}</p>
              <div className="flex flex-wrap gap-3.5">
                <Link href="/contact" className="btn-solid">
                  Scope a Pilot →
                </Link>
                <Link href={sl.href} className="btn-ghost">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-[clamp(8px,1.6vw,28px)] bottom-4 z-[5] flex h-11 w-11 sm:bottom-auto sm:top-1/2 sm:h-[52px] sm:w-[52px] sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bg-light/30 bg-navy-panel/40 pb-[3px] text-[22px] leading-none text-bg-light backdrop-blur-[4px] transition-colors hover:border-accent hover:bg-accent hover:text-navy-deepest"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-[clamp(8px,1.6vw,28px)] bottom-4 z-[5] flex h-11 w-11 sm:bottom-auto sm:top-1/2 sm:h-[52px] sm:w-[52px] sm:-translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bg-light/30 bg-navy-panel/40 pb-[3px] text-[22px] leading-none text-bg-light backdrop-blur-[4px] transition-colors hover:border-accent hover:bg-accent hover:text-navy-deepest"
      >
        ›
      </button>

      <div className="absolute bottom-7 left-0 right-0 z-[5] flex justify-center">
        {HERO_SLIDES.map((sl, i) => (
          <button
            key={sl.title}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === slide}
            className="flex cursor-pointer items-center border-0 bg-transparent px-[5px] py-4"
          >
            <span
              aria-hidden="true"
              className="block rounded-full transition-all duration-[400ms]"
              style={{
                width: i === slide ? 30 : 10,
                height: 10,
                background: i === slide ? "#00A8E8" : "rgba(242,245,248,.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
