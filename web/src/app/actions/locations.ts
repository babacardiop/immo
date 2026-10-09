"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

export type LocationActionResult =
  | { ok: true; city?: string; quartier?: string; region?: string | null }
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
    const regionRaw = String(formData.get("region") ?? "").trim();
    if (name.length < 2) {
      return { ok: false, error: "Nom de ville trop court." };
    }
    if (!SENEGAL_REGIONS.includes(regionRaw as never)) {
      return { ok: false, error: "Région obligatoire." };
    }
    await prisma.city.create({ data: { name, region: regionRaw } });
    revalidateLieux();
    return { ok: true, city: name, region: regionRaw };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Ville déjà existante ou erreur." };
  }
}

/**
 * Agent-facing: create quartier (+ city if needed) from the listing form.
 */
export async function createQuartierOnTheFlyAction(input: {
  quartier: string;
  city: string;
  region: string;
}): Promise<LocationActionResult> {
  try {
    await requireAgent();

    const quartier = input.quartier.trim();
    const cityName = input.city.trim();
    const region = input.region.trim();

    if (quartier.length < 2) {
      return { ok: false, error: "Nom de quartier trop court." };
    }
    if (cityName.length < 2) {
      return { ok: false, error: "Nom de ville trop court." };
    }
    if (!SENEGAL_REGIONS.includes(region as never)) {
      return { ok: false, error: "Région invalide." };
    }

    let city = await prisma.city.findUnique({ where: { name: cityName } });
    if (!city) {
      city = await prisma.city.create({
        data: { name: cityName, region, active: true },
      });
    } else {
      // Region is mandatory — keep existing unless empty, else bind to provided.
      city = await prisma.city.update({
        where: { id: city.id },
        data: {
          active: true,
          region: city.region || region,
        },
      });
    }

    await prisma.quartier.upsert({
      where: {
        cityId_name: { cityId: city.id, name: quartier },
      },
      create: {
        name: quartier,
        cityId: city.id,
        active: true,
      },
      update: { active: true },
    });

    revalidateLieux();
    return { ok: true, city: cityName, quartier, region };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return { ok: false, error: "Connexion requise." };
    }
    console.error(e);
    return { ok: false, error: "Impossible d’ajouter ce lieu." };
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
