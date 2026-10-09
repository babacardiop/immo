import { describe, expect, it } from "vitest";
import { canMutateListing } from "@/lib/listings/acl";

describe("canMutateListing ACL", () => {
  it("allows owner agent", () => {
    expect(
      canMutateListing({
        listingAgentId: "a1",
        actorId: "a1",
        actorRole: "AGENT",
      }),
    ).toBe(true);
  });

  it("blocks other agent", () => {
    expect(
      canMutateListing({
        listingAgentId: "a1",
        actorId: "a2",
        actorRole: "AGENT",
      }),
    ).toBe(false);
  });

  it("allows moderator on foreign listing", () => {
    expect(
      canMutateListing({
        listingAgentId: "a1",
        actorId: "od1",
        actorRole: "MODERATOR",
      }),
    ).toBe(true);
  });
});
