import { describe, expect, it } from "vitest";
import { canAccessLead, canMutateLeadStage } from "@/lib/leads/acl";

describe("leads acl", () => {
  it("allows assignee agent", () => {
    expect(
      canAccessLead({
        assigneeId: "a1",
        actorId: "a1",
        actorRole: "AGENT",
      }),
    ).toBe(true);
    expect(
      canMutateLeadStage({
        assigneeId: "a1",
        actorId: "a1",
        actorRole: "AGENT",
      }),
    ).toBe(true);
  });

  it("blocks other agent", () => {
    expect(
      canAccessLead({
        assigneeId: "a1",
        actorId: "a2",
        actorRole: "AGENT",
      }),
    ).toBe(false);
  });

  it("allows elevated roles on any lead", () => {
    expect(
      canAccessLead({
        assigneeId: "a1",
        actorId: "od1",
        actorRole: "ADMIN",
      }),
    ).toBe(true);
  });
});
