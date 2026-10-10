import { describe, expect, it, vi, beforeEach } from "vitest";

const { prismaMock, rateLimit, notifyAgentNewLead, ackLeadSubmitter } =
  vi.hoisted(() => ({
    rateLimit: vi.fn(() => ({ ok: true as const })),
    notifyAgentNewLead: vi.fn(async () => ({ ok: true })),
    ackLeadSubmitter: vi.fn(async () => ({ ok: true })),
    prismaMock: {
      listing: { findUnique: vi.fn() },
      user: { findUnique: vi.fn() },
      lead: { create: vi.fn() },
    },
  }));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit }));
vi.mock("@/lib/email/ack", () => ({ notifyAgentNewLead, ackLeadSubmitter }));
vi.mock("@/lib/session", () => ({
  requireAgent: vi.fn(),
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "9.9.9.9" }),
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { submitLeadAction } from "@/app/actions/leads";

describe("lead assign from listing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.lead.create.mockResolvedValue({ id: "lead-x" });
  });

  it("Lead assigned to listing agent when listingId set", async () => {
    prismaMock.listing.findUnique.mockResolvedValue({
      id: "clxxxxxxxxxxxxxxxxxxx1",
      agentId: "agent-of-listing",
      title: "Appart Mermoz",
      status: "PUBLISHED",
    });

    const fd = new FormData();
    fd.set("name", "Ousmane");
    fd.set("phone", "+221771112233");
    fd.set("consentContact", "true");
    fd.set("intent", "rent");
    fd.set("listingId", "clxxxxxxxxxxxxxxxxxxx1");
    fd.set("sourceDetail", "form_fiche");
    fd.set("website", "");

    await submitLeadAction(undefined, fd);

    expect(prismaMock.lead.create.mock.calls[0]?.[0].data.assigneeId).toBe(
      "agent-of-listing",
    );
  });
});
