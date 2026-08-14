import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { Readable } from "node:stream";
import { NextRequest } from "next/server";
import { getDownloadById } from "@/lib/db";

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

// Public: serves a published download's uploaded file (no auth — these are public assets).
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getDownloadById(Number(id));
  if (!item || !item.published || !item.file_path) return new Response("Not found", { status: 404 });

  const file = join(process.cwd(), "data", "uploads", basename(item.file_path));
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
