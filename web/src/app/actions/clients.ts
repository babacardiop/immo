"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";

export type ClientActionResult =
  | { ok: true; userId: string }
  | { ok: false; error: string; code?: string };

const createClientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  password: z.string().min(8).max(72).optional().or(z.literal("")),
  leadId: z.string().trim().max(40).optional().or(z.literal("")),
});

function tempPassword(): string {
  return `Eg-${Math.random().toString(36).slice(2, 10)}A1`;
}

/** BO: create CLIENT from scratch or from a prospect lead. */
export async function createClientAction(
  _prev: ClientActionResult | undefined,
  formData: FormData,
): Promise<ClientActionResult> {
  try {
    const agent = await requireAgent();
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      password: String(formData.get("password") ?? ""),
      leadId: String(formData.get("leadId") ?? ""),
    };
    const parsed = createClientSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Données invalides",
        code: "VALIDATION",
      };
    }

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { ok: false, error: "Email déjà utilisé", code: "DUPLICATE" };
    }

    let leadId: string | null = parsed.data.leadId || null;
    if (leadId) {
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: { convertedUser: true },
      });
      if (!lead) {
        return { ok: false, error: "Prospect introuvable", code: "NOT_FOUND" };
      }
      if (lead.convertedUser) {
        return {
          ok: false,
          error: "Ce prospect a déjà un compte",
          code: "ALREADY_CONVERTED",
        };
      }
      if (
        lead.assigneeId &&
        lead.assigneeId !== agent.id &&
        !isModeratorOrAbove(agent.role)
      ) {
        return { ok: false, error: "Lead non assigné à vous", code: "FORBIDDEN" };
      }
    }

    const password = parsed.data.password || tempPassword();
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          name: parsed.data.name,
          email,
          phone: parsed.data.phone || null,
          passwordHash,
          role: "CLIENT",
          convertedFromLeadId: leadId,
        },
      });
      if (leadId) {
        await tx.lead.update({
          where: { id: leadId },
          data: { stage: "QUALIFIED" },
        });
        await tx.leadEvent.create({
          data: {
            leadId,
            type: "SYSTEM",
            body: `Compte client créé (${u.id})`,
            actorId: agent.id,
            toStage: "QUALIFIED",
          },
        });
      }
      return u;
    });

    revalidatePath("/espace/agent/leads");
    if (leadId) revalidatePath(`/espace/agent/leads/${leadId}`);
    return { ok: true, userId: user.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur";
    if (msg === "UNAUTHORIZED" || msg === "FORBIDDEN") {
      return { ok: false, error: msg, code: msg };
    }
    return { ok: false, error: "Création impossible", code: "ERROR" };
  }
}
