import Link from "next/link";
import { notFound } from "next/navigation";
import { bodyToText } from "@/lib/article-body";
import { getArticleById, type ArticleBody } from "@/lib/db";

const IMAGE_OPTIONS = [
  "/assets/gen/terrain-hillshade.png",
  "/assets/gen/lidar-corridor.png",
  "/assets/gen/sag-profile.png",
  "/assets/gen/contour-blueprint.png",
  "/assets/gen/bim-iso.png",
  "/assets/gen/pointcloud-building.png",
  "/assets/gen/vector-map-dark.png",
  "/assets/gen/city-grid-night.png",
  "/assets/gen/data-heatmap.png",
  "/assets/gen/annotation-tiles.png",
  "/assets/gen/network-graph.png",
  "/assets/gen/globe-timezones.png",
  "/assets/gen/flow-integration.png",
  "/assets/gen/qc-scatter.png",
  "/assets/gen/pipeline-route.png",
  "/assets/gen/parcel-map.png",
  "/assets/gen/rail-corridor-scan.png",
  "/assets/gen/ortho-farmland.png",
  "/assets/hero-corridor.png",
  "/assets/ind-utilities.png",
  "/assets/ind-oilgas.png",
  "/assets/ind-gov.png",
  "/assets/ind-transport.png",
  "/assets/ind-infra.png",
  "/assets/ind-urban.png",
];

const inputCls = "field-light";
const labelCls = "field-label text-ink/65";

export default async function AdminArticleEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const article = isNew ? undefined : getArticleById(Number(id));
  if (!isNew && !article) notFound();

  const bodyText = article ? bodyToText(JSON.parse(article.body_json) as ArticleBody) : "";

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="display m-0 text-[26px] font-semibold text-ink">
          {isNew ? "New article" : "Edit article"}
        </h1>
        <Link href="/admin/articles" className="text-[13.5px] font-semibold text-accent-hover">
          ← Back to list
        </Link>
      </div>
      {error === "required" && (
        <p role="alert" className="m-0 mb-4 rounded-[3px] border border-[#C0392B]/40 bg-[#C0392B]/5 px-3 py-2 text-[13.5px] text-[#C0392B]">
          Title and body are required.
        </p>
      )}
      <form method="post" action="/api/admin/articles" className="grid max-w-[880px] grid-cols-1 gap-4 sm:grid-cols-2">
        {article && <input type="hidden" name="id" value={article.id} />}
        <label className={`${labelCls} sm:col-span-2`}>
          TITLE
          <input type="text" name="title" required defaultValue={article?.title} className={inputCls} />
        </label>
        <label className={labelCls}>
          SLUG (LEAVE BLANK TO AUTO-GENERATE)
          <input type="text" name="slug" defaultValue={article?.slug} className={inputCls} />
        </label>
        <label className={labelCls}>
          TAG
          <input type="text" name="tag" defaultValue={article?.tag ?? "NEWS"} className={inputCls} />
        </label>
        <label className={labelCls}>
          DATE
          <input type="date" name="date_iso" defaultValue={article?.date_iso ?? new Date().toISOString().slice(0, 10)} className={inputCls} />
        </label>
        <label className={labelCls}>
          READING TIME
          <input type="text" name="reading_time" defaultValue={article?.reading_time ?? "4 min read"} className={inputCls} />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          SEO TITLE (≤60 CHARS)
          <input type="text" name="meta_title" maxLength={60} defaultValue={article?.meta_title} className={inputCls} />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          SEO / LIST DESCRIPTION (≤155 CHARS)
          <textarea name="description" rows={2} maxLength={155} defaultValue={article?.description} className={`${inputCls} resize-y`} />
        </label>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelCls}>
            LEAD IMAGE — PASTE AN IMAGE URL OR GOOGLE DRIVE SHARE LINK, OR PICK A BUILT-IN
            <input
              type="text"
              name="img"
              list="site-images"
              defaultValue={article?.img ?? ""}
              placeholder="https://… or https://drive.google.com/file/d/…  (leave blank for default)"
              className={inputCls}
            />
          </label>
          <datalist id="site-images">
            {IMAGE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o.replace("/assets/", "").replace("gen/", "")}
              </option>
            ))}
          </datalist>
          <p className="m-0 font-mono text-[10.5px] leading-relaxed tracking-[.04em] text-ink/65">
            DRIVE LINKS ARE CONVERTED TO DIRECT IMAGE URLS AUTOMATICALLY — SET THE FILE TO
            &quot;ANYONE WITH THE LINK CAN VIEW&quot; FIRST. CLICK INTO THE FIELD TO SEE BUILT-IN
            SITE IMAGES.
          </p>
        </div>
        <label className={`${labelCls} sm:col-span-2`}>
          IMAGE ALT TEXT
          <input type="text" name="img_alt" defaultValue={article?.img_alt} className={inputCls} />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          BODY — PARAGRAPHS SEPARATED BY BLANK LINES; START A LINE WITH "## " FOR A SECTION HEADING
          <textarea name="body" rows={18} required defaultValue={bodyText} className={`${inputCls} resize-y font-[family-name:var(--font-plex-mono)] text-[13.5px] leading-relaxed`} />
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-ink sm:col-span-2">
          <input type="checkbox" name="published" defaultChecked={article ? Boolean(article.published) : true} className="h-4 w-4 accent-[#00A8E8]" />
          Published (unchecked = draft, hidden from the site)
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-solid btn-solid--invert border-0 font-[family-name:var(--font-plex-sans)]">
            {isNew ? "Create article" : "Save changes"}
          </button>
        </div>
      </form>
    </>
  );
}
