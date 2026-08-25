"use client";

import { useState } from "react";

const MAX_CV_MB = 5;
const CV_TYPES = [".pdf", ".doc", ".docx"];
const ENDPOINT = "/api/careers";
const OTP_ENABLED = (process.env.NEXT_PUBLIC_OTP_ENABLED ?? "true").toLowerCase() !== "false";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { name?: string; email?: string; cv?: string };

export default function CareersForm({ roles }: { roles: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [cvName, setCvName] = useState<string>("");

  // OTP email verification
  const [email, setEmail] = useState("");
  const [otpStage, setOtpStage] = useState<"idle" | "code" | "verified">("idle");
  const [otpCode, setOtpCode] = useState("");
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpMsg, setOtpMsg] = useState<string | null>(null);
  const [otpErr, setOtpErr] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);

  const errCls = "text-[13px] font-medium text-[#C0392B]";
  const verified = otpStage === "verified" || !OTP_ENABLED;

  function onEmailChange(v: string) {
    setEmail(v);
    // Any change invalidates a prior verification.
    if (otpStage !== "idle") {
      setOtpStage("idle");
      setOtpCode("");
      setOtpMsg(null);
      setDevCode(null);
    }
  }

  async function sendCode() {
    setOtpErr(null);
    if (!EMAIL_RE.test(email.trim())) {
      setOtpErr("Enter a valid email first.");
      return;
    }
    setOtpBusy(true);
    try {
      const res = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "careers", ref: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpErr(data.error || "Could not send code.");
        return;
      }
      setOtpStage("code");
      if (data.devCode) {
        setDevCode(data.devCode);
        setOtpMsg("Email delivery isn't configured yet — use the test code below.");
      } else {
        setOtpMsg(`We sent a 6-digit code to ${email}.`);
      }
    } catch {
      setOtpErr("Network error — please try again.");
    } finally {
      setOtpBusy(false);
    }
  }

  async function verifyCode() {
    setOtpErr(null);
    setOtpBusy(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode, purpose: "careers", ref: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpErr(data.error || "Invalid code.");
        return;
      }
      setOtpStage("verified");
      setOtpMsg(null);
      setDevCode(null);
    } catch {
      setOtpErr("Network error — please try again.");
    } finally {
      setOtpBusy(false);
    }
  }

  function validateCv(file: File | null): string | undefined {
    if (!file || file.size === 0) return "Please attach your CV.";
    const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!CV_TYPES.includes(ext)) return `CV must be one of: ${CV_TYPES.join(", ")}`;
    if (file.size > MAX_CV_MB * 1024 * 1024) return `CV must be under ${MAX_CV_MB} MB.`;
    return undefined;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") || "").length > 0) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const cv = data.get("cv") as File | null;

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) nextErrors.email = "Please enter a valid email address.";
    const cvError = validateCv(cv);
    if (cvError) nextErrors.cv = cvError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!verified) {
      setOtpErr("Please verify your email before submitting.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error(`Careers endpoint responded ${res.status}`);
      setStatus("sent");
      form.reset();
      setCvName("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="display text-[18px] font-semibold text-accent-hover">
        Application received — we review every submission and reply within one week.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="careers-name" className="field-label text-ink/65">
          NAME
          <input id="careers-name" type="text" name="name" required autoComplete="name" aria-invalid={Boolean(errors.name)} className="field-light" />
        </label>
        {errors.name && <p className={errCls}>{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="careers-email" className="field-label text-ink/65">
          EMAIL
          <input
            id="careers-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="field-light"
          />
        </label>
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>

      {/* OTP email verification */}
      {OTP_ENABLED && (
        <div className="rounded-[4px] border border-ink/15 bg-white p-4 sm:col-span-2">
          {otpStage === "verified" ? (
            <p className="m-0 flex items-center gap-2 text-[13.5px] font-semibold text-accent-hover">
              <span aria-hidden="true">✓</span> Email verified — you can submit your application.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="m-0 font-mono text-[10.5px] tracking-[.12em] text-ink/65">
                VERIFY EMAIL — REQUIRED BEFORE SUBMITTING
              </p>
              {otpStage === "idle" ? (
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={otpBusy}
                  className="w-max cursor-pointer rounded-[2px] border border-ink/25 bg-transparent px-4 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent-hover disabled:opacity-60"
                >
                  {otpBusy ? "Sending…" : "Send verification code"}
                </button>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {otpMsg && <p className="m-0 text-[13px] text-ink/70">{otpMsg}</p>}
                  {devCode && (
                    <p className="m-0 w-max rounded-[3px] border border-accent/40 bg-accent/5 px-3 py-1.5 font-mono text-[16px] tracking-[6px] text-accent-hover">
                      {devCode}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="field-light !min-h-0 w-[130px] py-2 text-center font-mono text-[16px] tracking-[6px]"
                    />
                    <button
                      type="button"
                      onClick={verifyCode}
                      disabled={otpBusy || otpCode.length < 6}
                      className="cursor-pointer rounded-[2px] border-0 bg-navy-btn px-4 py-2.5 text-[13px] font-semibold text-bg-light transition-colors hover:bg-accent hover:text-navy-deepest disabled:opacity-60"
                    >
                      {otpBusy ? "Verifying…" : "Verify"}
                    </button>
                    <button
                      type="button"
                      onClick={sendCode}
                      disabled={otpBusy}
                      className="cursor-pointer border-0 bg-transparent p-0 text-[12.5px] text-ink/55 hover:text-accent-hover"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              )}
              {otpErr && <p className={errCls}>{otpErr}</p>}
            </div>
          )}
        </div>
      )}

      <label htmlFor="careers-role" className="field-label text-ink/65 sm:col-span-2">
        ROLE
        <select id="careers-role" name="role" className="field-light">
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
          <option>General application</option>
        </select>
      </label>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="careers-cv" className="field-label text-ink/65">
          CV / RESUME (PDF, DOC, DOCX — MAX {MAX_CV_MB} MB)
          <input
            id="careers-cv"
            type="file"
            name="cv"
            required
            accept={CV_TYPES.join(",")}
            aria-invalid={Boolean(errors.cv)}
            onChange={(e) => {
              const f = e.currentTarget.files?.[0] ?? null;
              setCvName(f ? f.name : "");
              setErrors((prev) => ({ ...prev, cv: f ? validateCv(f) : undefined }));
            }}
            className="field-light cursor-pointer pt-[10px] file:mr-4 file:cursor-pointer file:rounded-[2px] file:border-0 file:bg-navy-btn file:px-3.5 file:py-1.5 file:text-[13px] file:font-semibold file:text-bg-light"
          />
        </label>
        {cvName && !errors.cv && <p className="m-0 font-mono text-[11.5px] text-ink/65">ATTACHED: {cvName}</p>}
        {errors.cv && <p className={errCls}>{errors.cv}</p>}
      </div>
      <label htmlFor="careers-message" className="field-label text-ink/65 sm:col-span-2">
        MESSAGE (OPTIONAL)
        <textarea id="careers-message" name="message" rows={4} className="field-light resize-y" />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="careers-company-website">
          Company website
          <input id="careers-company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && (
        <p role="alert" className={`${errCls} sm:col-span-2`}>
          Something went wrong submitting your application. Please email your CV to info@spatialalphabet.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending" || !verified}
        title={!verified ? "Verify your email first" : undefined}
        className="btn-solid btn-solid--invert justify-self-start border-0 font-[family-name:var(--font-plex-sans)] disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
