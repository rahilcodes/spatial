import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form payload" }, { status: 400 });
  }

  // Honeypot — pretend success so bots learn nothing.
  if (String(data.get("company_website") || "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.get("name") || "").trim().slice(0, 200);
  const email = String(data.get("email") || "").trim().slice(0, 200);
  const topic = String(data.get("service") || "").trim().slice(0, 200);
  const message = String(data.get("message") || "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  createLead({ kind: "contact", name, email, topic, message });
  return NextResponse.json({ ok: true });
}
