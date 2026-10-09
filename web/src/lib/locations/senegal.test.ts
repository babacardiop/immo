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

  it("ties every quartier to city + region", () => {
    for (const q of SENEGAL_QUARTIERS) {
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

  it("finds Djily via autocomplete query", () => {
    const hits = filterQuartiers("djily", "Dakar");
    expect(hits.map((q) => q.name)).toContain("Cité Djily Mbaye");
    expect(hits[0]?.region).toBe("Dakar");
  });

  it("formats hierarchy for suggestions", () => {
    const q = filterQuartiers("Almadies", "Dakar")[0]!;
    expect(formatLocationHierarchy(q)).toMatch(/almadies/i);
  });

  it("has a large commercial thesaurus", () => {
    expect(SENEGAL_QUARTIERS.length).toBeGreaterThan(100);
  });
});
