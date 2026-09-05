import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { textToBody, slugify } from "@/lib/article-body";
import { deleteArticle, getArticle, getArticleById, upsertArticle } from "@/lib/db";

/**
 * Accepts a local path, any http(s) image URL, or a Google Drive share link.
 * Drive share links don't serve raw image bytes, so they're rewritten to the
 * direct-view form. Anything unrecognized falls back to the default image.
 */
function normalizeImageUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "/assets/gen/terrain-hillshade.png";
  if (v.startsWith("/")) return v;
  let url: URL;
  try {
    url = new URL(v);
  } catch {
    return "/assets/gen/terrain-hillshade.png";
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return "/assets/gen/terrain-hillshade.png";
  }
  if (url.hostname === "drive.google.com") {
    const fileMatch = url.pathname.match(/\/file\/d\/([\w-]+)/);
    const id = fileMatch?.[1] ?? url.searchParams.get("id");
    if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
  }
  return url.toString();
}

function revalidateNews(slug?: string, oldSlug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/news/${slug}`);
  if (oldSlug && oldSlug !== slug) revalidatePath(`/news/${oldSlug}`);
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const data = await req.formData();
  const action = String(data.get("_action") || "save");
  const id = Number(data.get("id") || 0) || undefined;

  if (action === "delete") {
    if (id) {
      const existing = await getArticleById(id);
      await deleteArticle(id);
      revalidateNews(undefined, existing?.slug);
    }
    return NextResponse.redirect(new URL("/admin/articles", req.url), 303);
  }

  const title = String(data.get("title") || "").trim();
  const bodyText = String(data.get("body") || "").trim();
  if (!title || !bodyText) {
    return NextResponse.redirect(new URL(`/admin/articles/${id ?? "new"}?error=required`, req.url), 303);
  }

  let slug = slugify(String(data.get("slug") || "") || title);
  const existing = id ? await getArticleById(id) : undefined;
  // Keep slugs unique without clobbering another article.
  const clash = await getArticle(slug);
  if (clash && clash.id !== id) slug = `${slug}-${Date.now() % 10000}`;

  const dateISO = String(data.get("date_iso") || "").trim() || new Date().toISOString().slice(0, 10);
  const [yy, mm] = dateISO.split("-");
  const savedId = await upsertArticle({
    id,
    slug,
    title,
    meta_title: String(data.get("meta_title") || "").trim() || title.slice(0, 60),
    tag: (String(data.get("tag") || "").trim() || "NEWS").toUpperCase().slice(0, 24),
    date_label: `${mm} / ${yy}`,
    date_iso: dateISO,
    description: String(data.get("description") || "").trim().slice(0, 300),
    reading_time: String(data.get("reading_time") || "").trim() || "4 min read",
    img: normalizeImageUrl(String(data.get("img") || "")),
    img_alt: String(data.get("img_alt") || "").trim().slice(0, 300),
    body_json: JSON.stringify(textToBody(bodyText)),
    published: data.get("published") ? 1 : 0,
  });
  revalidateNews(slug, existing?.slug);
  return NextResponse.redirect(new URL(`/admin/articles?saved=${savedId}`, req.url), 303);
}
