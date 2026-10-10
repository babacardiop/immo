import type { LeadStage } from "@prisma/client";

/** Standard human SLA: 24h from creation. */
export const SLA_STANDARD_MS = 24 * 60 * 60 * 1000;

export function computeSlaDueAt(createdAt: Date = new Date()): Date {
  return new Date(createdAt.getTime() + SLA_STANDARD_MS);
}

/** Overdue when still NEW, past slaDueAt, and never first-touched. */
export function isLeadOverdue(input: {
  stage: LeadStage;
  slaDueAt: Date | null | undefined;
  firstTouchAt: Date | null | undefined;
  now?: Date;
}): boolean {
  if (input.firstTouchAt) return false;
  if (input.stage !== "NEW") return false;
  if (!input.slaDueAt) return false;
  const now = input.now ?? new Date();
  return now.getTime() > input.slaDueAt.getTime();
}
