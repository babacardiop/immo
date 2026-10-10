import { agentInbox, sendEmail } from "@/lib/email/resend";

export async function notifyAgentNewLead(input: {
  leadId: string;
  name: string;
  phone: string;
  intent?: string | null;
  listingTitle?: string | null;
  send?: typeof sendEmail;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const inbox = agentInbox();
  if (!inbox) return { ok: true, skipped: true };

  const send = input.send ?? sendEmail;
  const subject = `Nouveau lead — ${input.name}`;
  const lines = [
    `Lead ${input.leadId}`,
    `Nom: ${input.name}`,
    `Tél: ${input.phone}`,
    input.intent ? `Intent: ${input.intent}` : null,
    input.listingTitle ? `Bien: ${input.listingTitle}` : null,
    "",
    "Répondre sous 24 h (SLA société).",
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
      <h2 style="margin:0 0 12px">Nouveau lead</h2>
      <p style="margin:0 0 8px"><strong>${escape(input.name)}</strong></p>
      <ul style="padding-left:18px;margin:0 0 16px">
        <li>Tél: ${escape(input.phone)}</li>
        ${input.intent ? `<li>Intent: ${escape(input.intent)}</li>` : ""}
        ${input.listingTitle ? `<li>Bien: ${escape(input.listingTitle)}</li>` : ""}
        <li>ID: <code>${escape(input.leadId)}</code></li>
      </ul>
      <p style="color:#555;margin:0">SLA: répondre sous 24 h.</p>
    </div>
  `;

  const result = await send({
    to: inbox,
    subject,
    text,
    html,
    replyTo: undefined,
  });
  if (!result.ok) {
    console.error("[email] agent notify failed:", result.error);
    return { ok: false, error: result.error };
  }
  return { ok: true, skipped: "skipped" in result ? result.skipped : false };
}

export async function ackLeadSubmitter(input: {
  email: string;
  name: string;
  send?: typeof sendEmail;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const send = input.send ?? sendEmail;
  const subject = "EverGreen — nous avons bien reçu votre demande";
  const text = [
    `Bonjour ${input.name},`,
    "",
    "Merci pour votre message. Un conseiller vous répond sous 24 h.",
    "En attendant, précisez acheter / louer / vendre / gérer + zone si besoin.",
    "",
    "— EverGreen",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a1a1a">
      <p>Bonjour ${escape(input.name)},</p>
      <p>Merci pour votre message. Un conseiller vous répond sous <strong>24 h</strong>.</p>
      <p style="color:#555">En attendant, précisez acheter / louer / vendre / gérer + zone si besoin.</p>
      <p>— EverGreen</p>
    </div>
  `;

  const result = await send({ to: input.email, subject, text, html });
  if (!result.ok) {
    console.error("[email] submitter ack failed:", result.error);
    return { ok: false, error: result.error };
  }
  return { ok: true, skipped: "skipped" in result ? result.skipped : false };
}

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
