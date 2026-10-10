/**
 * End-to-end CRM smoke: create Lead + send agent notify email.
 * Usage: node --env-file=.env scripts/smoke-lead.mjs
 */
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.EMAIL_FROM?.trim() || "EverGreen <onboarding@resend.dev>";
const inbox =
  process.env.EMAIL_AGENT_INBOX?.trim() ||
  process.env.EMAIL_LEADS_TO?.trim();

if (!apiKey || !inbox) {
  console.error("Need RESEND_API_KEY + EMAIL_AGENT_INBOX");
  process.exit(1);
}

const seedEmail = (
  process.env.SEED_AGENT_EMAIL ?? "agent@evergreen.sn"
).toLowerCase();
const agent = await prisma.user.findUnique({ where: { email: seedEmail } });

const now = new Date();
const slaDueAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

const lead = await prisma.lead.create({
  data: {
    name: "Smoke Resend",
    phone: "+221770000001",
    email: inbox,
    intent: "buy",
    message: "Smoke S03 — lead + email",
    consentContact: true,
    source: "FORM",
    sourceDetail: "smoke_script",
    stage: "NEW",
    assigneeId: agent?.id ?? null,
    slaDueAt,
    events: {
      create: {
        type: "CREATED",
        toStage: "NEW",
        body: "Smoke script",
      },
    },
  },
});

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  from,
  to: [inbox],
  subject: `Nouveau lead — ${lead.name}`,
  text: `Lead ${lead.id}\nNom: ${lead.name}\nTél: ${lead.phone}\nIntent: buy\n\nRépondre sous 24 h.`,
  html: `<p><strong>Nouveau lead smoke</strong></p><p>${lead.name} · ${lead.phone}</p><p>ID <code>${lead.id}</code></p>`,
});

await prisma.$disconnect();

if (error) {
  console.error("Lead created but email FAIL", lead.id, error);
  process.exit(1);
}
console.log("OK lead=", lead.id, "email=", data?.id, "→", inbox);
console.log("BO: /espace/agent/leads/" + lead.id);
