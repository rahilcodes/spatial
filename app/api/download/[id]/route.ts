import { NextRequest, NextResponse } from "next/server";
import { getDownloadById } from "@/lib/db";
import { getBlobStream } from "@/lib/blob";
import { OTP_ENABLED, verifyGrant } from "@/lib/otp";

// Public: serves a published download behind the OTP gate. Uploaded files are
// streamed from the private Vercel Blob store; external URLs are redirected.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isInteger(idNum)) return new Response("Not found", { status: 404 });

  const item = await getDownloadById(idNum);
  if (!item || !item.published || (!item.file_path && !item.url)) {
    return new Response("Not found", { status: 404 });
  }

  if (OTP_ENABLED) {
    const token = req.cookies.get(`sa_dl_grant_${id}`)?.value;
    if (!verifyGrant(token, "download", String(id))) {
      return new Response("Verification required", { status: 403 });
    }
  }

  // External link → redirect (still behind the OTP gate).
  if (!item.file_path && item.url) {
    return NextResponse.redirect(item.url);
  }

  const blob = await getBlobStream(item.file_path!);
  if (!blob) return new Response("File unavailable", { status: 404 });

  const filename = (item.file_name || item.title || "download").replace(/"/g, "");
  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": blob.contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
