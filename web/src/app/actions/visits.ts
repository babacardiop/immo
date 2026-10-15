"use server";

import { headers } from "next/headers";
import type { LeadStage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { visitRequestSchema } from "@/lib/leads/visit-schema";
import { resolveLeadAssignee } from "@/lib/leads/assign";
import { computeSlaDueAt } from "@/lib/leads/sla";
import { ackLeadSubmitter, notifyAgentNewLead } from "@/lib/email/ack";

export type VisitActionResult =
  | { ok: true; id?: string; skipped?: boolean; updated?: boolean }
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

const OPEN_STAGES: LeadStage[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "VISIT",
  "NURTURE",
];

/** Public: demande de visite → Lead prospect (no auto account). */
export async function submitVisitRequestAction(
  _prev: VisitActionResult | undefined,
  formData: FormData,
): Promise<VisitActionResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    preferredSlot: String(formData.get("preferredSlot") ?? ""),
    message: String(formData.get("message") ?? ""),
    consentContact:
      formData.get("consentContact") === "on" ||
      formData.get("consentContact") === "true" ||
      formData.get("consentContact") === "1",
    listingId: String(formData.get("listingId") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  if (raw.website.trim()) {
    return { ok: true, skipped: true };
  }

  const parsed = visitRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Formulaire invalide",
      code: "VALIDATION",
    };
  }

  const ip = await clientIp();
  const limited = rateLimit(`visit:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      error: "Trop de demandes — réessayez dans un instant.",
      code: "RATE_LIMIT",
    };
  }

  const data = parsed.data;
  const listing = await prisma.listing.findUnique({
    where: { id: data.listingId },
    select: {
      id: true,
      agentId: true,
      title: true,
      status: true,
      transaction: true,
    },
  });
  if (!listing || listing.status !== "PUBLISHED") {
    return { ok: false, error: "Bien introuvable", code: "NOT_FOUND" };
  }

  let fallbackAgentId: string | null = null;
  if (!listing.agentId) {
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
    listingAgentId: listing.agentId,
    fallbackAgentId,
  });

  const phoneNorm = data.phone.replace(/\s+/g, "");
  const existing = await prisma.lead.findFirst({
    where: {
      listingId: listing.id,
      phone: { contains: phoneNorm.slice(-8) },
      stage: { in: OPEN_STAGES },
    },
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();
  const messageParts = [
    emptyToNull(data.preferredSlot)
      ? `Créneau souhaité : ${data.preferredSlot}`
      : null,
    emptyToNull(data.message),
  ].filter(Boolean);
  const message = messageParts.join("\n") || null;

  if (existing) {
    const lead = await prisma.lead.update({
      where: { id: existing.id },
      data: {
        name: data.name,
        email: emptyToNull(data.email),
        preferredSlot: emptyToNull(data.preferredSlot),
        message,
        leadType: "prospect",
        intent: "rent_visit",
        sourceDetail: "form_visite",
        consentContact: true,
      },
    });
    await prisma.leadEvent.create({
      data: {
        leadId: lead.id,
        type: "NOTE",
        body: "Demande de visite mise à jour (idempotence soft)",
      },
    });
    return { ok: true, id: lead.id, updated: true };
  }

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: emptyToNull(data.email),
      source: "FORM",
      sourceDetail: "form_visite",
      leadType: "prospect",
      intent: "rent_visit",
      preferredSlot: emptyToNull(data.preferredSlot),
      message,
      consentContact: true,
      listingId: listing.id,
      assigneeId,
      slaDueAt: computeSlaDueAt(now),
      events: {
        create: {
          type: "CREATED",
          body: "Demande de visite (prospect)",
        },
      },
    },
  });

  void notifyAgentNewLead({
    leadId: lead.id,
    listingTitle: listing.title,
    name: data.name,
    phone: data.phone,
    intent: "rent_visit",
  }).catch(() => undefined);
  const ackEmail = emptyToNull(data.email);
  if (ackEmail) {
    void ackLeadSubmitter({
      email: ackEmail,
      name: data.name,
    }).catch(() => undefined);
  }

  return { ok: true, id: lead.id };
}
