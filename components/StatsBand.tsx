"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";

const TARGETS = [6, 20, 100, 2];
const LABELS = ["YEARS ACTIVE", "YEARS LEADERSHIP DEPTH", "FIRST-TIME-RIGHT QUALITY", "GLOBAL OFFICES"];

function format(values: number[]): string[] {
  return [`${values[0]}+`, `${values[1]}+`, `${values[2]}%`, String(values[3])];
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [inView, setInView] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        setInView(true);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValues(TARGETS);
          return;
        }
        const t0 = performance.now();
        const D = 1400;
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / D);
          const e = 1 - Math.pow(1 - k, 3);
          setValues(TARGETS.map((v) => Math.round(v * e)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display = format(values);

  return (
    <section className="relative overflow-hidden bg-navy-deepest px-[clamp(20px,5vw,48px)] py-[clamp(72px,10vw,110px)] text-bg-light">
      <div aria-hidden="true" className="dotgrid-dark absolute inset-0 opacity-[.28]" />
      <div ref={ref} className="wrap relative">
        <div className="mb-[clamp(48px,6vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[clamp(28px,4vw,48px)]">
          {display.map((v, i) => (
            <div key={LABELS[i]} className="border-l border-accent/40 pl-5">
              <p className="m-0 font-mono text-[clamp(2.4rem,4.5vw,3.6rem)] font-medium text-accent-light">
                {v}
              </p>
              <p className="m-0 mt-2 font-mono text-[11.5px] tracking-[.12em] text-bg-light/60">
                {LABELS[i]}
              </p>
            </div>
          ))}
        </div>
        <div
          className={`relative h-[200px] overflow-hidden rounded-[4px] border border-bg-light/12 ${
            inView ? "arc-in" : ""
          }`}
        >
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 220 118 Q 500 -30 780 106"
              stroke="#00A8E8"
              strokeWidth="1.5"
              fill="none"
              className="arc-path"
            />
          </svg>
          <div className="absolute left-[22%] top-[59%] flex flex-col gap-2">
            <span
              className="block h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_14px_#00A8E8]"
              style={{ animation: "saPulse 3s ease-in-out infinite" }}
            />
            <span className="-ml-1 whitespace-nowrap font-mono text-[11px] tracking-[.1em] text-bg-light/75">
              KELLER, TX — {SITE.offices.keller.coords}
            </span>
          </div>
          <div className="absolute left-[78%] top-[53%] flex -translate-x-full -translate-y-full flex-col items-end gap-2">
            <span className="whitespace-nowrap text-right font-mono text-[11px] tracking-[.1em] text-bg-light/75">
              HYDERABAD, IN — {SITE.offices.hyderabad.coords}
            </span>
            <span
              className="-mb-1 -mr-[9px] block h-[9px] w-[9px] rounded-full bg-gold shadow-[0_0_14px_#E8A31E]"
              style={{ animation: "saPulse 3s ease-in-out infinite 1.5s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
