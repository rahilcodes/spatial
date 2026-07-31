"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setDdOpen(false);
    setMobileOpen(false);
    setMobileSvcOpen(false);
  }, [pathname]);

  // Esc closes dropdown / mobile menu; mobile menu traps focus and locks scroll.
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
        const focusables = mobileRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
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
    if (mobileOpen) {
      const firstLink = mobileRef.current?.querySelector<HTMLElement>("button, a");
      firstLink?.focus();
    }
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
    `text-[14px] font-medium transition-colors hover:text-accent-hover ${
      active ? "text-accent-hover" : "text-ink"
    }`;

  return (
    <header
      className="sticky top-0 z-[60] border-b border-ink/10 bg-bg-light/90 backdrop-blur-[10px]"
    >
      <div
        className="wrap flex items-center justify-between gap-4 px-[clamp(16px,4vw,40px)] transition-[padding] duration-200"
        style={{ paddingBlock: scrolled ? 8 : 14 }}
      >
        <Link href="/" aria-label="Spatial Alphabet — home" className="flex items-center">
          <Image
            src="/uploads/spatial-alphabet-logo.png"
            alt="Spatial Alphabet"
            width={172}
            height={40}
            priority
            className="w-auto transition-[height] duration-200"
            style={{ height: scrolled ? 28 : 34 }}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-[clamp(12px,1.8vw,26px)] lg:flex">
          <Link href="/" className={navLinkCls(isActive("/"))}>
            Home
          </Link>
          <Link href="/who-we-are" className={navLinkCls(isActive("/who-we-are"))}>
            Who We Are
          </Link>
          <div
            ref={ddRef}
            className="relative"
            onMouseEnter={() => setDdOpen(true)}
            onMouseLeave={() => setDdOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDdOpen((o) => !o)}
              aria-expanded={ddOpen}
              aria-haspopup="true"
              className={`inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[3px] px-3 text-[14px] font-medium transition-colors ${
                ddOpen || servicesActive ? "bg-accent/10 text-accent-hover" : "text-ink"
              }`}
            >
              What We Deliver <span aria-hidden="true" className="text-[9px] text-accent-hover">▼</span>
            </button>
            {ddOpen && (
              <div className="absolute left-0 top-full flex min-w-[280px] flex-col rounded-[4px] border border-ink/10 bg-white py-2.5 shadow-[0_18px_40px_-8px_rgba(12,27,51,.25)]">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setDdOpen(false)}
                    className="flex min-h-[44px] items-center px-[22px] py-[11px] text-[14.5px] transition-colors hover:bg-accent/10 hover:text-accent-hover"
                  >
                    {s.navName}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/who-we-serve" className={navLinkCls(isActive("/who-we-serve"))}>
            Who We Serve
          </Link>
          <Link href="/news" className={navLinkCls(isActive("/news"))}>
            News & Blog
          </Link>
          <Link href="/careers" className={navLinkCls(isActive("/careers"))}>
            Careers
          </Link>
          <Link href="/downloads" className={navLinkCls(isActive("/downloads"))}>
            Downloads
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded-[4px] bg-navy-btn px-5 text-[14px] font-semibold text-bg-light transition-colors hover:bg-accent hover:text-navy-deepest"
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
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[3px] border border-ink/20 bg-transparent lg:hidden"
        >
          <span aria-hidden="true" className="block h-[2px] w-[18px] bg-ink" />
          <span aria-hidden="true" className="block h-[2px] w-[18px] bg-ink" />
          <span aria-hidden="true" className="block h-[2px] w-[18px] bg-ink" />
        </button>
      </div>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="carto-dark mobile-menu-open fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-navy-deepest lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-3.5">
            <Image
              src="/uploads/spatial-alphabet-logo.png"
              alt="Spatial Alphabet"
              width={148}
              height={34}
              className="h-[30px] w-auto brightness-0 invert"
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
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-6 pb-10 pt-6">
            {[
              { href: "/", label: "Home" },
              { href: "/who-we-are", label: "Who We Are" },
            ].map((item, i) => (
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
            {[
              { href: "/who-we-serve", label: "Who We Serve" },
              { href: "/news", label: "News & Blog" },
              { href: "/careers", label: "Careers" },
              { href: "/downloads", label: "Downloads" },
            ].map((item, i) => (
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
              className="mobile-menu-link mt-6 inline-flex min-h-[48px] w-max items-center rounded-[4px] bg-accent px-7 text-[16px] font-semibold text-navy-deepest"
              style={{ transitionDelay: "420ms" }}
            >
              Contact Us
            </Link>
            <p
              className="mobile-menu-link mt-auto pt-10 font-mono text-[11px] tracking-[.14em] text-bg-light/55"
              style={{ transitionDelay: "480ms" }}
            >
              MAP. MODEL. DELIVER.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
