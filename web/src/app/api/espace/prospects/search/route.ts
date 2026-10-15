import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AGENT_ROLES, isModeratorOrAbove } from "@/lib/roles";
import type { ProspectSearchHit } from "@/lib/leads/prospect-search";

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  if (!AGENT_ROLES.includes(session.user.role)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  if (q.length < 2) {
    return NextResponse.json({ results: [] as ProspectSearchHit[] });
  }

  const staff = isModeratorOrAbove(session.user.role);
  const digits = digitsOnly(q);
  const or: Array<Record<string, unknown>> = [
    { name: { contains: q, mode: "insensitive" } },
  ];
  if (digits.length >= 2) {
    or.push({ phone: { contains: digits } });
  }
  // Also match phone as typed (spaces / dots)
  if (q !== digits && q.length >= 2) {
    or.push({ phone: { contains: q } });
  }

  const results = await prisma.lead.findMany({
    where: {
      AND: [
        staff
          ? {}
          : {
              OR: [
                { assigneeId: session.user.id },
                { assigneeId: null },
              ],
            },
        { OR: or },
      ],
    },
    orderBy: { updatedAt: "desc" },
    take: 12,
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
    },
  });

  return NextResponse.json({ results });
}
