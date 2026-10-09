import { describe, expect, it } from "vitest";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
  filterCities,
  filterQuartiers,
} from "@/lib/locations/senegal";
import { formatQuartierWithCity } from "@/lib/locations/format";

describe("senegal locations", () => {
  it("includes major Dakar-region cities", () => {
    for (const city of [
      "Dakar",
      "Pikine",
      "Guédiawaye",
      "Rufisque",
      "Keur Massar",
      "Thiès",
      "Mbour",
    ]) {
      expect(SENEGAL_CITIES).toContain(city);
    }
  });

  it("filters cities accent-insensitive", () => {
    expect(filterCities("thies")).toContain("Thiès");
    expect(filterCities("guedia")).toContain("Guédiawaye");
  });

  it("lists Dakar commercial quartiers", () => {
    const names = filterQuartiers("", "Dakar").map((q) => q.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "Almadies",
        "Ngor",
        "Mermoz",
        "Sacré-Cœur",
        "Point E",
        "Ouakam",
      ]),
    );
  });

  it("scopes quartiers to selected city", () => {
    const pikine = filterQuartiers("", "Pikine").map((q) => q.name);
    expect(pikine).toContain("Mbao");
    expect(pikine).not.toContain("Almadies");
  });

  it("matches quartier aliases", () => {
    const hits = filterQuartiers("sacre coeur", "Dakar").map((q) => q.name);
    expect(hits).toContain("Sacré-Cœur");
  });

  it("formats quartier with city for display", () => {
    const q = filterQuartiers("Almadies", "Dakar")[0]!;
    expect(formatQuartierWithCity(q.name, q.city)).toBe("Almadies · Dakar");
  });

  it("has unique city names and non-empty quartier set", () => {
    expect(new Set(SENEGAL_CITIES).size).toBe(SENEGAL_CITIES.length);
    expect(SENEGAL_QUARTIERS.length).toBeGreaterThan(40);
  });
});
