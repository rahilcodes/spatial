"use client";

import { useEffect, useState } from "react";

const OTP_ENABLED = (process.env.NEXT_PUBLIC_OTP_ENABLED ?? "true").toLowerCase() !== "false";

export default function DownloadButton({ id, title }: { id: number; title: string }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function start() {
    if (!OTP_ENABLED) {
      window.location.href = `/api/download/${id}`;
      return;
    }
    setStage("email");
    setCode("");
    setError(null);
    setDevCode(null);
    setNotice(null);
    setOpen(true);
  }

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "download", ref: String(id) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setStage("code");
      if (data.devCode) {
        setDevCode(data.devCode);
        setNotice("Email delivery isn't configured yet — use the test code below.");
      } else if (data.delivered) {
        setNotice(`We sent a 6-digit code to ${email}. Enter it below.`);
      } else {
        setNotice("Enter the 6-digit code.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, purpose: "download", ref: String(id) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid code.");
        return;
      }
      setOpen(false);
      window.location.href = `/api/download/${id}`;
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={start}
        className="hit-area mt-auto w-max cursor-pointer border-0 bg-transparent p-0 text-[14px] font-semibold text-accent-hover"
      >
        {OTP_ENABLED ? "Get download →" : "Download →"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Verify to download ${title}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-deepest/70 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-[400px] rounded-[6px] border border-ink/15 bg-white p-6 shadow-[0_24px_60px_-12px_rgba(12,27,51,.45)]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="m-0 font-mono text-[10.5px] tracking-[.14em] text-accent-hover">SECURE DOWNLOAD</p>
                <h2 className="display m-0 mt-1 text-[18px] font-semibold text-ink">{title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="cursor-pointer border-0 bg-transparent p-1 text-[18px] leading-none text-ink/50 hover:text-ink"
              >
                ✕
              </button>
            </div>

            {stage === "email" ? (
              <form onSubmit={requestCode} className="flex flex-col gap-3">
                <p className="m-0 text-[13.5px] leading-[1.55] text-ink/70">
                  Enter your email and we&apos;ll send a one-time code to unlock this download.
                </p>
                <label className="field-label text-ink/65">
                  EMAIL
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-light"
                  />
                </label>
                {error && <p className="m-0 text-[13px] font-medium text-[#C0392B]">{error}</p>}
                <button type="submit" disabled={busy} className="btn-solid btn-solid--invert mt-1 justify-center border-0 disabled:opacity-60">
                  {busy ? "Sending…" : "Send code"}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="flex flex-col gap-3">
                {notice && <p className="m-0 text-[13px] leading-[1.5] text-ink/70">{notice}</p>}
                {devCode && (
                  <p className="m-0 rounded-[3px] border border-accent/40 bg-accent/5 px-3 py-2 text-center font-mono text-[18px] tracking-[6px] text-accent-hover">
                    {devCode}
                  </p>
                )}
                <label className="field-label text-ink/65">
                  6-DIGIT CODE
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="field-light text-center font-mono text-[18px] tracking-[6px]"
                  />
                </label>
                {error && <p className="m-0 text-[13px] font-medium text-[#C0392B]">{error}</p>}
                <button type="submit" disabled={busy} className="btn-solid btn-solid--invert mt-1 justify-center border-0 disabled:opacity-60">
                  {busy ? "Verifying…" : "Verify & download"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStage("email");
                    setError(null);
                  }}
                  className="cursor-pointer border-0 bg-transparent p-0 text-[12.5px] text-ink/55 hover:text-accent-hover"
                >
                  ← Use a different email
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
