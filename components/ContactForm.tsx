"use client";

import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/data";

type Props = {
  variant: "dark" | "light";
  idPrefix: string;
};

type Errors = { name?: string; email?: string };

// Wire NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree/Basin URL) to receive submissions.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function ContactForm({ variant, idPrefix }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const fieldCls = variant === "dark" ? "field-dark" : "field-light";
  const labelCls =
    variant === "dark" ? "field-label text-bg-light/55" : "field-label text-ink/65";
  const errCls = "text-[13px] font-medium text-[#C0392B]";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this field.
    if (String(data.get("company_website") || "").length > 0) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p
        role="status"
        className={`display text-[18px] font-semibold ${
          variant === "dark" ? "text-accent-light" : "text-accent-hover"
        }`}
      >
        Message received — we reply within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}-name`} className={labelCls}>
          NAME
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={fieldCls}
          />
        </label>
        {errors.name && <p className={errCls}>{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}-email`} className={labelCls}>
          EMAIL
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={fieldCls}
          />
        </label>
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>
      <label htmlFor={`${idPrefix}-service`} className={`${labelCls} sm:col-span-2`}>
        SERVICE OF INTEREST
        <select id={`${idPrefix}-service`} name="service" className={fieldCls}>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${idPrefix}-message`} className={`${labelCls} sm:col-span-2`}>
        MESSAGE
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          className={`${fieldCls} resize-y`}
        />
      </label>
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-company-website`}>
          Company website
          <input
            id={`${idPrefix}-company-website`}
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      {status === "error" && (
        <p role="alert" className={`${errCls} sm:col-span-2`}>
          Something went wrong sending your message. Please email us directly at
          info@spatialalphabet.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-solid justify-self-start border-0 font-[family-name:var(--font-plex-sans)] disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
