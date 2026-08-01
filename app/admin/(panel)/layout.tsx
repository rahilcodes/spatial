import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/articles", label: "News & Blog" },
  { href: "/admin/jobs", label: "Jobs" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen bg-bg-light">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-navy-deepest text-bg-light">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-6">
            <p className="display m-0 text-[16px] font-bold">
              Spatial <span className="text-accent">Alphabet</span>{" "}
              <span className="ml-1 font-mono text-[10px] tracking-[.14em] text-bg-light/60">ADMIN</span>
            </p>
            <nav aria-label="Admin" className="flex flex-wrap gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-[3px] px-3 py-2 text-[13.5px] font-medium text-bg-light/80 transition-colors hover:bg-accent/15 hover:text-accent-light"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-[3px] px-3 py-2 font-mono text-[11px] tracking-[.1em] text-bg-light/60 transition-colors hover:text-accent-light"
            >
              VIEW SITE ↗
            </Link>
            <form method="post" action="/api/admin/logout">
              <button
                type="submit"
                className="cursor-pointer rounded-[3px] border border-bg-light/30 bg-transparent px-3 py-2 font-mono text-[11px] tracking-[.1em] text-bg-light/80 transition-colors hover:border-accent hover:text-accent-light"
              >
                LOG OUT
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="wrap px-5 py-8">{children}</div>
    </div>
  );
}
