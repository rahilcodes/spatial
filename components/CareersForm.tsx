"use client";

import { useState } from "react";

const MAX_CV_MB = 5;
const CV_TYPES = [".pdf", ".doc", ".docx"];

// Applications are stored as leads (CV included) and managed in the /admin panel.
const ENDPOINT = "/api/careers";

type Errors = { name?: string; email?: string; cv?: string };

export default function CareersForm({ roles }: { roles: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [cvName, setCvName] = useState<string>("");

  const errCls = "text-[13px] font-medium text-[#C0392B]";

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
    const email = String(data.get("email") || "").trim();
    const cv = data.get("cv") as File | null;

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    const cvError = validateCv(cv);
    if (cvError) nextErrors.cv = cvError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
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
          <input
            id="careers-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="field-light"
          />
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
            aria-invalid={Boolean(errors.email)}
            className="field-light"
          />
        </label>
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>
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
        {cvName && !errors.cv && (
          <p className="m-0 font-mono text-[11.5px] text-ink/65">ATTACHED: {cvName}</p>
        )}
        {errors.cv && <p className={errCls}>{errors.cv}</p>}
      </div>
      <label htmlFor="careers-message" className="field-label text-ink/65 sm:col-span-2">
        MESSAGE (OPTIONAL)
        <textarea id="careers-message" name="message" rows={4} className="field-light resize-y" />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="careers-company-website">
          Company website
          <input
            id="careers-company-website"
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      {status === "error" && (
        <p role="alert" className={`${errCls} sm:col-span-2`}>
          Something went wrong submitting your application. Please email your CV to
          info@spatialalphabet.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-solid btn-solid--invert justify-self-start border-0 font-[family-name:var(--font-plex-sans)] disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
