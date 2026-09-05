import { NextResponse } from "next/server";
import { pingDb } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Deployment health check: which env vars are present (booleans only, never
 * values) and whether the database answers. Hostnames are masked in errors.
 */
const has = (key: string) => Boolean(process.env[key]);

function sanitize(message: string | undefined): string {
  return (message ?? "unknown error")
    .replace(/\b[\w.-]+\.(neon\.tech|amazonaws\.com|vercel-storage\.com)\b/gi, "<db-host>")
    .replace(/postgres(ql)?:\/\/\S+/gi, "<connection-string>")
    .slice(0, 240);
}

export async function GET() {
  const env = {
    DATABASE_URL: has("DATABASE_URL"),
    BLOB_READ_WRITE_TOKEN: has("BLOB_READ_WRITE_TOKEN"),
    SMTP: has("SMTP_HOST") && has("SMTP_USER") && has("SMTP_PASS"),
    LEADS_NOTIFY_EMAIL: has("LEADS_NOTIFY_EMAIL"),
    ADMIN_PASSWORD: has("ADMIN_PASSWORD"),
    AUTH_SECRET: has("AUTH_SECRET"),
    NEXT_PUBLIC_OTP_ENABLED: process.env.NEXT_PUBLIC_OTP_ENABLED ?? "(unset)",
    NEXT_PUBLIC_CLARITY_ID: has("NEXT_PUBLIC_CLARITY_ID"),
  };

  const started = Date.now();
  let db = "ok";
  try {
    await pingDb();
  } catch (e) {
    const err = e as { code?: string; message?: string };
    db = `${err.code ?? "ERROR"}: ${sanitize(err.message)}`;
  }

  return NextResponse.json(
    {
      ok: db === "ok",
      db,
      dbMs: Date.now() - started,
      env,
      region: process.env.VERCEL_REGION ?? null,
      checkedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
