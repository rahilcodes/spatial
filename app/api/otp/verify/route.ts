import { NextRequest, NextResponse } from "next/server";
import { GRANT_TTL_SECONDS, issueGrant, normalizeEmail, OTP_ENABLED, verifyOtp } from "@/lib/otp";

const PURPOSES = ["download", "careers"];

export async function POST(req: NextRequest) {
  if (!OTP_ENABLED) return NextResponse.json({ ok: true, otpDisabled: true });

  const body = await req.json().catch(() => null);
  const email = normalizeEmail(String(body?.email || ""));
  const purpose = String(body?.purpose || "");
  const ref = String(body?.ref || "");
  const code = String(body?.code || "");
  if (!PURPOSES.includes(purpose)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const result = verifyOtp(email, purpose, ref, code);
  if (!result.ok) return NextResponse.json({ error: result.reason }, { status: 400 });

  // Grant binds to the download id (download) or the verified email (careers).
  const grantRef = purpose === "careers" ? email : ref;
  const grant = issueGrant(purpose, grantRef);
  const cookieName = purpose === "careers" ? "sa_careers_grant" : `sa_dl_grant_${ref}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, grant, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: GRANT_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
