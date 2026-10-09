import { describe, expect, it } from "vitest";
import { formatQuartierWithCity } from "@/lib/locations/format";

describe("formatQuartierWithCity", () => {
  it("joins quartier and city", () => {
    expect(formatQuartierWithCity("Almadies", "Dakar")).toBe(
      "Almadies · Dakar",
    );
  });

  it("falls back to single part", () => {
    expect(formatQuartierWithCity("Almadies", null)).toBe("Almadies");
    expect(formatQuartierWithCity("", "Dakar")).toBe("Dakar");
  });
});
