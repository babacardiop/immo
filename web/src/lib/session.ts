import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";
import { AGENT_ROLES, isModeratorOrAbove } from "@/lib/roles";

export { isModeratorOrAbove };

export async function requireAgent() {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    throw new Error("UNAUTHORIZED");
  }
  if (!AGENT_ROLES.includes(session.user.role)) {
    throw new Error("FORBIDDEN");
  }
  return session.user;
}

export async function requireClient() {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    throw new Error("UNAUTHORIZED");
  }
  if (session.user.role !== "CLIENT" && session.user.role !== "LANDLORD") {
    throw new Error("FORBIDDEN");
  }
  return session.user;
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    throw new Error("UNAUTHORIZED");
  }
  return session.user;
}

export function isStaffRole(role: UserRole) {
  return AGENT_ROLES.includes(role);
}
