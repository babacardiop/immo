"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent, requireClient, requireUser, isStaffRole } from "@/lib/session";
import {
  computeCompletenessPct,
  parseRequirementItems,
} from "@/lib/applications/requirements";
import {
  APPLICATION_PRIVACY_NOTICE_VERSION,
} from "@/lib/applications/privacy";
import {
  canReadApplicationDocument,
  canReviewApplications,
  canUploadApplicationDocument,
} from "@/lib/applications/docs-acl";
import { isActiveCandidate } from "@/lib/assignments/rules";
import {
  getVaultObjectBuffer,
  uploadApplicationDocument,
} from "@/lib/storage/r2";

export type AppActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; code?: string };

const OPEN_APP: ApplicationStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "SHORTLISTED",
];

async function getActiveRequirementItems(listingId: string) {
  const set = await prisma.applicationRequirementSet.findFirst({
    where: { listingId, active: true },
    orderBy: { createdAt: "desc" },
  });
  return set ? parseRequirementItems(set.itemsJson) : [];
}

/** Candidate: ensure draft application exists for active candidate assignment. */
export async function ensureDraftApplicationAction(
  listingId: string,
): Promise<AppActionResult> {
  try {
    const user = await requireClient();
    const assignment = await prisma.propertyAssignment.findFirst({
      where: {
        listingId,
        userId: user.id,
        role: "CANDIDATE",
        status: "ACTIVE",
      },
    });
    if (!assignment || !isActiveCandidate(assignment.role, assignment.status)) {
      return {
        ok: false,
        error: "Pas d’assignation candidat active",
        code: "FORBIDDEN",
      };
    }

    const existing = await prisma.rentalApplication.findFirst({
      where: {
        listingId,
        userId: user.id,
        status: { in: OPEN_APP },
      },
    });
    if (existing) return { ok: true, id: existing.id };

    const app = await prisma.rentalApplication.create({
      data: {
        listingId,
        userId: user.id,
        assignmentId: assignment.id,
        status: "DRAFT",
        dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
    return { ok: true, id: app.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return { ok: false, error: msg, code: "ERROR" };
  }
}

export async function uploadApplicationDocAction(
  formData: FormData,
): Promise<AppActionResult> {
  try {
    const user = await requireClient();
    const applicationId = String(formData.get("applicationId") ?? "");
    const requirementCode = String(formData.get("requirementCode") ?? "");
    const file = formData.get("file");
    if (!applicationId || !requirementCode || !(file instanceof File)) {
      return { ok: false, error: "Fichier requis", code: "VALIDATION" };
    }

    const app = await prisma.rentalApplication.findUnique({
      where: { id: applicationId },
      include: { assignment: true },
    });
    if (!app || app.userId !== user.id) {
      return { ok: false, error: "Candidature introuvable", code: "NOT_FOUND" };
    }
    if (!OPEN_APP.includes(app.status)) {
      return { ok: false, error: "Candidature verrouillée", code: "LOCKED" };
    }

    const allowed = canUploadApplicationDocument({
      actor: { id: user.id, role: user.role },
      applicationUserId: app.userId,
      hasActiveCandidateAssignment: isActiveCandidate(
        app.assignment.role,
        app.assignment.status,
      ),
    });
    if (!allowed) {
      return { ok: false, error: "Upload interdit", code: "FORBIDDEN" };
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadApplicationDocument({
      applicationId: app.id,
      requirementCode,
      bytes,
      mimeType: file.type || "application/pdf",
    });

    await prisma.applicationDocument.create({
      data: {
        applicationId: app.id,
        requirementCode,
        storageKey: uploaded.key,
        mimeType: uploaded.mimeType,
        sizeBytes: uploaded.sizeBytes,
        originalName: file.name,
        uploadedById: user.id,
      },
    });

    const items = await getActiveRequirementItems(app.listingId);
    const docs = await prisma.applicationDocument.findMany({
      where: { applicationId: app.id },
      select: { requirementCode: true },
    });
    const pct = computeCompletenessPct(
      items,
      docs.map((d) => d.requirementCode),
    );
    await prisma.rentalApplication.update({
      where: { id: app.id },
      data: { completenessPct: pct },
    });

    revalidatePath("/espace/client/candidatures");
    return { ok: true, id: app.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "MIME_NOT_ALLOWED") {
      return { ok: false, error: "PDF ou image JPG/PNG uniquement", code: msg };
    }
    if (msg === "FILE_TOO_LARGE") {
      return { ok: false, error: "Fichier trop volumineux (max 8 Mo)", code: msg };
    }
    return { ok: false, error: msg, code: "ERROR" };
  }
}

export async function submitApplicationAction(
  formData: FormData,
): Promise<AppActionResult> {
  try {
    const user = await requireClient();
    const applicationId = String(formData.get("applicationId") ?? "");
    const privacyAccepted =
      formData.get("privacyAccepted") === "on" ||
      formData.get("privacyAccepted") === "true" ||
      formData.get("privacyAccepted") === "1";

    if (!privacyAccepted) {
      return {
        ok: false,
        error: "Vous devez accepter la notice de confidentialité",
        code: "PRIVACY",
      };
    }

    const app = await prisma.rentalApplication.findUnique({
      where: { id: applicationId },
      include: { documents: true, assignment: true },
    });
    if (!app || app.userId !== user.id) {
      return { ok: false, error: "Candidature introuvable", code: "NOT_FOUND" };
    }
    if (!isActiveCandidate(app.assignment.role, app.assignment.status)) {
      return { ok: false, error: "Assignation inactive", code: "FORBIDDEN" };
    }

    const items = await getActiveRequirementItems(app.listingId);
    const pct = computeCompletenessPct(
      items,
      app.documents.map((d) => d.requirementCode),
    );
    if (pct < 100) {
      return {
        ok: false,
        error: "Dossier incomplet — pièces requises manquantes",
        code: "INCOMPLETE",
      };
    }

    await prisma.rentalApplication.update({
      where: { id: app.id },
      data: {
        status: "SUBMITTED",
        completenessPct: pct,
        privacyNoticeVersion: APPLICATION_PRIVACY_NOTICE_VERSION,
        privacyAcceptedAt: new Date(),
      },
    });

    revalidatePath("/espace/client/candidatures");
    revalidatePath("/espace/agent/candidatures");
    return { ok: true, id: app.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return { ok: false, error: msg, code: "ERROR" };
  }
}

const reviewSchema = z.object({
  applicationId: z.string().min(1),
  action: z.enum([
    "under_review",
    "shortlist",
    "request_more_docs",
    "reject",
    "accept",
  ]),
  agentSummary: z.string().max(4000).optional().or(z.literal("")),
  rejectReason: z.string().max(500).optional().or(z.literal("")),
});

export async function reviewApplicationAction(
  formData: FormData,
): Promise<AppActionResult> {
  try {
    const agent = await requireAgent();
    if (!canReviewApplications(agent.role)) {
      return { ok: false, error: "FORBIDDEN", code: "FORBIDDEN" };
    }

    const parsed = reviewSchema.safeParse({
      applicationId: String(formData.get("applicationId") ?? ""),
      action: String(formData.get("action") ?? ""),
      agentSummary: String(formData.get("agentSummary") ?? ""),
      rejectReason: String(formData.get("rejectReason") ?? ""),
    });
    if (!parsed.success) {
      return { ok: false, error: "Action invalide", code: "VALIDATION" };
    }

    const app = await prisma.rentalApplication.findUnique({
      where: { id: parsed.data.applicationId },
      include: { assignment: true, listing: true },
    });
    if (!app) {
      return { ok: false, error: "Introuvable", code: "NOT_FOUND" };
    }

    if (parsed.data.action === "accept") {
      return acceptApplication(app.id, agent.id, parsed.data.agentSummary || null);
    }

    const statusMap: Record<
      "under_review" | "shortlist" | "request_more_docs" | "reject",
      ApplicationStatus
    > = {
      under_review: "UNDER_REVIEW",
      shortlist: "SHORTLISTED",
      request_more_docs: "DRAFT",
      reject: "REJECTED",
    };

    const actionKey = parsed.data.action as keyof typeof statusMap;
    const status = statusMap[actionKey];
    await prisma.rentalApplication.update({
      where: { id: app.id },
      data: {
        status,
        agentSummary: parsed.data.agentSummary || app.agentSummary,
        rejectReason:
          parsed.data.action === "reject"
            ? parsed.data.rejectReason || "Non retenu"
            : undefined,
        reviewedAt: new Date(),
        decidedAt:
          parsed.data.action === "reject" ? new Date() : app.decidedAt,
      },
    });

    revalidatePath("/espace/agent/candidatures");
    revalidatePath(`/espace/agent/candidatures/${app.id}`);
    return { ok: true, id: app.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return { ok: false, error: msg, code: "ERROR" };
  }
}

async function acceptApplication(
  applicationId: string,
  _agentId: string,
  agentSummary: string | null,
): Promise<AppActionResult> {
  const result = await prisma.$transaction(async (tx) => {
    const app = await tx.rentalApplication.findUnique({
      where: { id: applicationId },
      include: { assignment: true, listing: true },
    });
    if (!app) throw new Error("NOT_FOUND");

    const activeTenants = await tx.propertyAssignment.count({
      where: {
        listingId: app.listingId,
        role: "TENANT",
        status: "ACTIVE",
      },
    });
    if (activeTenants > 0) throw new Error("TENANT_EXISTS");

    await tx.rentalApplication.update({
      where: { id: app.id },
      data: {
        status: "ACCEPTED",
        agentSummary: agentSummary ?? app.agentSummary,
        decidedAt: new Date(),
        reviewedAt: new Date(),
      },
    });

    // Reject other open applications on same listing
    await tx.rentalApplication.updateMany({
      where: {
        listingId: app.listingId,
        id: { not: app.id },
        status: { in: OPEN_APP },
      },
      data: {
        status: "REJECTED" as ApplicationStatus,
        rejectReason: "Autre dossier sélectionné",
        decidedAt: new Date(),
      },
    });

    await tx.propertyAssignment.update({
      where: { id: app.assignmentId },
      data: { role: "TENANT", status: "ACTIVE" },
    });

    // End other candidate assignments soft
    await tx.propertyAssignment.updateMany({
      where: {
        listingId: app.listingId,
        role: "CANDIDATE",
        status: "ACTIVE",
        id: { not: app.assignmentId },
      },
      data: { status: "ENDED" },
    });

    const lease = await tx.lease.create({
      data: {
        listingId: app.listingId,
        tenantUserId: app.userId,
        applicationId: app.id,
        status: "ACTIVE",
        startDate: new Date(),
        rentFcfa: app.listing.priceFcfa,
      },
    });

    await tx.listing.update({
      where: { id: app.listingId },
      data: { status: "RENTED" },
    });

    return { appId: app.id, leaseId: lease.id };
  });

  revalidatePath("/espace/agent/candidatures");
  revalidatePath("/espace/client");
  revalidatePath("/espace/client/candidatures");
  revalidatePath("/espace/proprio/candidatures");
  return { ok: true, id: result.appId };
}

/** Stream vault doc — staff or owning candidate only. Landlord always 403. */
export async function getApplicationDocForViewer(input: {
  documentId: string;
}): Promise<
  | { ok: true; bytes: Buffer; contentType: string; filename: string }
  | { ok: false; code: string }
> {
  try {
    const actor = await requireUser();
    const doc = await prisma.applicationDocument.findUnique({
      where: { id: input.documentId },
      include: {
        application: {
          include: {
            listing: {
              include: {
                propertyAssignments: {
                  where: {
                    userId: actor.id,
                    role: { in: ["LANDLORD", "CO_LANDLORD"] },
                    status: "ACTIVE",
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!doc) return { ok: false, code: "NOT_FOUND" };

    const isLandlordOnListing =
      doc.application.listing.propertyAssignments.length > 0 ||
      actor.role === "LANDLORD";

    const allowed = canReadApplicationDocument({
      actor: { id: actor.id, role: actor.role },
      documentOwnerUserId: doc.application.userId,
      isLandlordOnListing,
    });
    if (!allowed) return { ok: false, code: "FORBIDDEN" };

    // Double-check: never staff-bypass for landlord role on files
    if (actor.role === "LANDLORD") return { ok: false, code: "FORBIDDEN" };
    if (!isStaffRole(actor.role) && actor.id !== doc.application.userId) {
      return { ok: false, code: "FORBIDDEN" };
    }

    const { bytes, contentType } = await getVaultObjectBuffer(doc.storageKey);
    return {
      ok: true,
      bytes,
      contentType,
      filename: doc.originalName ?? `${doc.requirementCode}.pdf`,
    };
  } catch {
    return { ok: false, code: "ERROR" };
  }
}
