import { describe, expect, it } from "vitest";
import { resolveLeadAssignee } from "@/lib/leads/assign";

describe("resolveLeadAssignee", () => {
  it("prefers listing agent", () => {
    expect(
      resolveLeadAssignee({
        listingAgentId: "listing-agent",
        fallbackAgentId: "fallback",
      }),
    ).toBe("listing-agent");
  });

  it("falls back when no listing agent", () => {
    expect(
      resolveLeadAssignee({
        listingAgentId: null,
        fallbackAgentId: "fallback",
      }),
    ).toBe("fallback");
  });
});
