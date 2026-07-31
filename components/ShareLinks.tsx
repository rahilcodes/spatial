"use client";

import { useState } from "react";

export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — leave the visible URL for manual copy.
    }
  }

  const cls =
    "hit-area rounded-[3px] border border-ink/25 px-3 py-1.5 font-mono text-[11.5px] tracking-[.08em] text-ink/70 transition-colors hover:border-accent hover:text-accent-hover cursor-pointer bg-transparent";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="font-mono text-[11px] tracking-[.14em] text-ink/65">SHARE</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        LINKEDIN ↗
      </a>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        X ↗
      </a>
      <button type="button" onClick={copy} className={cls}>
        {copied ? "COPIED ✓" : "COPY LINK"}
      </button>
    </div>
  );
}
