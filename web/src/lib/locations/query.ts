import { prisma } from "@/lib/prisma";
import type { CityEntry, QuartierEntry } from "@/lib/locations/types";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
} from "@/lib/locations/senegal";
import { guessRegionForCity } from "@/lib/locations/regions";

export type LocationsSnapshot = {
  cities: CityEntry[];
  quartiers: QuartierEntry[];
};

export async function loadLocationsSnapshot(): Promise<LocationsSnapshot> {
  try {
    const cities = await prisma.city.findMany({
      where: { active: true },
      orderBy: [{ region: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
      select: { name: true, region: true },
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
        city: { select: { name: true, region: true } },
      },
    });

    return {
      cities: cities.map((c) => ({
        name: c.name,
        region: c.region || guessRegionForCity(c.name) || "Dakar",
      })),
      quartiers: quartiers.map((q) => ({
        name: q.name,
        city: q.city.name,
        region:
          q.city.region || guessRegionForCity(q.city.name) || "Dakar",
        aliases: q.aliases,
      })),
    };
  } catch {
    return { cities: SENEGAL_CITIES, quartiers: SENEGAL_QUARTIERS };
  }
}
