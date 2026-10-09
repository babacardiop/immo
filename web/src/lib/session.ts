import { auth } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

const AGENT_ROLES: UserRole[] = ["AGENT", "MODERATOR", "ADMIN", "GER"];

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

export function isModeratorOrAbove(role: UserRole) {
  return role === "MODERATOR" || role === "ADMIN" || role === "GER";
}
