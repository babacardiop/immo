import { describe, expect, it } from "vitest";
import { motifRecommended, VISIT_OUTCOME_LABELS } from "./visit-outcome";

describe("visit outcome", () => {
  it("labels cover all outcomes", () => {
    expect(VISIT_OUTCOME_LABELS.NOT_INTERESTED).toMatch(/intéressé/i);
    expect(VISIT_OUTCOME_LABELS.VISIT_OTHER_RENTALS).toMatch(/autres/i);
    expect(VISIT_OUTCOME_LABELS.CONTINUE).toMatch(/poursuite/i);
  });

  it("requires motif for not interested / other", () => {
    expect(motifRecommended("NOT_INTERESTED")).toBe(true);
    expect(motifRecommended("OTHER")).toBe(true);
    expect(motifRecommended("CONTINUE")).toBe(false);
  });
});
