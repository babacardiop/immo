import { describe, expect, it } from "vitest";
import {
  formatCityWithRegion,
  formatLocationHierarchy,
} from "@/lib/locations/format";

describe("formatLocationHierarchy", () => {
  it("joins quartier · city · region", () => {
    expect(
      formatLocationHierarchy({
        quartier: "Almadies",
        city: "Dakar",
        region: "Dakar",
      }),
    ).toBe("Almadies · Dakar");
  });

  it("keeps distinct region when different from city", () => {
    expect(
      formatLocationHierarchy({
        quartier: "Saly Nord",
        city: "Saly",
        region: "Thiès",
      }),
    ).toBe("Saly Nord · Saly · Thiès");
  });

  it("accepts QuartierEntry.name as quartier", () => {
    expect(
      formatLocationHierarchy({
        name: "Cité Djily Mbaye",
        city: "Dakar",
        region: "Dakar",
      }),
    ).toBe("Cité Djily Mbaye · Dakar");
  });

  it("formats city with region", () => {
    expect(formatCityWithRegion("Mbour", "Thiès")).toBe("Mbour · Thiès");
    expect(formatCityWithRegion("Dakar", "Dakar")).toBe("Dakar");
  });
});
