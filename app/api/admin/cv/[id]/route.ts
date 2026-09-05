import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { getLeadById } from "@/lib/db";
import { getBlobStream } from "@/lib/blob";

// Admin-only: streams the applicant's CV from the private Vercel Blob store.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum)) return new Response("Not found", { status: 404 });

  const lead = await getLeadById(idNum);
  if (!lead?.cv_path) return new Response("Not found", { status: 404 });

  const blob = await getBlobStream(lead.cv_path);
  if (!blob) return new Response("File unavailable", { status: 404 });

  const filename = (lead.cv_name || `cv-${idNum}`).replace(/"/g, "");
  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": blob.contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
