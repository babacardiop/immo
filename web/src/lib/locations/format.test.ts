import { describe, expect, it } from "vitest";
import {
  formatCityWithRegion,
  formatLocationHierarchy,
} from "@/lib/locations/format";

describe("formatLocationHierarchy", () => {
  it("joins quartier · commune · city and drops duplicate region", () => {
    expect(
      formatLocationHierarchy({
        quartier: "Cité Djily Mbaye",
        commune: "Yoff",
        city: "Dakar",
        region: "Dakar",
      }),
    ).toBe("Cité Djily Mbaye · Yoff · Dakar");
  });

  it("dedupes when commune equals city", () => {
    expect(
      formatLocationHierarchy({
        quartier: "Almadies",
        commune: "Dakar",
        city: "Dakar",
        region: "Dakar",
      }),
    ).toBe("Almadies · Dakar");
  });

  it("keeps distinct region when different from city", () => {
    expect(
      formatLocationHierarchy({
        quartier: "Saly Nord",
        commune: "Saly",
        city: "Saly",
        region: "Thiès",
      }),
    ).toBe("Saly Nord · Saly · Thiès");
  });

  it("accepts QuartierEntry.name as quartier", () => {
    expect(
      formatLocationHierarchy({
        name: "Cité Djily Mbaye",
        commune: "Yoff",
        city: "Dakar",
        region: "Dakar",
      }),
    ).toBe("Cité Djily Mbaye · Yoff · Dakar");
  });

  it("formats city with region", () => {
    expect(formatCityWithRegion("Mbour", "Thiès")).toBe("Mbour · Thiès");
    expect(formatCityWithRegion("Dakar", "Dakar")).toBe("Dakar");
  });
});
