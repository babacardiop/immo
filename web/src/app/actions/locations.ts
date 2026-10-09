"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";

export type LocationActionResult =
  | { ok: true }
  | { ok: false; error: string };

async function requireModerator() {
  const user = await requireAgent();
  if (!isModeratorOrAbove(user.role)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}

function revalidateLieux() {
  revalidatePath("/espace/agent/lieux");
  revalidatePath("/api/locations");
  revalidatePath("/acheter");
  revalidatePath("/louer");
}

export async function createCityAction(
  formData: FormData,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2) {
      return { ok: false, error: "Nom de ville trop court." };
    }
    await prisma.city.create({ data: { name } });
    revalidateLieux();
    return { ok: true };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Ville déjà existante ou erreur." };
  }
}

export async function deleteCityAction(
  cityId: string,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    await prisma.city.delete({ where: { id: cityId } });
    revalidateLieux();
    return { ok: true };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Suppression impossible." };
  }
}

export async function createQuartierAction(
  formData: FormData,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    const name = String(formData.get("name") ?? "").trim();
    const cityId = String(formData.get("cityId") ?? "").trim();
    if (name.length < 2 || !cityId) {
      return { ok: false, error: "Ville et nom de quartier requis." };
    }
    await prisma.quartier.create({
      data: { name, cityId },
    });
    revalidateLieux();
    return { ok: true };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Quartier déjà existant ou erreur." };
  }
}

export async function deleteQuartierAction(
  quartierId: string,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    await prisma.quartier.delete({ where: { id: quartierId } });
    revalidateLieux();
    return { ok: true };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Suppression impossible." };
  }
}
