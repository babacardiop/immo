"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

export type LocationActionResult =
  | {
      ok: true;
      city?: string;
      commune?: string;
      quartier?: string;
      region?: string | null;
    }
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

export async function createCommuneAction(
  formData: FormData,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    const name = String(formData.get("name") ?? "").trim();
    const cityId = String(formData.get("cityId") ?? "").trim();
    if (name.length < 2 || !cityId) {
      return { ok: false, error: "Ville et nom de commune requis." };
    }
    await prisma.commune.create({ data: { name, cityId } });
    revalidateLieux();
    return { ok: true, commune: name };
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN") {
      return { ok: false, error: "Accès refusé." };
    }
    return { ok: false, error: "Commune déjà existante ou erreur." };
  }
}

/**
 * Agent-facing: create quartier (+ commune + city if needed) from the listing form.
 */
export async function createQuartierOnTheFlyAction(input: {
  quartier: string;
  commune: string;
  city: string;
  region: string;
}): Promise<LocationActionResult> {
  try {
    await requireAgent();

    const quartier = input.quartier.trim();
    const communeName = (input.commune || input.city).trim();
    const cityName = input.city.trim();
    const region = input.region.trim();

    if (quartier.length < 2) {
      return { ok: false, error: "Nom de quartier trop court." };
    }
    if (communeName.length < 2) {
      return { ok: false, error: "Nom de commune trop court." };
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
      city = await prisma.city.update({
        where: { id: city.id },
        data: {
          active: true,
          region: city.region || region,
        },
      });
    }

    let commune = await prisma.commune.findUnique({
      where: { cityId_name: { cityId: city.id, name: communeName } },
    });
    if (!commune) {
      commune = await prisma.commune.create({
        data: { name: communeName, cityId: city.id, active: true },
      });
    } else {
      commune = await prisma.commune.update({
        where: { id: commune.id },
        data: { active: true },
      });
    }

    await prisma.quartier.upsert({
      where: {
        communeId_name: { communeId: commune.id, name: quartier },
      },
      create: {
        name: quartier,
        communeId: commune.id,
        active: true,
      },
      update: { active: true },
    });

    revalidateLieux();
    return {
      ok: true,
      city: cityName,
      commune: communeName,
      quartier,
      region,
    };
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

export async function deleteCommuneAction(
  communeId: string,
): Promise<LocationActionResult> {
  try {
    await requireModerator();
    await prisma.commune.delete({ where: { id: communeId } });
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
    const communeId = String(formData.get("communeId") ?? "").trim();
    if (name.length < 2 || !communeId) {
      return { ok: false, error: "Commune et nom de quartier requis." };
    }
    await prisma.quartier.create({
      data: { name, communeId },
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
