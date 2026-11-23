/** Hub roles, mirrored as strings (the lab has no hub Prisma client). */
export type HubRole =
  | "AGENT"
  | "MODERATOR"
  | "ADMIN"
  | "GER"
  | "CLIENT"
  | "LANDLORD"
  | "RESEARCH_LAB";

/**
 * Research Lab gate — keep in sync with web/src/lib/roles.ts canAccessLab.
 * Spec: dossier/tech/research-lab/sprints/README.md §3.8.
 */
export function canAccessLab(user: { role: string; labAccess?: boolean | null }) {
  if (user.role === "CLIENT" || user.role === "LANDLORD") return false;
  if (user.role === "RESEARCH_LAB" || user.role === "ADMIN") return true;
  return user.labAccess === true;
}
