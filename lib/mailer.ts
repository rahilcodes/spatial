import nodemailer, { type Transporter } from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

/** Email delivery is active only when SMTP credentials are configured. */
export const SMTP_CONFIGURED = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);

let transporter: Transporter | null = null;
function getTransport(): Transporter | null {
  if (!SMTP_CONFIGURED) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

/** Returns true if the email was dispatched, false if SMTP isn't configured (dev fallback). */
export async function sendOtpEmail(to: string, code: string, purposeLabel: string): Promise<boolean> {
  const t = getTransport();
  if (!t) return false;
  const from = SMTP_FROM || `Spatial Alphabet <${SMTP_USER}>`;
  await t.sendMail({
    from,
    to,
    subject: `Your Spatial Alphabet verification code: ${code}`,
    text: `Your verification code for ${purposeLabel} is ${code}. It expires in 10 minutes. If you didn't request it, ignore this email.`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:auto;padding:8px 4px">
      <p style="font-size:14px;color:#0C1B33;margin:0 0 6px">Your verification code for <strong>${purposeLabel}</strong> is:</p>
      <p style="font-size:34px;letter-spacing:8px;font-weight:700;color:#00719F;margin:6px 0">${code}</p>
      <p style="font-size:12px;color:#667;margin:6px 0">This code expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
      <p style="font-size:12px;color:#99A;margin:14px 0 0">— Spatial Alphabet</p>
    </div>`,
  });
  return true;
}
