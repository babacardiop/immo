import type { UserRole } from "@prisma/client";
import { AGENT_ROLES } from "@/lib/roles";

export type DocsAclActor = {
  id: string;
  role: UserRole;
};

/**
 * Who may read application vault files.
 * Landlord: always deny.
 * Candidate: own uploads only.
 * Staff (agent+): allow.
 */
export function canReadApplicationDocument(input: {
  actor: DocsAclActor;
  documentOwnerUserId: string;
  /** True if actor is landlord assignment on this listing — still deny files. */
  isLandlordOnListing?: boolean;
}): boolean {
  if (input.isLandlordOnListing) return false;
  if (input.actor.role === "LANDLORD") return false;
  if (AGENT_ROLES.includes(input.actor.role)) return true;
  if (
    input.actor.role === "CLIENT" &&
    input.actor.id === input.documentOwnerUserId
  ) {
    return true;
  }
  return false;
}

export function canUploadApplicationDocument(input: {
  actor: DocsAclActor;
  applicationUserId: string;
  hasActiveCandidateAssignment: boolean;
}): boolean {
  if (input.actor.id !== input.applicationUserId) return false;
  if (input.actor.role !== "CLIENT") return false;
  return input.hasActiveCandidateAssignment;
}

export function canReviewApplications(role: UserRole): boolean {
  return AGENT_ROLES.includes(role);
}
