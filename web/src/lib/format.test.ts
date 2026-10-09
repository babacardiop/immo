import { describe, expect, it } from "vitest";
import {
  defaultPricePeriod,
  pricePeriodSuffix,
  transactionLabel,
} from "@/lib/format";

describe("format helpers", () => {
  it("labels short-term rent", () => {
    expect(transactionLabel("SHORT_TERM_RENT")).toMatch(/courte durée/i);
  });

  it("defaults price period by transaction", () => {
    expect(defaultPricePeriod("SHORT_TERM_RENT")).toBe("NIGHT");
    expect(defaultPricePeriod("RENT")).toBe("MONTH");
    expect(defaultPricePeriod("SALE")).toBe("MONTH");
  });

  it("formats period suffixes", () => {
    expect(pricePeriodSuffix("NIGHT")).toBe(" / nuit");
    expect(pricePeriodSuffix("MONTH")).toBe(" / mois");
    expect(pricePeriodSuffix("WEEK")).toBe(" / semaine");
  });
});
