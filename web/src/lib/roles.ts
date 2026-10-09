import type { UserRole } from "@prisma/client";

export const AGENT_ROLES: UserRole[] = [
  "AGENT",
  "MODERATOR",
  "ADMIN",
  "GER",
];

export function isModeratorOrAbove(role: UserRole) {
  return role === "MODERATOR" || role === "ADMIN" || role === "GER";
}
