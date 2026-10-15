import { prisma } from "@/lib/prisma";
import type {
  CityEntry,
  CommuneEntry,
  QuartierEntry,
} from "@/lib/locations/types";
import {
  SENEGAL_CITIES,
  SENEGAL_COMMUNES,
  SENEGAL_QUARTIERS,
} from "@/lib/locations/senegal";
import { guessRegionForCity } from "@/lib/locations/regions";

export type LocationsSnapshot = {
  cities: CityEntry[];
  communes: CommuneEntry[];
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
      return {
        cities: SENEGAL_CITIES,
        communes: SENEGAL_COMMUNES,
        quartiers: SENEGAL_QUARTIERS,
      };
    }

    const [communes, quartiers] = await Promise.all([
      prisma.commune.findMany({
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: {
          name: true,
          city: { select: { name: true, region: true } },
        },
      }),
      prisma.quartier.findMany({
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: {
          name: true,
          aliases: true,
          commune: {
            select: {
              name: true,
              city: { select: { name: true, region: true } },
            },
          },
        },
      }),
    ]);

    return {
      cities: cities.map((c) => ({
        name: c.name,
        region: c.region || guessRegionForCity(c.name) || "Dakar",
      })),
      communes: communes.map((c) => ({
        name: c.name,
        city: c.city.name,
        region:
          c.city.region || guessRegionForCity(c.city.name) || "Dakar",
      })),
      quartiers: quartiers.map((q) => ({
        name: q.name,
        commune: q.commune.name,
        city: q.commune.city.name,
        region:
          q.commune.city.region ||
          guessRegionForCity(q.commune.city.name) ||
          "Dakar",
        aliases: q.aliases,
      })),
    };
  } catch {
    return {
      cities: SENEGAL_CITIES,
      communes: SENEGAL_COMMUNES,
      quartiers: SENEGAL_QUARTIERS,
    };
  }
}
