import Link from "next/link";
import { listLeads } from "@/lib/db";

const STATUSES = ["new", "contacted", "closed"] as const;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; kind?: string }>;
}) {
  const { status, kind } = await searchParams;
  const leads = await listLeads({ status, kind });

  const filterLink = (label: string, params: string, active: boolean) => (
    <Link
      key={label}
      href={`/admin/leads${params}`}
      className={`rounded-full border px-3 py-1.5 font-mono text-[10.5px] tracking-[.08em] transition-colors ${
        active ? "border-accent bg-accent/10 text-accent-hover" : "border-ink/25 text-ink/70 hover:border-accent"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">Leads</h1>
        <a
          href="/api/admin/leads/export"
          className="rounded-[3px] border border-ink/25 px-4 py-2 font-mono text-[11px] tracking-[.1em] text-ink/70 transition-colors hover:border-accent hover:text-accent-hover"
        >
          EXPORT CSV ↓
        </a>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {filterLink("ALL", "", !status && !kind)}
        {filterLink("NEW", "?status=new", status === "new")}
        {filterLink("CONTACTED", "?status=contacted", status === "contacted")}
        {filterLink("CLOSED", "?status=closed", status === "closed")}
        {filterLink("CONTACT FORM", "?kind=contact", kind === "contact")}
        {filterLink("CAREERS", "?kind=careers", kind === "careers")}
      </div>

      <div className="flex flex-col gap-4">
        {leads.length === 0 && (
          <p className="rounded-[4px] border border-ink/15 bg-white px-5 py-6 text-[14px] text-ink/65">
            No leads match this filter.
          </p>
        )}
        {leads.map((l) => (
          <div key={l.id} className="rounded-[4px] border border-ink/15 bg-white p-5">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="display text-[16px] font-semibold text-ink">{l.name}</span>
                <a href={`mailto:${l.email}`} className="text-[13.5px] font-medium text-accent-hover">
                  {l.email}
                </a>
                <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] tracking-[.08em] text-ink/70">
                  {l.kind.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ink/65">#{l.id} — {l.created_at.slice(0, 16).replace("T", " ")}</span>
            </div>
            {l.topic && (
              <p className="m-0 mb-1 text-[13.5px] text-ink/80">
                <span className="font-mono text-[10.5px] tracking-[.1em] text-ink/65">
                  {l.kind === "careers" ? "ROLE: " : "SERVICE: "}
                </span>
                {l.topic}
              </p>
            )}
            {l.message && <p className="m-0 mb-3 max-w-[90ch] text-[13.5px] leading-relaxed text-ink/75">{l.message}</p>}
            {l.cv_path && (
              <p className="m-0 mb-3">
                <a href={`/api/admin/cv/${l.id}`} className="font-mono text-[11.5px] tracking-[.06em] text-accent-hover">
                  DOWNLOAD CV ↓ {l.cv_name ? `(${l.cv_name})` : ""}
                </a>
              </p>
            )}
            <form
              method="post"
              action="/api/admin/leads"
              className="flex flex-wrap items-end gap-3 border-t border-ink/10 pt-3"
            >
              <input type="hidden" name="id" value={l.id} />
              <input type="hidden" name="_back" value={`/admin/leads${status ? `?status=${status}` : kind ? `?kind=${kind}` : ""}`} />
              <label className="field-label text-ink/65">
                STATUS
                <select name="status" defaultValue={l.status} className="field-light !min-h-0 !py-2 text-[13.5px]">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label min-w-[240px] flex-1 text-ink/65">
                NOTES
                <input type="text" name="notes" defaultValue={l.notes} placeholder="Follow-up notes…" className="field-light !min-h-0 !py-2 text-[13.5px]" />
              </label>
              <button
                type="submit"
                className="cursor-pointer rounded-[2px] border-0 bg-navy-btn px-4 py-2.5 text-[13px] font-semibold text-bg-light transition-colors hover:bg-accent hover:text-navy-deepest"
              >
                Save
              </button>
              <button
                type="submit"
                name="_action"
                value="delete"
                className="cursor-pointer rounded-[2px] border border-[#C0392B]/40 bg-transparent px-3 py-2 text-[12.5px] font-medium text-[#C0392B] transition-colors hover:bg-[#C0392B]/10"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
