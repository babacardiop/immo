import type { UserRole } from "@prisma/client";

const ELEVATED: UserRole[] = ["MODERATOR", "ADMIN", "GER"];

/** Agent sees/mutates own assigned leads; elevated sees all. */
export function canAccessLead(input: {
  assigneeId: string | null | undefined;
  actorId: string;
  actorRole: UserRole;
}): boolean {
  if (ELEVATED.includes(input.actorRole)) return true;
  return input.assigneeId === input.actorId;
}

export function canMutateLeadStage(input: {
  assigneeId: string | null | undefined;
  actorId: string;
  actorRole: UserRole;
}): boolean {
  return canAccessLead(input);
}
