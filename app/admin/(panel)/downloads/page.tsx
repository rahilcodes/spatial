import Link from "next/link";
import { listDownloads } from "@/lib/db";

export default function AdminDownloadsPage() {
  const downloads = listDownloads();
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">Downloads</h1>
        <Link href="/admin/downloads/new" className="btn-solid btn-solid--invert !min-h-0 !px-5 !py-2.5 text-[14px]">
          + New download
        </Link>
      </div>
      <div className="overflow-x-auto rounded-[4px] border border-ink/15 bg-white">
        <table className="w-full border-collapse text-left text-[13.5px] text-ink">
          <thead>
            <tr className="border-b border-ink/15 font-mono text-[10.5px] tracking-[.1em] text-ink/65">
              <th className="px-4 py-3 font-medium">TITLE</th>
              <th className="px-4 py-3 font-medium">KIND</th>
              <th className="px-4 py-3 font-medium">FILE</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((d) => (
              <tr key={d.id} className="border-b border-ink/10 last:border-0">
                <td className="max-w-[360px] px-4 py-3 font-medium">
                  <Link href={`/admin/downloads/${d.id}`} className="hover:text-accent-hover">
                    {d.title}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-ink/70">{d.kind}</td>
                <td className="px-4 py-3 font-mono text-[11px] tracking-[.06em]">
                  {d.file_path ? (
                    <span className="text-accent-hover">FILE</span>
                  ) : d.url ? (
                    <span className="text-accent-hover">LINK</span>
                  ) : (
                    <span className="text-ink/50">CLIENT TO SUPPLY</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-[10.5px] tracking-[.08em]">
                  {d.published ? <span className="text-accent-hover">PUBLISHED</span> : <span className="text-ink/65">HIDDEN</span>}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/downloads/${d.id}`} className="font-semibold text-accent-hover">
                      Edit
                    </Link>
                    <form method="post" action="/api/admin/downloads" className="inline">
                      <input type="hidden" name="_action" value="delete" />
                      <input type="hidden" name="id" value={d.id} />
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
        UPLOAD A PDF OR PASTE A LINK. ITEMS WITH NEITHER SHOW &quot;CLIENT TO SUPPLY&quot; ON THE PUBLIC PAGE.
      </p>
    </>
  );
}
