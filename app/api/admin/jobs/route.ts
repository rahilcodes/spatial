import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { slugify } from "@/lib/article-body";
import { deleteJob, listJobs, upsertJob } from "@/lib/db";

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const data = await req.formData();
  const action = String(data.get("_action") || "save");
  const id = Number(data.get("id") || 0) || undefined;

  if (action === "delete") {
    if (id) await deleteJob(id);
    revalidatePath("/careers");
    return NextResponse.redirect(new URL("/admin/jobs", req.url), 303);
  }

  const title = String(data.get("title") || "").trim();
  const blurb = String(data.get("blurb") || "").trim();
  if (!title || !blurb) {
    return NextResponse.redirect(new URL(`/admin/jobs/${id ?? "new"}?error=required`, req.url), 303);
  }

  let slug = slugify(title);
  if ((await listJobs()).some((j) => j.slug === slug && j.id !== id)) slug = `${slug}-${Date.now() % 10000}`;

  const skills = String(data.get("skills") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);

  await upsertJob({
    id,
    slug,
    title,
    office: String(data.get("office") || "").trim() || "Hyderabad, India",
    type: String(data.get("type") || "").trim() || "Full-time",
    blurb: blurb.slice(0, 1000),
    skills_json: JSON.stringify(skills),
    open: data.get("open") ? 1 : 0,
  });
  revalidatePath("/careers");
  return NextResponse.redirect(new URL("/admin/jobs", req.url), 303);
}
