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

  it("narrows louer to short-term rent (incl. dual RENT)", () => {
    const where = buildPublicWhere("louer", {
      transaction: "SHORT_TERM_RENT",
    });
    expect(where.transaction).toBeUndefined();
    expect(where.AND).toEqual(
      expect.arrayContaining([
        {
          OR: [
            { transaction: "SHORT_TERM_RENT" },
            { transaction: "RENT", alsoShortTerm: true },
          ],
        },
      ]),
    );
  });

  it("combines short-term filter with region cities", () => {
    const where = buildPublicWhere("louer", {
      transaction: "SHORT_TERM_RENT",
      regions: ["Dakar"],
    });
    expect(where.AND).toEqual(
      expect.arrayContaining([
        {
          OR: [
            { transaction: "SHORT_TERM_RENT" },
            { transaction: "RENT", alsoShortTerm: true },
          ],
        },
        expect.objectContaining({
          OR: expect.arrayContaining([
            { city: { equals: "Dakar", mode: "insensitive" } },
          ]),
        }),
      ]),
    );
  });

  it("parses search params safely", () => {
    const filters = parseCatalogueSearchParams({
      city: "Thiès",
      propertyType: "HOUSE",
      paperType: "NOT_A_PAPER",
      priceMin: "1000",
      priceMax: ["2000"],
      page: "3",
    });

    expect(filters.city).toBe("Thiès");
    expect(filters.propertyType).toBe("HOUSE");
    expect(filters.paperType).toBeUndefined();
    expect(filters.priceMin).toBe(1000);
    expect(filters.priceMax).toBe(2000);
    expect(filters.page).toBe(3);
    expect(filters.view).toBe("list");
  });

  it("parses view=map and valid region", () => {
    const filters = parseCatalogueSearchParams({
      view: "map",
      region: "Dakar",
    });
    expect(filters.view).toBe("map");
    expect(filters.regions).toEqual(["Dakar"]);
  });

  it("parses multiple regions", () => {
    const filters = parseCatalogueSearchParams({
      region: ["Dakar", "Thiès"],
    });
    expect(filters.regions).toEqual(["Dakar", "Thiès"]);
  });

  it("parses comma-separated regions", () => {
    const filters = parseCatalogueSearchParams({
      region: "Dakar,Thiès",
    });
    expect(filters.regions).toEqual(["Dakar", "Thiès"]);
  });

  it("ignores invalid region", () => {
    const filters = parseCatalogueSearchParams({ region: "Narnia" });
    expect(filters.regions).toBeUndefined();
  });

  it("filters by region cities when city omitted", () => {
    const where = buildPublicWhere("acheter", { regions: ["Dakar"] });
    expect(where.AND).toEqual(
      expect.arrayContaining([
        {
          OR: expect.arrayContaining([
            { city: { equals: "Dakar", mode: "insensitive" } },
          ]),
        },
      ]),
    );
    expect(where.city).toBeUndefined();
  });

  it("unions cities across multiple regions", () => {
    const where = buildPublicWhere("acheter", {
      regions: ["Dakar", "Thiès"],
    });
    const geoOr = (where.AND as { OR: unknown }[])?.find(
      (clause) => Array.isArray(clause.OR) && clause.OR.length > 5,
    );
    expect(geoOr?.OR).toEqual(
      expect.arrayContaining([
        { city: { equals: "Dakar", mode: "insensitive" } },
        { city: { equals: "Mbour", mode: "insensitive" } },
      ]),
    );
  });

  it("city filter wins over region", () => {
    const where = buildPublicWhere("acheter", {
      regions: ["Dakar"],
      city: "Mbour",
    });
    expect(where.city).toEqual({ equals: "Mbour", mode: "insensitive" });
    expect(where.AND).toBeUndefined();
  });
});
