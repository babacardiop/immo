import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  prismaMock,
  rateLimit,
  notifyAgentNewLead,
  ackLeadSubmitter,
  requireAgent,
  headersMock,
} = vi.hoisted(() => ({
  rateLimit: vi.fn(() => ({ ok: true as const })),
  notifyAgentNewLead: vi.fn(async () => ({ ok: true })),
  ackLeadSubmitter: vi.fn(async () => ({ ok: true })),
  requireAgent: vi.fn(),
  headersMock: vi.fn(async () => new Headers({ "x-forwarded-for": "1.2.3.4" })),
  prismaMock: {
    listing: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    lead: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    leadEvent: { create: vi.fn() },
    $transaction: vi.fn(async (ops: unknown[]) => ops),
  },
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
vi.mock("@/lib/rate-limit", () => ({ rateLimit }));
vi.mock("@/lib/email/ack", () => ({ notifyAgentNewLead, ackLeadSubmitter }));
vi.mock("@/lib/session", () => ({ requireAgent }));
vi.mock("next/headers", () => ({ headers: headersMock }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import {
  addLeadNoteAction,
  submitLeadAction,
  updateLeadStageAction,
} from "@/app/actions/leads";

function form(data: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.set(k, v);
  return fd;
}

describe("submitLeadAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rateLimit.mockReturnValue({ ok: true });
    prismaMock.user.findUnique.mockResolvedValue({ id: "agent-fallback" });
    prismaMock.listing.findUnique.mockResolvedValue(null);
    prismaMock.lead.create.mockResolvedValue({ id: "lead-1" });
  });

  it("creates Lead at stage NEW", async () => {
    const result = await submitLeadAction(
      undefined,
      form({
        name: "Fatou Diop",
        phone: "+221770000000",
        email: "fatou@example.com",
        intent: "buy",
        message: "Almadies",
        consentContact: "on",
        sourceDetail: "form_contact",
        website: "",
      }),
    );

    expect(result).toEqual({ ok: true, id: "lead-1" });
    expect(prismaMock.lead.create).toHaveBeenCalledTimes(1);
    const arg = prismaMock.lead.create.mock.calls[0]?.[0].data;
    expect(arg.stage).toBe("NEW");
    expect(arg.consentContact).toBe(true);
    expect(arg.slaDueAt).toBeInstanceOf(Date);
    expect(arg.assigneeId).toBe("agent-fallback");
    expect(notifyAgentNewLead).toHaveBeenCalledTimes(1);
    expect(ackLeadSubmitter).toHaveBeenCalledTimes(1);
  });

  it("honeypot filled → ok skipped, no create", async () => {
    const result = await submitLeadAction(
      undefined,
      form({
        name: "Bot",
        phone: "+221770000000",
        consentContact: "on",
        website: "http://spam.test",
      }),
    );
    expect(result).toEqual({ ok: true, skipped: true });
    expect(prismaMock.lead.create).not.toHaveBeenCalled();
  });

  it("assigns listing agent when listingId set", async () => {
    prismaMock.listing.findUnique.mockResolvedValue({
      id: "lst1",
      agentId: "listing-agent",
      title: "Villa Almadies",
      status: "PUBLISHED",
    });

    await submitLeadAction(
      undefined,
      form({
        name: "Fatou Diop",
        phone: "+221770000000",
        consentContact: "on",
        listingId: "lst1",
        sourceDetail: "form_fiche",
        intent: "buy",
      }),
    );

    const arg = prismaMock.lead.create.mock.calls[0]?.[0].data;
    expect(arg.assigneeId).toBe("listing-agent");
    expect(arg.listingId).toBe("lst1");
  });
});

describe("agent lead mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("agent can move stage", async () => {
    requireAgent.mockResolvedValue({
      id: "a1",
      role: "AGENT",
      email: "a@x.sn",
    });
    prismaMock.lead.findUnique.mockResolvedValue({
      id: "lead-1",
      assigneeId: "a1",
      stage: "NEW",
      firstTouchAt: null,
    });

    const result = await updateLeadStageAction(
      "lead-1",
      form({ stage: "CONTACTED" }),
    );
    expect(result.ok).toBe(true);
    expect(prismaMock.$transaction).toHaveBeenCalled();
  });

  it("visitor/other agent cannot move stage", async () => {
    requireAgent.mockResolvedValue({
      id: "a2",
      role: "AGENT",
      email: "b@x.sn",
    });
    prismaMock.lead.findUnique.mockResolvedValue({
      id: "lead-1",
      assigneeId: "a1",
      stage: "NEW",
      firstTouchAt: null,
    });

    const result = await updateLeadStageAction(
      "lead-1",
      form({ stage: "CONTACTED" }),
    );
    expect(result).toMatchObject({ ok: false, code: "FORBIDDEN" });
  });

  it("agent can add note", async () => {
    requireAgent.mockResolvedValue({
      id: "a1",
      role: "AGENT",
      email: "a@x.sn",
    });
    prismaMock.lead.findUnique.mockResolvedValue({
      id: "lead-1",
      assigneeId: "a1",
      stage: "NEW",
      firstTouchAt: null,
    });

    const result = await addLeadNoteAction(
      "lead-1",
      form({ body: "Appelé, RDV jeudi" }),
    );
    expect(result.ok).toBe(true);
  });
});
