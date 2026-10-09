import type { UserRole } from "@prisma/client";

const ELEVATED: UserRole[] = ["MODERATOR", "ADMIN", "GER"];

export function canMutateListing(input: {
  listingAgentId: string | null | undefined;
  actorId: string;
  actorRole: UserRole;
}): boolean {
  if (input.listingAgentId === input.actorId) return true;
  return ELEVATED.includes(input.actorRole);
}
