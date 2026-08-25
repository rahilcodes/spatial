import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import { normalizeEmail, OTP_ENABLED, verifyGrant } from "@/lib/otp";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CV_TYPES = [".pdf", ".doc", ".docx"];
const MAX_CV_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form payload" }, { status: 400 });
  }

  if (String(data.get("company_website") || "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.get("name") || "").trim().slice(0, 200);
  const email = String(data.get("email") || "").trim().slice(0, 200);
  const role = String(data.get("role") || "").trim().slice(0, 200);
  const message = String(data.get("message") || "").trim().slice(0, 5000);
  const cv = data.get("cv");

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }
  // OTP gate: the applicant's email must be verified (grant cookie bound to it).
  if (OTP_ENABLED) {
    const token = req.cookies.get("sa_careers_grant")?.value;
    if (!verifyGrant(token, "careers", normalizeEmail(email))) {
      return NextResponse.json({ error: "Please verify your email with the code we sent before submitting." }, { status: 403 });
    }
  }
  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: "A CV attachment is required" }, { status: 400 });
  }
  const ext = `.${cv.name.split(".").pop()?.toLowerCase()}`;
  if (!CV_TYPES.includes(ext)) {
    return NextResponse.json({ error: `CV must be one of: ${CV_TYPES.join(", ")}` }, { status: 400 });
  }
  if (cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "CV must be under 5 MB" }, { status: 400 });
  }

  const storedName = `cv-${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const storedPath = join(process.cwd(), "data", "uploads", storedName);
  await writeFile(storedPath, Buffer.from(await cv.arrayBuffer()));

  createLead({
    kind: "careers",
    name,
    email,
    topic: role,
    message,
    cv_path: storedName,
    cv_name: cv.name.slice(0, 200),
  });
  return NextResponse.json({ ok: true });
}
