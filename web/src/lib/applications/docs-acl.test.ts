import { describe, expect, it } from "vitest";
import { canReadApplicationDocument, canUploadApplicationDocument } from "./docs-acl";

describe("canReadApplicationDocument", () => {
  it("denies landlord always", () => {
    expect(
      canReadApplicationDocument({
        actor: { id: "l1", role: "LANDLORD" },
        documentOwnerUserId: "c1",
      }),
    ).toBe(false);
  });

  it("denies landlord assignment even if staff-like id", () => {
    expect(
      canReadApplicationDocument({
        actor: { id: "a1", role: "AGENT" },
        documentOwnerUserId: "c1",
        isLandlordOnListing: true,
      }),
    ).toBe(false);
  });

  it("allows agent / OD", () => {
    expect(
      canReadApplicationDocument({
        actor: { id: "a1", role: "AGENT" },
        documentOwnerUserId: "c1",
      }),
    ).toBe(true);
    expect(
      canReadApplicationDocument({
        actor: { id: "m1", role: "MODERATOR" },
        documentOwnerUserId: "c1",
      }),
    ).toBe(true);
  });

  it("allows candidate own uploads only", () => {
    expect(
      canReadApplicationDocument({
        actor: { id: "c1", role: "CLIENT" },
        documentOwnerUserId: "c1",
      }),
    ).toBe(true);
    expect(
      canReadApplicationDocument({
        actor: { id: "c2", role: "CLIENT" },
        documentOwnerUserId: "c1",
      }),
    ).toBe(false);
  });
});

describe("canUploadApplicationDocument", () => {
  it("requires active candidate assignment + owner", () => {
    expect(
      canUploadApplicationDocument({
        actor: { id: "c1", role: "CLIENT" },
        applicationUserId: "c1",
        hasActiveCandidateAssignment: true,
      }),
    ).toBe(true);
    expect(
      canUploadApplicationDocument({
        actor: { id: "c1", role: "CLIENT" },
        applicationUserId: "c1",
        hasActiveCandidateAssignment: false,
      }),
    ).toBe(false);
  });
});
