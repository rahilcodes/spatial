import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/db";

const inputCls = "field-light";
const labelCls = "field-label text-ink/65";

export default async function AdminJobEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const job = isNew ? undefined : getJobById(Number(id));
  if (!isNew && !job) notFound();

  const skills = job ? (JSON.parse(job.skills_json) as string[]).join(", ") : "";

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">{isNew ? "New role" : "Edit role"}</h1>
        <Link href="/admin/jobs" className="text-[13.5px] font-semibold text-accent-hover">
          ← Back to list
        </Link>
      </div>
      {error === "required" && (
        <p role="alert" className="m-0 mb-4 rounded-[3px] border border-[#C0392B]/40 bg-[#C0392B]/5 px-3 py-2 text-[13.5px] text-[#C0392B]">
          Title and description are required.
        </p>
      )}
      <form method="post" action="/api/admin/jobs" className="grid max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-2">
        {job && <input type="hidden" name="id" value={job.id} />}
        <label className={`${labelCls} sm:col-span-2`}>
          ROLE TITLE
          <input type="text" name="title" required defaultValue={job?.title} className={inputCls} />
        </label>
        <label className={labelCls}>
          OFFICE
          <input type="text" name="office" defaultValue={job?.office ?? "Hyderabad, India"} className={inputCls} />
        </label>
        <label className={labelCls}>
          EMPLOYMENT TYPE
          <select name="type" defaultValue={job?.type ?? "Full-time"} className={inputCls}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          DESCRIPTION (SHOWN ON THE CAREERS PAGE)
          <textarea name="blurb" rows={4} required defaultValue={job?.blurb} className={`${inputCls} resize-y`} />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          SKILLS / TOOLS (COMMA-SEPARATED)
          <input type="text" name="skills" defaultValue={skills} className={inputCls} />
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-ink sm:col-span-2">
          <input type="checkbox" name="open" defaultChecked={job ? Boolean(job.open) : true} className="h-4 w-4 accent-[#00A8E8]" />
          Open (unchecked = hidden from the careers page)
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-solid btn-solid--invert border-0 font-[family-name:var(--font-plex-sans)]">
            {isNew ? "Create role" : "Save changes"}
          </button>
        </div>
      </form>
    </>
  );
}
