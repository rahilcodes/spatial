import Link from "next/link";
import { notFound } from "next/navigation";
import { getDownloadById } from "@/lib/db";

const IMAGE_OPTIONS = [
  "/assets/gen/lidar-corridor.png",
  "/assets/gen/terrain-hillshade.png",
  "/assets/gen/sag-profile.png",
  "/assets/gen/contour-blueprint.png",
  "/assets/gen/bim-iso.png",
  "/assets/gen/pointcloud-building.png",
  "/assets/gen/data-heatmap.png",
  "/assets/gen/annotation-tiles.png",
  "/assets/gen/network-graph.png",
  "/assets/gen/rail-corridor-scan.png",
  "/assets/gen/parcel-map.png",
  "/assets/gen/ortho-farmland.png",
];

const inputCls = "field-light";
const labelCls = "field-label text-ink/65";

export default async function AdminDownloadEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const item = isNew ? undefined : await getDownloadById(Number(id));
  if (!isNew && !item) notFound();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">
          {isNew ? "New download" : "Edit download"}
        </h1>
        <Link href="/admin/downloads" className="text-[13.5px] font-semibold text-accent-hover">
          ← Back to list
        </Link>
      </div>
      {error === "required" && (
        <p role="alert" className="m-0 mb-4 rounded-[3px] border border-[#C0392B]/40 bg-[#C0392B]/5 px-3 py-2 text-[13.5px] text-[#C0392B]">
          Title is required.
        </p>
      )}
      <form
        method="post"
        action="/api/admin/downloads"
        encType="multipart/form-data"
        className="grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {item && <input type="hidden" name="id" value={item.id} />}
        <label className={`${labelCls} sm:col-span-2`}>
          TITLE
          <input type="text" name="title" required defaultValue={item?.title} className={inputCls} />
        </label>
        <label className={labelCls}>
          KIND LABEL (E.G. &quot;PDF · CASE STUDY&quot;)
          <input type="text" name="kind" defaultValue={item?.kind ?? "PDF · RESOURCE"} className={inputCls} />
        </label>
        <label className={labelCls}>
          SORT ORDER (LOWER = FIRST)
          <input type="number" name="sort" defaultValue={item?.sort ?? 0} className={inputCls} />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          DESCRIPTION
          <textarea name="descr" rows={2} defaultValue={item?.descr} className={`${inputCls} resize-y`} />
        </label>
        <label className={labelCls}>
          CARD IMAGE
          <select name="img" defaultValue={item?.img ?? IMAGE_OPTIONS[0]} className={inputCls}>
            {IMAGE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o.replace("/assets/gen/", "")}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          EXTERNAL LINK (OPTIONAL — E.G. DRIVE/DROPBOX URL)
          <input type="url" name="url" defaultValue={item?.url ?? ""} placeholder="https://…" className={inputCls} />
        </label>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelCls}>
            UPLOAD FILE (PDF/DOC/PPT/ZIP, MAX 25 MB — TAKES PRIORITY OVER LINK)
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.xls,.xlsx"
              className={`${inputCls} cursor-pointer pt-[10px] file:mr-4 file:cursor-pointer file:rounded-[2px] file:border-0 file:bg-navy-btn file:px-3.5 file:py-1.5 file:text-[13px] file:font-semibold file:text-bg-light`}
            />
          </label>
          {item?.file_name && (
            <p className="m-0 font-mono text-[11.5px] text-ink/65">
              CURRENT FILE: {item.file_name} — uploading a new file replaces it.
            </p>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-ink sm:col-span-2">
          <input type="checkbox" name="published" defaultChecked={item ? Boolean(item.published) : true} className="h-4 w-4 accent-[#00A8E8]" />
          Published (unchecked = hidden from the downloads page)
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-solid btn-solid--invert border-0 font-[family-name:var(--font-plex-sans)]">
            {isNew ? "Create download" : "Save changes"}
          </button>
        </div>
      </form>
    </>
  );
}
