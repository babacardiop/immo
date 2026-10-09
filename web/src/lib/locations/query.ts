import { prisma } from "@/lib/prisma";
import type { QuartierEntry } from "@/lib/locations/senegal";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
} from "@/lib/locations/senegal";

export type LocationsSnapshot = {
  cities: string[];
  quartiers: QuartierEntry[];
};

export async function loadLocationsSnapshot(): Promise<LocationsSnapshot> {
  try {
    const cities = await prisma.city.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { name: true },
    });

    if (cities.length === 0) {
      return { cities: SENEGAL_CITIES, quartiers: SENEGAL_QUARTIERS };
    }

    const quartiers = await prisma.quartier.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: {
        name: true,
        aliases: true,
        city: { select: { name: true } },
      },
    });

    return {
      cities: cities.map((c) => c.name),
      quartiers: quartiers.map((q) => ({
        name: q.name,
        city: q.city.name,
        aliases: q.aliases,
      })),
    };
  } catch {
    return { cities: SENEGAL_CITIES, quartiers: SENEGAL_QUARTIERS };
  }
}
