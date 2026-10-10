import { describe, expect, it } from "vitest";
import { buildPublicWhere } from "@/lib/listings/public-query";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

describe("catalogue filters", () => {
  it("composes city, paper, propertyType and price", () => {
    const where = buildPublicWhere("acheter", {
      city: "Dakar",
      paperType: "TF",
      propertyType: "LAND",
      priceMin: 1_000_000,
      priceMax: 50_000_000,
    });

    expect(where.city).toEqual({ equals: "Dakar", mode: "insensitive" });
    expect(where.paperType).toBe("TF");
    expect(where.propertyType).toBe("LAND");
    expect(where.priceFcfa).toEqual({ gte: 1_000_000, lte: 50_000_000 });
    expect(where.transaction).toEqual({
      in: ["SALE", "INSTALLMENT_SALE", "RENT_TO_OWN"],
    });
  });

  it("ignores paperType on louer channel", () => {
    const where = buildPublicWhere("louer", { paperType: "TF" });
    expect(where.paperType).toBeUndefined();
  });

  it("narrows louer to short-term rent", () => {
    const where = buildPublicWhere("louer", {
      transaction: "SHORT_TERM_RENT",
    });
    expect(where.transaction).toBe("SHORT_TERM_RENT");
  });

  it("parses search params safely", () => {
    const filters = parseCatalogueSearchParams({
      city: "Thiès",
      propertyType: "HOUSE",
      paperType: "NOT_A_PAPER",
      priceMin: "1000",
      priceMax: ["2000"],
      cursor: "abc",
    });

    expect(filters.city).toBe("Thiès");
    expect(filters.propertyType).toBe("HOUSE");
    expect(filters.paperType).toBeUndefined();
    expect(filters.priceMin).toBe(1000);
    expect(filters.priceMax).toBe(2000);
    expect(filters.cursor).toBe("abc");
    expect(filters.view).toBe("list");
  });

  it("parses view=map and valid region", () => {
    const filters = parseCatalogueSearchParams({
      view: "map",
      region: "Dakar",
    });
    expect(filters.view).toBe("map");
    expect(filters.region).toBe("Dakar");
  });

  it("ignores invalid region", () => {
    const filters = parseCatalogueSearchParams({ region: "Narnia" });
    expect(filters.region).toBeUndefined();
  });

  it("filters by region cities when city omitted", () => {
    const where = buildPublicWhere("acheter", { region: "Dakar" });
    expect(where.OR).toEqual(
      expect.arrayContaining([
        { city: { equals: "Dakar", mode: "insensitive" } },
      ]),
    );
    expect(where.city).toBeUndefined();
  });

  it("city filter wins over region", () => {
    const where = buildPublicWhere("acheter", {
      region: "Dakar",
      city: "Mbour",
    });
    expect(where.city).toEqual({ equals: "Mbour", mode: "insensitive" });
    expect(where.OR).toBeUndefined();
  });
});

