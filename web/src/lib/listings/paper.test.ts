import { describe, expect, it } from "vitest";
import {
  canPublishPaper,
  isSaleLike,
  paperFieldsForTransaction,
  paperLabel,
} from "@/lib/listings/paper";

describe("paper helpers", () => {
  it("labels known paper types", () => {
    expect(paperLabel("TF")).toBe("Titre foncier");
    expect(paperLabel(null)).toBe("Papier non renseigné");
  });

  it("detects sale-like transactions", () => {
    expect(isSaleLike("SALE")).toBe(true);
    expect(isSaleLike("RENT")).toBe(false);
    expect(isSaleLike("SHORT_TERM_RENT")).toBe(false);
  });

  it("blocks OTHER / empty paper on sale", () => {
    expect(canPublishPaper("SALE", "OTHER")).toBe(false);
    expect(canPublishPaper("SALE", null)).toBe(false);
    expect(canPublishPaper("SALE", "TF")).toBe(true);
    expect(canPublishPaper("RENT", null)).toBe(true);
  });

  it("clears paper and nicad for RENT", () => {
    const cleared = paperFieldsForTransaction("RENT", {
      paperType: "TF",
      nicad: "1234567890123456",
      deliberationDisclaimerAck: true,
    });
    expect(cleared.paperType).toBeNull();
    expect(cleared.nicad).toBeNull();
    expect(cleared.deliberationDisclaimerAck).toBe(false);
  });
});
