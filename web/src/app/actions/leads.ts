"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { LeadStage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";
import {
  leadNoteSchema,
  leadStageSchema,
  publicLeadFormSchema,
} from "@/lib/leads/schema";
import { canMutateLeadStage } from "@/lib/leads/acl";
import { resolveLeadAssignee } from "@/lib/leads/assign";
import { computeSlaDueAt } from "@/lib/leads/sla";
import { ackLeadSubmitter, notifyAgentNewLead } from "@/lib/email/ack";

export type LeadActionResult =
  | { ok: true; id?: string; skipped?: boolean }
  | { ok: false; error: string; code?: string };

function emptyToNull(v: string | undefined | null): string | null {
  const t = v?.trim() ?? "";
  return t ? t : null;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/** Public form → Lead (honeypot · rate limit · consent · assign · email). */
export async function submitLeadAction(
  _prev: LeadActionResult | undefined,
  formData: FormData,
): Promise<LeadActionResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    intent: String(formData.get("intent") ?? "other"),
    message: String(formData.get("message") ?? ""),
    consentContact:
      formData.get("consentContact") === "on" ||
      formData.get("consentContact") === "true" ||
      formData.get("consentContact") === "1",
    listingId: String(formData.get("listingId") ?? ""),
    sourceDetail: String(formData.get("sourceDetail") ?? "form_contact"),
    website: String(formData.get("website") ?? ""),
    utmSource: String(formData.get("utmSource") ?? ""),
    utmMedium: String(formData.get("utmMedium") ?? ""),
    utmCampaign: String(formData.get("utmCampaign") ?? ""),
  };

  // Honeypot: pretend success, do not create.
  if (raw.website.trim()) {
    return { ok: true, skipped: true };
  }

  const parsed = publicLeadFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Formulaire invalide",
      code: "VALIDATION",
    };
  }

  const ip = await clientIp();
  const limited = rateLimit(`lead:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      error: "Trop de demandes — réessayez dans un instant.",
      code: "RATE_LIMIT",
    };
  }

  const data = parsed.data;
  const listingId = emptyToNull(data.listingId);

  let listingAgentId: string | null = null;
  let listingTitle: string | null = null;
  let resolvedListingId: string | null = null;
  if (listingId) {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, agentId: true, title: true, status: true },
    });
    if (listing?.status === "PUBLISHED") {
      resolvedListingId = listing.id;
      listingAgentId = listing.agentId;
      listingTitle = listing.title;
    }
  }

  let fallbackAgentId: string | null = null;
  if (!listingAgentId) {
    const seedEmail = (
      process.env.SEED_AGENT_EMAIL ?? "agent@evergreen.sn"
    ).toLowerCase();
    const fallback = await prisma.user.findUnique({
      where: { email: seedEmail },
      select: { id: true },
    });
    fallbackAgentId = fallback?.id ?? null;
  }

  const assigneeId = resolveLeadAssignee({
    listingAgentId,
    fallbackAgentId,
  });

  const now = new Date();
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone.replace(/\s+/g, " ").trim(),
      email: emptyToNull(data.email),
      intent: data.intent,
      message: emptyToNull(data.message),
      consentContact: true,
      source: "FORM",
      sourceDetail: emptyToNull(data.sourceDetail) ?? "form_contact",
      listingId: resolvedListingId,
      assigneeId,
      stage: "NEW",
      slaDueAt: computeSlaDueAt(now),
      utmSource: emptyToNull(data.utmSource),
      utmMedium: emptyToNull(data.utmMedium),
      utmCampaign: emptyToNull(data.utmCampaign),
      events: {
        create: {
          type: "CREATED",
          toStage: "NEW",
          body: "Lead créé depuis formulaire public",
        },
      },
    },
  });

  await notifyAgentNewLead({
    leadId: lead.id,
    name: data.name,
    phone: data.phone,
    intent: data.intent,
    listingTitle,
  });

  const email = emptyToNull(data.email);
  if (email) {
    await ackLeadSubmitter({ email, name: data.name });
  }

  return { ok: true, id: lead.id };
}

export async function updateLeadStageAction(
  leadId: string,
  formData: FormData,
): Promise<LeadActionResult> {
  const user = await requireAgent();
  const parsed = leadStageSchema.safeParse({
    stage: String(formData.get("stage") ?? ""),
  });
  if (!parsed.success) {
    return { ok: false, error: "Stage invalide", code: "VALIDATION" };
  }

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false, error: "Lead introuvable", code: "NOT_FOUND" };

  if (
    !canMutateLeadStage({
      assigneeId: lead.assigneeId,
      actorId: user.id,
      actorRole: user.role,
    })
  ) {
    return { ok: false, error: "Accès refusé", code: "FORBIDDEN" };
  }

  const next = parsed.data.stage as LeadStage;
  if (next === lead.stage) return { ok: true, id: lead.id };

  const firstTouchAt =
    lead.firstTouchAt ??
    (lead.stage === "NEW" ? new Date() : lead.firstTouchAt);

  await prisma.$transaction([
    prisma.lead.update({
      where: { id: leadId },
      data: { stage: next, firstTouchAt },
    }),
    prisma.leadEvent.create({
      data: {
        leadId,
        type: "STAGE_CHANGE",
        fromStage: lead.stage,
        toStage: next,
        actorId: user.id,
      },
    }),
  ]);

  revalidatePath("/espace/agent/leads");
  revalidatePath(`/espace/agent/leads/${leadId}`);
  return { ok: true, id: leadId };
}

export async function addLeadNoteAction(
  leadId: string,
  formData: FormData,
): Promise<LeadActionResult> {
  const user = await requireAgent();
  const parsed = leadNoteSchema.safeParse({
    body: String(formData.get("body") ?? ""),
  });
  if (!parsed.success) {
    return { ok: false, error: "Note vide", code: "VALIDATION" };
  }

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false, error: "Lead introuvable", code: "NOT_FOUND" };

  if (
    !canMutateLeadStage({
      assigneeId: lead.assigneeId,
      actorId: user.id,
      actorRole: user.role,
    })
  ) {
    return { ok: false, error: "Accès refusé", code: "FORBIDDEN" };
  }

  const firstTouchAt = lead.firstTouchAt ?? new Date();

  await prisma.$transaction([
    prisma.lead.update({
      where: { id: leadId },
      data: { firstTouchAt },
    }),
    prisma.leadEvent.create({
      data: {
        leadId,
        type: "NOTE",
        body: parsed.data.body,
        actorId: user.id,
      },
    }),
  ]);

  revalidatePath("/espace/agent/leads");
  revalidatePath(`/espace/agent/leads/${leadId}`);
  return { ok: true, id: leadId };
}
