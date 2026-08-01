import Link from "next/link";
import { listJobs } from "@/lib/db";

export default function AdminJobsPage() {
  const jobs = listJobs();
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">Jobs</h1>
        <Link href="/admin/jobs/new" className="btn-solid btn-solid--invert !min-h-0 !px-5 !py-2.5 text-[14px]">
          + New role
        </Link>
      </div>
      <div className="overflow-x-auto rounded-[4px] border border-ink/15 bg-white">
        <table className="w-full border-collapse text-left text-[13.5px] text-ink">
          <thead>
            <tr className="border-b border-ink/15 font-mono text-[10.5px] tracking-[.1em] text-ink/65">
              <th className="px-4 py-3 font-medium">ROLE</th>
              <th className="px-4 py-3 font-medium">OFFICE</th>
              <th className="px-4 py-3 font-medium">TYPE</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b border-ink/10 last:border-0">
                <td className="max-w-[360px] px-4 py-3 font-medium">
                  <Link href={`/admin/jobs/${j.id}`} className="hover:text-accent-hover">
                    {j.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink/70">{j.office}</td>
                <td className="px-4 py-3 text-ink/70">{j.type}</td>
                <td className="px-4 py-3 font-mono text-[10.5px] tracking-[.08em]">
                  {j.open ? <span className="text-accent-hover">OPEN</span> : <span className="text-ink/65">CLOSED</span>}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/jobs/${j.id}`} className="font-semibold text-accent-hover">
                      Edit
                    </Link>
                    <form method="post" action="/api/admin/jobs" className="inline">
                      <input type="hidden" name="_action" value="delete" />
                      <input type="hidden" name="id" value={j.id} />
                      <button type="submit" className="cursor-pointer border-0 bg-transparent p-0 font-medium text-[#C0392B] hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="m-0 mt-4 font-mono text-[11px] tracking-[.08em] text-ink/65">
        CLOSED ROLES DISAPPEAR FROM THE CAREERS PAGE BUT KEEP THEIR APPLICATIONS IN LEADS
      </p>
    </>
  );
}
