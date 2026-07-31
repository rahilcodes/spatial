"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Sticky "Contact us" pill — mobile only, appears after 50% scroll depth. */
export default function MobileContactPill() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const scrollable = d.scrollHeight - window.innerHeight;
      setShow(
        scrollable > 0 &&
          window.scrollY > scrollable * 0.5 &&
          window.innerWidth < 760
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (pathname === "/contact" || !show) return null;

  return (
    <Link
      href="/contact"
      className="fixed bottom-4 left-1/2 z-[70] inline-flex min-h-[44px] -translate-x-1/2 items-center rounded-full bg-accent px-[30px] py-3.5 text-[15px] font-semibold text-navy-deepest shadow-[0_12px_30px_rgba(0,0,0,.35)]"
    >
      Contact us
    </Link>
  );
}
