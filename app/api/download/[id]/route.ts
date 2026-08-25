import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";
import { getDownloadById } from "@/lib/db";
import { OTP_ENABLED, verifyGrant } from "@/lib/otp";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
};

// Public: serves a published download. When OTP gating is on, a valid OTP grant
// cookie (from /api/otp/verify) is required. Handles both uploaded files and
// external URLs so both are gated consistently.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getDownloadById(Number(id));
  if (!item || !item.published || (!item.file_path && !item.url)) {
    return new Response("Not found", { status: 404 });
  }

  if (OTP_ENABLED) {
    const token = req.cookies.get(`sa_dl_grant_${id}`)?.value;
    if (!verifyGrant(token, "download", String(id))) {
      return new Response("Verification required", { status: 403 });
    }
  }

  // External link: redirect (still behind the OTP gate).
  if (!item.file_path && item.url) {
    return NextResponse.redirect(item.url);
  }

  const file = join(process.cwd(), "data", "uploads", basename(item.file_path!));
  if (!existsSync(file)) return new Response("File missing", { status: 404 });

  const ext = `.${file.split(".").pop()?.toLowerCase()}`;
  const filename = (item.file_name ?? `${item.title}${ext}`).replace(/"/g, "");
  return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
