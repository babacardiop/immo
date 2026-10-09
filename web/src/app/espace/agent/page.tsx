import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AgentHomePage() {
  const session = await auth();
  const counts = session?.user?.id
    ? await prisma.listing.groupBy({
        by: ["status"],
        where: { agentId: session.user.id },
        _count: true,
      })
    : [];

  const byStatus = Object.fromEntries(
    counts.map((c) => [c.status, c._count]),
  ) as Record<string, number>;

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Espace agent</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Bonjour {session?.user?.email} · rôle {session?.user?.role}
      </p>

      <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 text-sm">
        <div>
          <dt className="text-[var(--color-muted)]">Brouillons</dt>
          <dd className="text-2xl font-semibold">{byStatus.DRAFT ?? 0}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-muted)]">Publiés</dt>
          <dd className="text-2xl font-semibold">{byStatus.PUBLISHED ?? 0}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-muted)]">Archivés</dt>
          <dd className="text-2xl font-semibold">{byStatus.ARCHIVED ?? 0}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/espace/agent/annonces/nouveau"
          className="inline-flex rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
        >
          Nouvelle annonce
        </Link>
        <Link
          href="/espace/agent/annonces"
          className="inline-flex rounded-md bg-[var(--color-sage)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
        >
          Voir mes annonces
        </Link>
      </div>
    </div>
  );
}
