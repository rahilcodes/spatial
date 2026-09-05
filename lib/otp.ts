import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { bumpOtpAttempts, consumeOtp, insertOtp, latestOtp } from "@/lib/db";

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const GRANT_TTL_MS = 20 * 60 * 1000; // 20 minutes
const MAX_ATTEMPTS = 5;

/** OTP gating is on by default; set NEXT_PUBLIC_OTP_ENABLED=false to disable everywhere. */
export const OTP_ENABLED = (process.env.NEXT_PUBLIC_OTP_ENABLED ?? "true").toLowerCase() !== "false";
export const GRANT_TTL_SECONDS = GRANT_TTL_MS / 1000;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET not set — add it to .env.local");
  return s;
}
function hmac(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}
export function normalizeEmail(e: string): string {
  return e.trim().toLowerCase();
}

/** Generates a 6-digit code, stores its hash, and returns the plaintext for delivery. */
export async function createOtp(email: string, purpose: string, ref: string): Promise<string> {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await insertOtp({
    email: normalizeEmail(email),
    purpose,
    ref,
    code_hash: hmac(`${purpose}:${ref}:${code}`),
    expires_at: Date.now() + CODE_TTL_MS,
  });
  return code;
}

export async function verifyOtp(email: string, purpose: string, ref: string, code: string): Promise<{ ok: boolean; reason?: string }> {
  const row = await latestOtp(normalizeEmail(email), purpose, ref);
  if (!row) return { ok: false, reason: "No code found — request a new one." };
  if (Number(row.expires_at) < Date.now()) return { ok: false, reason: "Code expired — request a new one." };
  if (row.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "Too many attempts — request a new code." };
  await bumpOtpAttempts(row.id);
  const expected = Buffer.from(row.code_hash);
  const got = Buffer.from(hmac(`${purpose}:${ref}:${code.trim()}`));
  const match = expected.length === got.length && timingSafeEqual(expected, got);
  if (!match) return { ok: false, reason: "Incorrect code." };
  await consumeOtp(row.id);
  return { ok: true };
}

/** Signed, short-lived grant binding purpose+ref (ref = download id, or email for careers). */
export function issueGrant(purpose: string, ref: string): string {
  const exp = String(Date.now() + GRANT_TTL_MS);
  return `${exp}.${hmac(`grant:${purpose}:${ref}:${exp}`)}`;
}
export function verifyGrant(token: string | undefined, purpose: string, ref: string): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(hmac(`grant:${purpose}:${ref}:${exp}`));
  return a.length === b.length && timingSafeEqual(a, b);
}
