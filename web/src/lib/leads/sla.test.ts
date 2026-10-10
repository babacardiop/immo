import { describe, expect, it } from "vitest";
import { computeSlaDueAt, isLeadOverdue, SLA_STANDARD_MS } from "@/lib/leads/sla";

describe("leads sla", () => {
  it("sets due 24h after create", () => {
    const created = new Date("2026-10-09T10:00:00.000Z");
    const due = computeSlaDueAt(created);
    expect(due.getTime() - created.getTime()).toBe(SLA_STANDARD_MS);
  });

  it("marks NEW past due as overdue", () => {
    const created = new Date("2026-10-08T10:00:00.000Z");
    const due = computeSlaDueAt(created);
    expect(
      isLeadOverdue({
        stage: "NEW",
        slaDueAt: due,
        firstTouchAt: null,
        now: new Date("2026-10-09T12:00:00.000Z"),
      }),
    ).toBe(true);
  });

  it("clears overdue after first touch", () => {
    const created = new Date("2026-10-08T10:00:00.000Z");
    expect(
      isLeadOverdue({
        stage: "NEW",
        slaDueAt: computeSlaDueAt(created),
        firstTouchAt: new Date("2026-10-08T11:00:00.000Z"),
        now: new Date("2026-10-09T12:00:00.000Z"),
      }),
    ).toBe(false);
  });
});
