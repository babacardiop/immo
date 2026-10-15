"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { AssignmentRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import {
  REQUIREMENT_TEMPLATES,
  serializeRequirementItems,
  type RequirementTemplateId,
} from "@/lib/applications/requirements";

export type AssignmentActionResult =
  | { ok: true; id: string }
  | { ok: false; error: string; code?: string };

const assignSchema = z.object({
  listingId: z.string().min(1),
  userId: z.string().min(1),
  role: z.enum([
    "LANDLORD",
    "CO_LANDLORD",
    "CANDIDATE",
    "TENANT",
    "BUYER",
    "GUARANTOR",
  ]),
  note: z.string().max(2000).optional().or(z.literal("")),
});

export async function assignPropertyRoleAction(
  _prev: AssignmentActionResult | undefined,
  formData: FormData,
): Promise<AssignmentActionResult> {
  try {
    const agent = await requireAgent();
    const parsed = assignSchema.safeParse({
      listingId: String(formData.get("listingId") ?? ""),
      userId: String(formData.get("userId") ?? ""),
      role: String(formData.get("role") ?? "CANDIDATE"),
      note: String(formData.get("note") ?? ""),
    });
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalide",
        code: "VALIDATION",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: parsed.data.userId },
      select: { id: true, role: true },
    });
    if (!user) {
      return { ok: false, error: "Utilisateur introuvable", code: "NOT_FOUND" };
    }

    const listing = await prisma.listing.findUnique({
      where: { id: parsed.data.listingId },
      select: { id: true },
    });
    if (!listing) {
      return { ok: false, error: "Bien introuvable", code: "NOT_FOUND" };
    }

    const role = parsed.data.role as AssignmentRole;

    if (role === "TENANT") {
      const activeTenant = await prisma.propertyAssignment.count({
        where: {
          listingId: listing.id,
          role: "TENANT",
          status: "ACTIVE",
        },
      });
      if (activeTenant > 0) {
        return {
          ok: false,
          error: "Un locataire actif existe déjà",
          code: "TENANT_EXISTS",
        };
      }
    }

    const row = await prisma.propertyAssignment.upsert({
      where: {
        listingId_userId_role: {
          listingId: listing.id,
          userId: user.id,
          role,
        },
      },
      create: {
        listingId: listing.id,
        userId: user.id,
        role,
        status: "ACTIVE",
        note: parsed.data.note || null,
        createdById: agent.id,
      },
      update: {
        status: "ACTIVE",
        note: parsed.data.note || null,
      },
    });

    // Ensure a requirement set exists when assigning candidate
    if (role === "CANDIDATE") {
      const existing = await prisma.applicationRequirementSet.findFirst({
        where: { listingId: listing.id, active: true },
      });
      if (!existing) {
        const tpl = REQUIREMENT_TEMPLATES.standard_sn;
        await prisma.applicationRequirementSet.create({
          data: {
            listingId: listing.id,
            name: tpl.name,
            itemsJson: serializeRequirementItems([...tpl.items]),
            active: true,
          },
        });
      }
    }

    revalidatePath(`/espace/agent/annonces`);
    revalidatePath(`/espace/agent/candidatures`);
    return { ok: true, id: row.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Assignation impossible", code: "ERROR" };
  }
}

export async function setRequirementTemplateAction(
  listingId: string,
  templateId: RequirementTemplateId,
): Promise<AssignmentActionResult> {
  try {
    await requireAgent();
    const tpl = REQUIREMENT_TEMPLATES[templateId];
    if (!tpl) {
      return { ok: false, error: "Template inconnu", code: "VALIDATION" };
    }
    await prisma.applicationRequirementSet.updateMany({
      where: { listingId, active: true },
      data: { active: false },
    });
    const row = await prisma.applicationRequirementSet.create({
      data: {
        listingId,
        name: tpl.name,
        itemsJson: serializeRequirementItems([...tpl.items]),
        active: true,
      },
    });
    revalidatePath(`/espace/agent/annonces`);
    return { ok: true, id: row.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return { ok: false, error: msg, code: "ERROR" };
  }
}
