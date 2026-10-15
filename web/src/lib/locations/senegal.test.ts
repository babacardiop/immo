import { describe, expect, it } from "vitest";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
  filterCities,
  filterQuartiers,
} from "@/lib/locations/senegal";
import { formatLocationHierarchy } from "@/lib/locations/format";

describe("senegal locations", () => {
  it("ties every city to a region", () => {
    for (const city of SENEGAL_CITIES) {
      expect(city.region.length).toBeGreaterThan(0);
    }
    expect(SENEGAL_CITIES.some((c) => c.name === "Dakar")).toBe(true);
    expect(SENEGAL_CITIES.find((c) => c.name === "Dakar")?.region).toBe(
      "Dakar",
    );
    expect(SENEGAL_CITIES.find((c) => c.name === "Mbour")?.region).toBe(
      "Thiès",
    );
  });

  it("ties every quartier to commune + city + region", () => {
    for (const q of SENEGAL_QUARTIERS) {
      expect(q.commune.length).toBeGreaterThan(0);
      expect(q.city.length).toBeGreaterThan(0);
      expect(q.region.length).toBeGreaterThan(0);
    }
  });

  it("does not dump cities on empty query", () => {
    expect(filterCities("")).toEqual([]);
    expect(filterCities("D")).toEqual([]);
  });

  it("filters cities after 2+ chars", () => {
    expect(filterCities("thies")).toContain("Thiès");
    expect(filterCities("da")).toContain("Dakar");
  });

  it("finds Djily via autocomplete query under Yoff", () => {
    const hits = filterQuartiers("djily", "Dakar");
    const djily = hits.find((q) => q.name === "Cité Djily Mbaye");
    expect(djily?.commune).toBe("Yoff");
    expect(djily?.region).toBe("Dakar");
    expect(formatLocationHierarchy(djily!)).toBe(
      "Cité Djily Mbaye · Yoff · Dakar",
    );
  });

  it("formats hierarchy for suggestions", () => {
    const q = filterQuartiers("Almadies", "Dakar")[0]!;
    expect(formatLocationHierarchy(q)).toMatch(/almadies/i);
  });

  it("has ANSD-scale thesaurus", () => {
    // ANSD RGPH-5 2023 répertoire des localités (~25k).
    expect(SENEGAL_QUARTIERS.length).toBeGreaterThan(20000);
    expect(SENEGAL_CITIES.length).toBeGreaterThan(200);
  });
});
