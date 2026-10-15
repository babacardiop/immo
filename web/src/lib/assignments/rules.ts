import type { AssignmentRole, AssignmentStatus } from "@prisma/client";

export function isActiveCandidate(
  role: AssignmentRole,
  status: AssignmentStatus,
): boolean {
  return role === "CANDIDATE" && status === "ACTIVE";
}

export function isActiveTenant(
  role: AssignmentRole,
  status: AssignmentStatus,
): boolean {
  return role === "TENANT" && status === "ACTIVE";
}

/** Several candidates OK; only one active tenant per listing. */
export function canActivateTenant(input: {
  existingActiveTenantCount: number;
}): boolean {
  return input.existingActiveTenantCount === 0;
}
