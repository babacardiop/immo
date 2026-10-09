import { describe, expect, it } from "vitest";
import {
  buildPublicWhere,
  channelForTransaction,
  channelTransactions,
  publicListingPath,
} from "@/lib/listings/public-query";

describe("public-query", () => {
  it("acheter uses sale-like transactions", () => {
    expect(channelTransactions("acheter")).toEqual([
      "SALE",
      "INSTALLMENT_SALE",
      "RENT_TO_OWN",
    ]);
  });

  it("louer includes classic and short-term rent", () => {
    expect(channelTransactions("louer")).toEqual([
      "RENT",
      "SHORT_TERM_RENT",
    ]);
  });

  it("maps transaction to channel", () => {
    expect(channelForTransaction("SALE")).toBe("acheter");
    expect(channelForTransaction("RENT")).toBe("louer");
    expect(channelForTransaction("SHORT_TERM_RENT")).toBe("louer");
    expect(channelForTransaction("RENT_TO_OWN")).toBe("acheter");
  });

  it("builds public path", () => {
    expect(publicListingPath("acheter", "terrain-almadies")).toBe(
      "/acheter/terrain-almadies",
    );
  });

  it("always requires PUBLISHED status", () => {
    const where = buildPublicWhere("acheter");
    expect(where.status).toBe("PUBLISHED");
  });

  it("never leaves draft status in where clause", () => {
    const where = buildPublicWhere("louer", { city: "Dakar" });
    expect(where.status).toBe("PUBLISHED");
    expect(where.status).not.toBe("DRAFT");
  });
});
