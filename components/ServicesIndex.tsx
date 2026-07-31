"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/lib/data";

export default function ServicesIndex() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div>
      {SERVICES.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.slug} className="border-t border-ink/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`svc-panel-${s.slug}`}
              className="grid min-h-[44px] w-full cursor-pointer grid-cols-[52px_1fr_32px] items-center gap-3 border-0 bg-transparent px-1 py-[22px] text-left text-ink transition-colors hover:text-accent-hover"
            >
              <span className="font-mono text-[13px] text-ink/65">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[clamp(1.15rem,2.4vw,1.7rem)] font-semibold tracking-[-0.01em]">
                {s.name}
              </span>
              <span aria-hidden="true" className="text-right font-mono text-[20px] text-accent">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div
                id={`svc-panel-${s.slug}`}
                className="ml-4 flex flex-col gap-3 px-1 pb-[26px] sm:ml-16"
              >
                <p className="m-0 max-w-[60ch] text-[16px] leading-[1.6] text-ink/75">{s.promise}</p>
                <p className="m-0 font-mono text-[11.5px] tracking-[.08em] text-ink/65">{s.tags}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="hit-area w-max text-[14px] font-semibold text-accent-hover"
                >
                  Scope a pilot for this service →
                </Link>
              </div>
            )}
          </div>
        );
      })}
      <div className="border-t border-ink/15" />
    </div>
  );
}
