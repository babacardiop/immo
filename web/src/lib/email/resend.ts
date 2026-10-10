import { Resend } from "resend";

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id?: string; skipped?: boolean }
  | { ok: false; error: string };

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/**
 * Resend wrapper. Skips when RESEND_API_KEY missing (local/CI).
 * With `onboarding@resend.dev`, Resend only delivers to the account owner email
 * until a custom domain is verified.
 */
export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const client = getClient();
  const from =
    process.env.EMAIL_FROM?.trim() || "EverGreen <onboarding@resend.dev>";

  if (!client) {
    return { ok: true, skipped: true };
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html ?? `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(input.text)}</pre>`,
      replyTo: input.replyTo,
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "email_failed",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Prefer EMAIL_AGENT_INBOX, fallback EMAIL_LEADS_TO (CdCT alias). */
export function agentInbox(): string | null {
  return (
    process.env.EMAIL_AGENT_INBOX?.trim() ||
    process.env.EMAIL_LEADS_TO?.trim() ||
    null
  );
}
