"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type {
  LeadSource,
  LeadStage,
  VisitOutcome,
  VisitSource,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { canAccessLead } from "@/lib/leads/acl";
import { isModeratorOrAbove } from "@/lib/roles";
import { motifRecommended } from "@/lib/leads/visit-outcome";
import { computeSlaDueAt } from "@/lib/leads/sla";

export type VisitReportResult =
  | { ok: true; id: string; leadId?: string }
  | { ok: false; error: string; code?: string };

const OUTCOMES = [
  "NOT_INTERESTED",
  "CONTINUE",
  "VISIT_OTHER_RENTALS",
  "NEEDS_TIME",
  "NO_SHOW",
  "OTHER",
] as const;

function stageForOutcome(outcome: VisitOutcome): LeadStage {
  switch (outcome) {
    case "CONTINUE":
      return "QUALIFIED";
    case "VISIT_OTHER_RENTALS":
    case "NEEDS_TIME":
      return "NURTURE";
    case "NOT_INTERESTED":
    case "NO_SHOW":
      return "LOST";
    default:
      return "VISIT";
  }
}

function revalidateVisits(leadId?: string | null) {
  revalidatePath("/espace/agent");
  revalidatePath("/espace/agent/visites");
  revalidatePath("/espace/agent/leads");
  if (leadId) revalidatePath(`/espace/agent/leads/${leadId}`);
}

function normalizePhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, "").trim();
}

function leadSourceFromVisit(source: VisitSource): LeadSource {
  switch (source) {
    case "WHATSAPP":
      return "WHATSAPP";
    case "PHONE":
      return "PHONE";
    case "WALK_IN":
      return "WALK_IN";
    default:
      return "OTHER";
  }
}

async function resolveListingId(
  raw: string | undefined,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const listingId = (raw ?? "").trim();
  if (!listingId) {
    return { ok: false, error: "Sélectionnez le bien visité" };
  }
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, title: true, status: true },
  });
  if (!listing || listing.status === "ARCHIVED") {
    return { ok: false, error: "Bien introuvable" };
  }
  return { ok: true, id: listing.id };
}

type AgentCtx = Awaited<ReturnType<typeof requireAgent>>;

/** Trouve un prospect par téléphone ou en crée un (identité toujours en base). */
async function findOrCreateProspect(opts: {
  agent: AgentCtx;
  leadId?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  listingId: string | null;
  source: VisitSource;
  createBody: string;
}): Promise<{ leadId: string; created: boolean } | { error: string; code: string }> {
  if (opts.leadId) {
    const lead = await prisma.lead.findUnique({
      where: { id: opts.leadId },
      select: { id: true, assigneeId: true, name: true, phone: true },
    });
    if (!lead) return { error: "Lead introuvable", code: "NOT_FOUND" };
    if (
      !canAccessLead({
        assigneeId: lead.assigneeId,
        actorId: opts.agent.id,
        actorRole: opts.agent.role,
      })
    ) {
      return { error: "FORBIDDEN", code: "FORBIDDEN" };
    }
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        name: lead.name || opts.name,
        phone: lead.phone || opts.phone,
        leadType: "prospect",
      },
    });
    return { leadId: lead.id, created: false };
  }

  const phone = normalizePhone(opts.phone);
  const existing = await prisma.lead.findFirst({
    where: {
      OR: [{ phone }, { phone: opts.phone.trim() }],
    },
    orderBy: { updatedAt: "desc" },
    select: { id: true, assigneeId: true, name: true, listingId: true },
  });

  if (existing) {
    if (
      existing.assigneeId &&
      !canAccessLead({
        assigneeId: existing.assigneeId,
        actorId: opts.agent.id,
        actorRole: opts.agent.role,
      })
    ) {
      return { error: "FORBIDDEN", code: "FORBIDDEN" };
    }
    await prisma.lead.update({
      where: { id: existing.id },
      data: {
        name: existing.name || opts.name,
        phone,
        email: opts.email || undefined,
        leadType: "prospect",
        assigneeId: existing.assigneeId ?? opts.agent.id,
        listingId: existing.listingId ?? opts.listingId,
        stage: "VISIT",
      },
    });
    await prisma.leadEvent.create({
      data: {
        leadId: existing.id,
        type: "NOTE",
        actorId: opts.agent.id,
        body: opts.createBody,
      },
    });
    return { leadId: existing.id, created: false };
  }

  const now = new Date();
  const lead = await prisma.lead.create({
    data: {
      name: opts.name,
      phone,
      email: opts.email || null,
      source: leadSourceFromVisit(opts.source),
      sourceDetail: `visit_${opts.source.toLowerCase()}`,
      leadType: "prospect",
      intent: "rent_visit",
      stage: "VISIT",
      listingId: opts.listingId,
      assigneeId: opts.agent.id,
      slaDueAt: computeSlaDueAt(now),
      events: {
        create: {
          type: "CREATED",
          body: opts.createBody,
          actorId: opts.agent.id,
        },
      },
    },
  });
  return { leadId: lead.id, created: true };
}

const scheduleSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  listingId: z.string().trim().min(1, "Bien requis"),
  leadId: z.string().trim().max(40).optional().or(z.literal("")),
  scheduledAt: z.string().min(1),
  source: z.enum(["OFFLINE", "PHONE", "WALK_IN", "WHATSAPP", "ONLINE_REQUEST"]),
  agentNotes: z.string().trim().max(4000).optional().or(z.literal("")),
});

/** Créer une visite prévue / reçue offline (prospect + bien obligatoires). */
export async function scheduleVisitAction(
  _prev: VisitReportResult | undefined,
  formData: FormData,
): Promise<VisitReportResult> {
  try {
    const agent = await requireAgent();
    const parsed = scheduleSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      listingId: String(formData.get("listingId") ?? ""),
      leadId: String(formData.get("leadId") ?? ""),
      scheduledAt: String(formData.get("scheduledAt") ?? ""),
      source: String(formData.get("source") ?? "OFFLINE"),
      agentNotes: String(formData.get("agentNotes") ?? ""),
    });
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Formulaire invalide",
        code: "VALIDATION",
      };
    }

    const scheduledAt = new Date(parsed.data.scheduledAt);
    if (Number.isNaN(scheduledAt.getTime())) {
      return { ok: false, error: "Créneau invalide", code: "VALIDATION" };
    }

    const listing = await resolveListingId(parsed.data.listingId);
    if (!listing.ok) {
      return { ok: false, error: listing.error, code: "VALIDATION" };
    }

    const prospect = await findOrCreateProspect({
      agent,
      leadId: parsed.data.leadId || null,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      listingId: listing.id,
      source: parsed.data.source as VisitSource,
      createBody: `Visite ${parsed.data.source} planifiée`,
    });
    if ("error" in prospect) {
      return { ok: false, error: prospect.error, code: prospect.code };
    }

    const listingRow = await prisma.listing.findUnique({
      where: { id: listing.id },
      select: { title: true },
    });

    const visit = await prisma.visitReport.create({
      data: {
        leadId: prospect.leadId,
        listingId: listing.id,
        status: "SCHEDULED",
        source: parsed.data.source as VisitSource,
        conductedById: agent.id,
        scheduledAt,
        agentNotes: parsed.data.agentNotes || null,
      },
    });

    await prisma.leadEvent.create({
      data: {
        leadId: prospect.leadId,
        type: "NOTE",
        actorId: agent.id,
        body: `Visite planifiée le ${scheduledAt.toISOString().slice(0, 16)} · bien « ${listingRow?.title ?? listing.id} » (${parsed.data.source})`,
      },
    });

    revalidateVisits(prospect.leadId);
    return { ok: true, id: visit.id, leadId: prospect.leadId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Création visite impossible", code: "ERROR" };
  }
}

const closeSchema = z.object({
  visitId: z.string().min(1),
  conductedAt: z.string().optional().or(z.literal("")),
  listingId: z.string().trim().optional().or(z.literal("")),
  outcome: z.enum(OUTCOMES),
  outcomeMotif: z.string().trim().max(2000).optional().or(z.literal("")),
  agentNotes: z.string().trim().max(4000).optional().or(z.literal("")),
});

/** Clôturer une visite planifiée avec outcome (+ bien si précisé / corrigé). */
export async function closeVisitAction(
  _prev: VisitReportResult | undefined,
  formData: FormData,
): Promise<VisitReportResult> {
  try {
    const agent = await requireAgent();
    const parsed = closeSchema.safeParse({
      visitId: String(formData.get("visitId") ?? ""),
      conductedAt: String(formData.get("conductedAt") ?? ""),
      listingId: String(formData.get("listingId") ?? ""),
      outcome: String(formData.get("outcome") ?? ""),
      outcomeMotif: String(formData.get("outcomeMotif") ?? ""),
      agentNotes: String(formData.get("agentNotes") ?? ""),
    });
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Formulaire invalide",
        code: "VALIDATION",
      };
    }

    const conductedAt = parsed.data.conductedAt
      ? new Date(parsed.data.conductedAt)
      : new Date();
    if (Number.isNaN(conductedAt.getTime())) {
      return { ok: false, error: "Date invalide", code: "VALIDATION" };
    }

    const outcome = parsed.data.outcome as VisitOutcome;
    if (
      motifRecommended(outcome) &&
      !(parsed.data.outcomeMotif && parsed.data.outcomeMotif.trim())
    ) {
      return {
        ok: false,
        error: "Indiquez un motif (pas intéressé / autre)",
        code: "MOTIF_REQUIRED",
      };
    }

    const visit = await prisma.visitReport.findUnique({
      where: { id: parsed.data.visitId },
      include: {
        lead: { select: { id: true, assigneeId: true, stage: true } },
        listing: { select: { title: true } },
      },
    });
    if (!visit) {
      return { ok: false, error: "Visite introuvable", code: "NOT_FOUND" };
    }
    if (visit.status === "COMPLETED") {
      return { ok: false, error: "Visite déjà clôturée", code: "LOCKED" };
    }
    if (
      visit.conductedById !== agent.id &&
      !isModeratorOrAbove(agent.role) &&
      !canAccessLead({
        assigneeId: visit.lead.assigneeId,
        actorId: agent.id,
        actorRole: agent.role,
      })
    ) {
      return { ok: false, error: "FORBIDDEN", code: "FORBIDDEN" };
    }

    let listingId = visit.listingId;
    let listingTitle = visit.listing?.title;
    if (parsed.data.listingId) {
      const listing = await resolveListingId(parsed.data.listingId);
      if (!listing.ok) {
        return { ok: false, error: listing.error, code: "VALIDATION" };
      }
      listingId = listing.id;
      const row = await prisma.listing.findUnique({
        where: { id: listing.id },
        select: { title: true },
      });
      listingTitle = row?.title;
    }
    if (!listingId) {
      return {
        ok: false,
        error: "Indiquez le bien effectivement visité",
        code: "LISTING_REQUIRED",
      };
    }

    const nextStage = stageForOutcome(outcome);
    await prisma.$transaction(async (tx) => {
      await tx.visitReport.update({
        where: { id: visit.id },
        data: {
          status: "COMPLETED",
          listingId,
          conductedAt,
          conductedById: agent.id,
          outcome,
          outcomeMotif: parsed.data.outcomeMotif || null,
          agentNotes: parsed.data.agentNotes || visit.agentNotes,
          wantsOtherListings: outcome === "VISIT_OTHER_RENTALS",
        },
      });
      await tx.lead.update({
        where: { id: visit.leadId },
        data: {
          stage: nextStage,
          firstTouchAt: visit.lead.stage === "NEW" ? new Date() : undefined,
        },
      });
      await tx.leadEvent.create({
        data: {
          leadId: visit.leadId,
          type: "STAGE_CHANGE",
          fromStage: visit.lead.stage,
          toStage: nextStage,
          actorId: agent.id,
          body: `Visite clôturée · bien « ${listingTitle ?? listingId} » — ${outcome}${
            parsed.data.outcomeMotif
              ? ` · motif: ${parsed.data.outcomeMotif}`
              : ""
          }`,
        },
      });
    });

    revalidateVisits(visit.leadId);
    return { ok: true, id: visit.id, leadId: visit.leadId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Clôture impossible", code: "ERROR" };
  }
}

const fieldVisitSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  listingId: z.string().trim().min(1),
  leadId: z.string().trim().max(40).optional().or(z.literal("")),
  conductedAt: z.string().min(1),
  source: z.enum(["OFFLINE", "PHONE", "WALK_IN", "WHATSAPP", "ONLINE_REQUEST"]),
  outcome: z.enum(OUTCOMES),
  outcomeMotif: z.string().trim().max(2000).optional().or(z.literal("")),
  agentNotes: z.string().trim().max(4000).optional().or(z.literal("")),
});

/**
 * Consigner une visite terrain (souvent un autre bien vu « dans le feu de l’action »).
 * Prospect (nom + tél) + bien = obligatoires. Réutilise le lead si même téléphone.
 */
export async function logFieldVisitAction(
  _prev: VisitReportResult | undefined,
  formData: FormData,
): Promise<VisitReportResult> {
  try {
    const agent = await requireAgent();
    const parsed = fieldVisitSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      listingId: String(formData.get("listingId") ?? ""),
      leadId: String(formData.get("leadId") ?? ""),
      conductedAt: String(formData.get("conductedAt") ?? ""),
      source: String(formData.get("source") ?? "OFFLINE"),
      outcome: String(formData.get("outcome") ?? ""),
      outcomeMotif: String(formData.get("outcomeMotif") ?? ""),
      agentNotes: String(formData.get("agentNotes") ?? ""),
    });
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Formulaire invalide",
        code: "VALIDATION",
      };
    }

    const outcome = parsed.data.outcome as VisitOutcome;
    if (
      motifRecommended(outcome) &&
      !(parsed.data.outcomeMotif && parsed.data.outcomeMotif.trim())
    ) {
      return {
        ok: false,
        error: "Indiquez un motif (pas intéressé / autre)",
        code: "MOTIF_REQUIRED",
      };
    }

    const conductedAt = new Date(parsed.data.conductedAt);
    if (Number.isNaN(conductedAt.getTime())) {
      return { ok: false, error: "Date invalide", code: "VALIDATION" };
    }

    const listing = await resolveListingId(parsed.data.listingId);
    if (!listing.ok) {
      return { ok: false, error: listing.error, code: "VALIDATION" };
    }

    const listingRow = await prisma.listing.findUnique({
      where: { id: listing.id },
      select: { title: true },
    });

    const prospect = await findOrCreateProspect({
      agent,
      leadId: parsed.data.leadId || null,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      listingId: listing.id,
      source: parsed.data.source as VisitSource,
      createBody: `Prospect terrain · visite « ${listingRow?.title ?? listing.id} »`,
    });
    if ("error" in prospect) {
      return { ok: false, error: prospect.error, code: prospect.code };
    }

    const lead = await prisma.lead.findUnique({
      where: { id: prospect.leadId },
      select: { id: true, stage: true },
    });
    if (!lead) {
      return { ok: false, error: "Lead introuvable", code: "NOT_FOUND" };
    }

    const nextStage = stageForOutcome(outcome);
    const report = await prisma.$transaction(async (tx) => {
      const row = await tx.visitReport.create({
        data: {
          leadId: lead.id,
          listingId: listing.id,
          status: "COMPLETED",
          source: parsed.data.source as VisitSource,
          conductedById: agent.id,
          scheduledAt: conductedAt,
          conductedAt,
          outcome,
          outcomeMotif: parsed.data.outcomeMotif || null,
          agentNotes: parsed.data.agentNotes || null,
          wantsOtherListings: outcome === "VISIT_OTHER_RENTALS",
        },
      });
      await tx.lead.update({
        where: { id: lead.id },
        data: {
          stage: nextStage,
          firstTouchAt: lead.stage === "NEW" ? new Date() : undefined,
        },
      });
      await tx.leadEvent.create({
        data: {
          leadId: lead.id,
          type: "STAGE_CHANGE",
          fromStage: lead.stage,
          toStage: nextStage,
          actorId: agent.id,
          body: `Visite terrain · bien « ${listingRow?.title ?? listing.id} » — ${outcome}${
            parsed.data.outcomeMotif
              ? ` · motif: ${parsed.data.outcomeMotif}`
              : ""
          }`,
        },
      });
      return row;
    });

    revalidateVisits(lead.id);
    return { ok: true, id: report.id, leadId: lead.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Enregistrement impossible", code: "ERROR" };
  }
}

/** Raccourci lead detail : log immédiat d’une visite déjà faite (COMPLETED) sur un bien. */
export async function logVisitReportAction(
  _prev: VisitReportResult | undefined,
  formData: FormData,
): Promise<VisitReportResult> {
  try {
    const agent = await requireAgent();
    const leadId = String(formData.get("leadId") ?? "");
    const listingIdRaw = String(formData.get("listingId") ?? "");
    const conductedAtRaw = String(formData.get("conductedAt") ?? "");
    const outcome = String(formData.get("outcome") ?? "") as VisitOutcome;
    const outcomeMotif = String(formData.get("outcomeMotif") ?? "");
    const agentNotes = String(formData.get("agentNotes") ?? "");
    const source = (String(formData.get("source") ?? "OFFLINE") ||
      "OFFLINE") as VisitSource;

    if (!leadId || !conductedAtRaw || !outcome) {
      return { ok: false, error: "Champs requis manquants", code: "VALIDATION" };
    }
    if (motifRecommended(outcome) && !outcomeMotif.trim()) {
      return {
        ok: false,
        error: "Indiquez un motif (pas intéressé / autre)",
        code: "MOTIF_REQUIRED",
      };
    }

    const conductedAt = new Date(conductedAtRaw);
    if (Number.isNaN(conductedAt.getTime())) {
      return { ok: false, error: "Date invalide", code: "VALIDATION" };
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        assigneeId: true,
        listingId: true,
        stage: true,
        name: true,
        phone: true,
      },
    });
    if (!lead) {
      return { ok: false, error: "Lead introuvable", code: "NOT_FOUND" };
    }
    if (
      !canAccessLead({
        assigneeId: lead.assigneeId,
        actorId: agent.id,
        actorRole: agent.role,
      })
    ) {
      return { ok: false, error: "FORBIDDEN", code: "FORBIDDEN" };
    }
    if (!lead.name || !lead.phone) {
      return {
        ok: false,
        error: "Complétez nom et téléphone du prospect avant de logger",
        code: "IDENTITY_REQUIRED",
      };
    }

    const listing = await resolveListingId(listingIdRaw || lead.listingId || "");
    if (!listing.ok) {
      return { ok: false, error: listing.error, code: "VALIDATION" };
    }
    const listingRow = await prisma.listing.findUnique({
      where: { id: listing.id },
      select: { title: true },
    });

    const nextStage = stageForOutcome(outcome);
    const report = await prisma.$transaction(async (tx) => {
      const row = await tx.visitReport.create({
        data: {
          leadId: lead.id,
          listingId: listing.id,
          status: "COMPLETED",
          source,
          conductedById: agent.id,
          scheduledAt: conductedAt,
          conductedAt,
          outcome,
          outcomeMotif: outcomeMotif || null,
          agentNotes: agentNotes || null,
          wantsOtherListings: outcome === "VISIT_OTHER_RENTALS",
        },
      });
      await tx.lead.update({
        where: { id: lead.id },
        data: {
          stage: nextStage,
          listingId: lead.listingId ?? listing.id,
          firstTouchAt: lead.stage === "NEW" ? new Date() : undefined,
        },
      });
      await tx.leadEvent.create({
        data: {
          leadId: lead.id,
          type: "STAGE_CHANGE",
          fromStage: lead.stage,
          toStage: nextStage,
          actorId: agent.id,
          body: `Visite · bien « ${listingRow?.title ?? listing.id} » — ${outcome}`,
        },
      });
      return row;
    });

    revalidateVisits(lead.id);
    return { ok: true, id: report.id, leadId: lead.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Enregistrement impossible", code: "ERROR" };
  }
}
