import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteDownload, getDownloadById, upsertDownload } from "@/lib/db";

const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".zip", ".xls", ".xlsx"];

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const data = await req.formData();
  const action = String(data.get("_action") || "save");
  const id = Number(data.get("id") || 0) || undefined;

  if (action === "delete") {
    if (id) deleteDownload(id);
    revalidatePath("/downloads");
    return NextResponse.redirect(new URL("/admin/downloads", req.url), 303);
  }

  const title = String(data.get("title") || "").trim();
  if (!title) {
    return NextResponse.redirect(new URL(`/admin/downloads/${id ?? "new"}?error=required`, req.url), 303);
  }

  const existing = id ? getDownloadById(id) : undefined;

  // Handle optional file upload (replaces any prior file).
  let filePath = existing?.file_path ?? null;
  let fileName = existing?.file_name ?? null;
  const file = data.get("file");
  if (file instanceof File && file.size > 0) {
    const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!ALLOWED.includes(ext)) {
      return NextResponse.redirect(new URL(`/admin/downloads/${id ?? "new"}?error=filetype`, req.url), 303);
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.redirect(new URL(`/admin/downloads/${id ?? "new"}?error=filesize`, req.url), 303);
    }
    const stored = `dl-${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
    await writeFile(join(process.cwd(), "data", "uploads", stored), Buffer.from(await file.arrayBuffer()));
    filePath = stored;
    fileName = file.name.slice(0, 200);
  }

  upsertDownload({
    id,
    title: title.slice(0, 200),
    kind: String(data.get("kind") || "").trim() || "PDF · RESOURCE",
    descr: String(data.get("descr") || "").trim().slice(0, 500),
    img: String(data.get("img") || "").trim() || "/assets/gen/terrain-hillshade.png",
    file_path: filePath,
    file_name: fileName,
    url: String(data.get("url") || "").trim() || null,
    published: data.get("published") ? 1 : 0,
    sort: Number(data.get("sort") || 0) || 0,
  });
  revalidatePath("/downloads");
  return NextResponse.redirect(new URL("/admin/downloads", req.url), 303);
}
