import { describe, expect, it } from "vitest";
import { cityNamesForRegion, isSenegalRegion } from "@/lib/locations/cities-for-region";

describe("geo helpers", () => {
  it("validates senegal regions", () => {
    expect(isSenegalRegion("Dakar")).toBe(true);
    expect(isSenegalRegion("Narnia")).toBe(false);
  });

  it("lists cities for Dakar region", () => {
    const cities = cityNamesForRegion("Dakar");
    expect(cities).toEqual(expect.arrayContaining(["Dakar"]));
    expect(cities.length).toBeGreaterThan(3);
  });
});
