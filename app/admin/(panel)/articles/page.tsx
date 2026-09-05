import Link from "next/link";
import { listArticles } from "@/lib/db";

export default async function AdminArticlesPage() {
  const articles = await listArticles();
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">News &amp; Blog</h1>
        <Link
          href="/admin/articles/new"
          className="btn-solid btn-solid--invert !min-h-0 !px-5 !py-2.5 text-[14px]"
        >
          + New article
        </Link>
      </div>
      <div className="overflow-x-auto rounded-[4px] border border-ink/15 bg-white">
        <table className="w-full border-collapse text-left text-[13.5px] text-ink">
          <thead>
            <tr className="border-b border-ink/15 font-mono text-[10.5px] tracking-[.1em] text-ink/65">
              <th className="px-4 py-3 font-medium">DATE</th>
              <th className="px-4 py-3 font-medium">TITLE</th>
              <th className="px-4 py-3 font-medium">TAG</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-ink/10 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-ink/70">{a.date_iso}</td>
                <td className="max-w-[420px] px-4 py-3 font-medium">
                  <Link href={`/admin/articles/${a.id}`} className="hover:text-accent-hover">
                    {a.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] tracking-[.08em]">
                    {a.tag}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[10.5px] tracking-[.08em]">
                  {a.published ? (
                    <span className="text-accent-hover">PUBLISHED</span>
                  ) : (
                    <span className="text-ink/65">DRAFT</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/articles/${a.id}`} className="font-semibold text-accent-hover">
                      Edit
                    </Link>
                    <a
                      href={`/news/${a.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink/70 hover:text-accent-hover"
                    >
                      View ↗
                    </a>
                    <form
                      method="post"
                      action="/api/admin/articles"
                      className="inline"
                    >
                      <input type="hidden" name="_action" value="delete" />
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="cursor-pointer border-0 bg-transparent p-0 font-medium text-[#C0392B] hover:underline"
                      >
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
        DELETES ARE IMMEDIATE AND PERMANENT — EXPORT OR DRAFT (UNPUBLISH) IF UNSURE
      </p>
    </>
  );
}
