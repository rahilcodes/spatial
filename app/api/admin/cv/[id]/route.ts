import { createReadStream, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { Readable } from "node:stream";
import { NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { getLeadById } from "@/lib/db";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const lead = getLeadById(Number(id));
  if (!lead?.cv_path) return new Response("Not found", { status: 404 });

  // basename() guards against any path traversal in stored values.
  const file = join(process.cwd(), "data", "uploads", basename(lead.cv_path));
  if (!existsSync(file)) return new Response("File missing", { status: 404 });

  const ext = `.${file.split(".").pop()?.toLowerCase()}`;
  return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${(lead.cv_name ?? "cv" + ext).replace(/"/g, "")}"`,
    },
  });
}
