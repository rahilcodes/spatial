import { NextRequest, NextResponse } from "next/server";
import { recentOtpCount } from "@/lib/db";
import { createOtp, EMAIL_RE, normalizeEmail, OTP_ENABLED } from "@/lib/otp";
import { sendOtpEmail, SMTP_CONFIGURED } from "@/lib/mailer";

const PURPOSES = ["download", "careers"];

export async function POST(req: NextRequest) {
  if (!OTP_ENABLED) return NextResponse.json({ ok: true, otpDisabled: true });

  const body = await req.json().catch(() => null);
  const email = normalizeEmail(String(body?.email || ""));
  const purpose = String(body?.purpose || "");
  const ref = String(body?.ref || "");

  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!PURPOSES.includes(purpose)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Simple rate limit: max 3 codes per email per minute.
  if ((await recentOtpCount(email, 60)) >= 3) {
    return NextResponse.json({ error: "Too many requests — wait a minute and try again." }, { status: 429 });
  }

  const code = await createOtp(email, purpose, ref);
  const label = purpose === "careers" ? "your job application" : "your download";
  const delivered = await sendOtpEmail(email, code, label).catch(() => false);

  // Dev fallback: when SMTP isn't configured yet, return the code so the flow is
  // fully testable. Once SMTP is set, the code is emailed and never returned.
  return NextResponse.json({
    ok: true,
    delivered,
    devCode: SMTP_CONFIGURED ? undefined : code,
  });
}
