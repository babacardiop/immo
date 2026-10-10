/**
 * Smoke-test Resend with current .env
 * Usage: node --env-file=.env scripts/smoke-resend.mjs [to@email]
 *
 * Default to= delivered@resend.dev (always accepted by Resend for API checks).
 * With onboarding@resend.dev as FROM, only the Resend account owner email
 * can receive real inbox mail until a domain is verified.
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.EMAIL_FROM?.trim() || "EverGreen <onboarding@resend.dev>";
const to =
  process.argv[2] ||
  process.env.EMAIL_AGENT_INBOX?.trim() ||
  "delivered@resend.dev";

if (!apiKey) {
  console.error("RESEND_API_KEY missing");
  process.exit(1);
}

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "EverGreen smoke — Resend OK",
  text: "Smoke test S03 CRM. Si vous lisez ceci, Resend est branché.",
  html: "<p><strong>Smoke test S03 CRM.</strong> Si vous lisez ceci, Resend est branché.</p>",
});

if (error) {
  console.error("FAIL", error);
  process.exit(1);
}
console.log("OK id=", data?.id, "to=", to, "from=", from);
