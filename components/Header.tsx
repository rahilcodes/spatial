"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/data";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are" },
];
const NAV_TAIL = [
  { href: "/who-we-serve", label: "Who We Serve" },
  { href: "/news", label: "News & Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/downloads", label: "Downloads" },
];

export default function Header() {
  const pathname = usePathname();
  const [ddOpen, setDdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDdOpen(false);
    setMobileOpen(false);
    setMobileSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDdOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          hamburgerRef.current?.focus();
        }
      }
      if (e.key === "Tab" && mobileOpen && mobileRef.current) {
        const focusables = mobileRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) mobileRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );
  const servicesActive = pathname.startsWith("/services");

  const navLinkCls = (active: boolean) =>
    `whitespace-nowrap rounded-[5px] px-[clamp(6px,0.9vw,12px)] py-2 text-[13.5px] font-medium transition-colors hover:bg-bg-light/10 hover:text-accent-light ${
      active ? "text-accent-light" : "text-bg-light/85"
    }`;

  return (
    <>
      <header className="sticky top-0 z-[60] h-[72px] border-b border-bg-light/10 bg-navy-deepest/95 backdrop-blur-[10px]">
        <div className="wrap flex h-full items-center justify-between gap-3 px-[clamp(16px,3vw,40px)]">
          <Link href="/" aria-label="Spatial Alphabet — home" className="flex shrink-0 items-center">
            <Image
              src="/uploads/spatial-alphabet-logo-white.png"
              alt="Spatial Alphabet"
              width={236}
              height={70}
              priority
              className="h-[46px] w-auto"
            />
          </Link>

          {/* Desktop nav — one line */}
          <nav aria-label="Primary" className="hidden items-center gap-[clamp(2px,0.6vw,8px)] lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={navLinkCls(isActive(n.href))}>
                {n.label}
              </Link>
            ))}
            <div ref={ddRef} className="relative" onMouseEnter={() => setDdOpen(true)} onMouseLeave={() => setDdOpen(false)}>
              <button
                type="button"
                onClick={() => setDdOpen((o) => !o)}
                aria-expanded={ddOpen}
                aria-haspopup="true"
                className={`inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-[5px] px-[clamp(6px,0.9vw,12px)] py-2 text-[13.5px] font-medium transition-colors hover:bg-bg-light/10 ${
                  ddOpen || servicesActive ? "text-accent-light" : "text-bg-light/85"
                }`}
              >
                What We Deliver <span aria-hidden="true" className="text-[8px]">▼</span>
              </button>
              {ddOpen && (
                <div className="absolute left-0 top-full flex min-w-[280px] flex-col rounded-[6px] border border-ink/10 bg-white py-2 shadow-[0_18px_40px_-8px_rgba(4,10,22,.5)]">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setDdOpen(false)}
                      className="flex min-h-[44px] items-center px-[20px] py-[10px] text-[14px] text-ink transition-colors hover:bg-accent/10 hover:text-accent-hover"
                    >
                      {s.navName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_TAIL.map((n) => (
              <Link key={n.href} href={n.href} className={navLinkCls(isActive(n.href))}>
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-1 inline-flex shrink-0 items-center whitespace-nowrap rounded-[6px] bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-navy-deepest transition-colors hover:bg-accent-light"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            className="flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[4px] border border-bg-light/25 bg-transparent lg:hidden"
          >
            <span aria-hidden="true" className="block h-[2px] w-[18px] bg-bg-light" />
            <span aria-hidden="true" className="block h-[2px] w-[18px] bg-bg-light" />
            <span aria-hidden="true" className="block h-[2px] w-[18px] bg-bg-light" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — rendered outside <header> so its fixed
          positioning is relative to the viewport, not the backdrop-blur header */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="carto-dark mobile-menu-open fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-navy-deepest lg:hidden"
        >
          <div className="flex h-[72px] items-center justify-between px-5">
            <Image
              src="/uploads/spatial-alphabet-logo-white.png"
              alt="Spatial Alphabet"
              width={200}
              height={60}
              className="h-[42px] w-auto"
            />
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                hamburgerRef.current?.focus();
              }}
              aria-label="Close menu"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[3px] border border-bg-light/30 bg-transparent text-[20px] text-bg-light"
            >
              ✕
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-6 pb-10 pt-4">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu-link display py-3 text-[26px] font-semibold text-bg-light"
                style={{ transitionDelay: `${60 + i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mobile-menu-link" style={{ transitionDelay: "160ms" }}>
              <button
                type="button"
                onClick={() => setMobileSvcOpen((o) => !o)}
                aria-expanded={mobileSvcOpen}
                className="display flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-3 text-left text-[26px] font-semibold text-bg-light"
              >
                What We Deliver
                <span aria-hidden="true" className="font-mono text-[20px] text-accent">
                  {mobileSvcOpen ? "−" : "+"}
                </span>
              </button>
              {mobileSvcOpen && (
                <div className="flex flex-col border-l border-accent/40 pl-5">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex min-h-[44px] items-center py-2 text-[16px] font-medium text-bg-light/80"
                    >
                      {s.navName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_TAIL.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu-link display py-3 text-[26px] font-semibold text-bg-light"
                style={{ transitionDelay: `${210 + i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mobile-menu-link mt-6 inline-flex min-h-[48px] w-max items-center rounded-[6px] bg-accent px-7 text-[16px] font-semibold text-navy-deepest"
              style={{ transitionDelay: "420ms" }}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
