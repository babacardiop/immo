import { describe, expect, it, vi, afterEach } from "vitest";
import { ackLeadSubmitter, notifyAgentNewLead } from "@/lib/email/ack";
import type { SendEmailInput, SendEmailResult } from "@/lib/email/resend";

describe("lead email ack", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("notifies agent inbox once when configured", async () => {
    vi.stubEnv("EMAIL_AGENT_INBOX", "agent@evergreen.sn");
    const calls: SendEmailInput[] = [];
    const send = async (input: SendEmailInput): Promise<SendEmailResult> => {
      calls.push(input);
      return { ok: true, id: "msg_1" };
    };

    await notifyAgentNewLead({
      leadId: "lead1",
      name: "Fatou",
      phone: "+221770000000",
      intent: "buy",
      send,
    });

    expect(calls).toHaveLength(1);
    expect(calls[0]?.to).toBe("agent@evergreen.sn");
    expect(calls[0]?.html).toMatch(/Nouveau lead/i);
  });

  it("acks submitter email", async () => {
    const calls: SendEmailInput[] = [];
    const send = async (input: SendEmailInput): Promise<SendEmailResult> => {
      calls.push(input);
      return { ok: true };
    };
    await ackLeadSubmitter({
      email: "fatou@example.com",
      name: "Fatou",
      send,
    });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.to).toBe("fatou@example.com");
  });
});
