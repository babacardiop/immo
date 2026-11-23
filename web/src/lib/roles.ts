import type { UserRole } from "@prisma/client";

export const AGENT_ROLES: UserRole[] = [
  "AGENT",
  "MODERATOR",
  "ADMIN",
  "GER",
];

/** Roles allowed to sign in to the hub (web/). Lab-only analysts are not. */
export function canAccessHub(role: UserRole) {
  return role !== "RESEARCH_LAB";
}

export function isModeratorOrAbove(role: UserRole) {
  return role === "MODERATOR" || role === "ADMIN" || role === "GER";
}

/**
 * Research Lab gate — keep in sync with lab/src/lib/access.ts.
 * Spec: dossier/tech/research-lab/sprints/README.md §3.8.
 */
export function canAccessLab(user: { role: UserRole; labAccess?: boolean }) {
  if (user.role === "CLIENT" || user.role === "LANDLORD") return false;
  if (user.role === "RESEARCH_LAB" || user.role === "ADMIN") return true;
  return user.labAccess === true;
}
