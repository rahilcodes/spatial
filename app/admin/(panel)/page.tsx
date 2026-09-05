import Link from "next/link";
import { leadCounts, listArticles, listJobs, listLeads } from "@/lib/db";

export default async function AdminDashboard() {
  const counts = await leadCounts();
  const articles = await listArticles();
  const jobs = await listJobs();
  const recent = (await listLeads()).slice(0, 6);

  const tiles = [
    { label: "NEW LEADS", value: counts.fresh, href: "/admin/leads?status=new", accent: counts.fresh > 0 },
    { label: "TOTAL LEADS", value: counts.total, href: "/admin/leads", accent: false },
    { label: "PUBLISHED ARTICLES", value: articles.filter((a) => a.published).length, href: "/admin/articles", accent: false },
    { label: "OPEN ROLES", value: jobs.filter((j) => j.open).length, href: "/admin/jobs", accent: false },
  ];

  return (
    <>
      <h1 className="display m-0 mb-6 text-[26px] font-semibold text-ink">Dashboard</h1>
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className={`rounded-[4px] border p-5 transition-colors hover:border-accent ${
              t.accent ? "border-accent bg-accent/5" : "border-ink/15 bg-white"
            }`}
          >
            <p className="m-0 font-mono text-[30px] font-medium text-ink">{t.value}</p>
            <p className="m-0 mt-1 font-mono text-[10.5px] tracking-[.12em] text-ink/65">{t.label}</p>
          </Link>
        ))}
      </div>

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="display m-0 text-[18px] font-semibold text-ink">Latest leads</h2>
        <Link href="/admin/leads" className="text-[13.5px] font-semibold text-accent-hover">
          All leads →
        </Link>
      </div>
      <div className="overflow-x-auto rounded-[4px] border border-ink/15 bg-white">
        <table className="w-full border-collapse text-left text-[13.5px] text-ink">
          <thead>
            <tr className="border-b border-ink/15 font-mono text-[10.5px] tracking-[.1em] text-ink/65">
              <th className="px-4 py-3 font-medium">DATE</th>
              <th className="px-4 py-3 font-medium">KIND</th>
              <th className="px-4 py-3 font-medium">NAME</th>
              <th className="px-4 py-3 font-medium">EMAIL</th>
              <th className="px-4 py-3 font-medium">TOPIC</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-ink/65">
                  No leads yet — submissions from the contact and careers forms will appear here.
                </td>
              </tr>
            )}
            {recent.map((l) => (
              <tr key={l.id} className="border-b border-ink/10 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-ink/70">
                  {l.created_at.slice(0, 10)}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] tracking-[.08em]">
                    {l.kind.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${l.email}`} className="text-accent-hover">
                    {l.email}
                  </a>
                </td>
                <td className="max-w-[220px] truncate px-4 py-3 text-ink/70">{l.topic}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[.08em] ${
                      l.status === "new"
                        ? "bg-accent/15 text-accent-hover"
                        : l.status === "contacted"
                          ? "bg-gold/15 text-[#8a6210]"
                          : "bg-ink/10 text-ink/70"
                    }`}
                  >
                    {l.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
