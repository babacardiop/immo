import { describe, expect, it } from "vitest";
import {
  TEMPLATE_STANDARD_SN,
  computeCompletenessPct,
  requiredFileCodes,
} from "./requirements";

describe("requirements completeness", () => {
  it("lists required file codes", () => {
    const codes = requiredFileCodes(TEMPLATE_STANDARD_SN);
    expect(codes).toContain("cni");
    expect(codes).toContain("pay_stubs_3");
    expect(codes).not.toContain("guarantor_ok");
  });

  it("computes pct", () => {
    expect(computeCompletenessPct(TEMPLATE_STANDARD_SN, [])).toBe(0);
    expect(
      computeCompletenessPct(TEMPLATE_STANDARD_SN, ["cni", "pay_stubs_3"]),
    ).toBe(100);
    expect(computeCompletenessPct(TEMPLATE_STANDARD_SN, ["cni"])).toBe(50);
  });
});
