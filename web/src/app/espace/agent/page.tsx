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

  const published = byStatus.PUBLISHED ?? 0;
  const drafts = byStatus.DRAFT ?? 0;
  const archived = byStatus.ARCHIVED ?? 0;

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Bonjour
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Voici un aperçu de votre activité · {session?.user?.email}
        </p>
      </header>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
          <dt className="text-sm text-[var(--color-muted)]">Annonces live</dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">
            {published}
          </dd>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
          <dt className="text-sm text-[var(--color-muted)]">Brouillons</dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">{drafts}</dd>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
          <dt className="text-sm text-[var(--color-muted)]">Archivés</dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">
            {archived}
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/espace/agent/annonces/nouveau"
          className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Nouvelle annonce
        </Link>
        <Link
          href="/espace/agent/annonces"
          className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
        >
          Voir mes annonces
        </Link>
        <Link
          href="/espace/agent/leads"
          className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
        >
          Mes leads
        </Link>
      </div>
    </div>
  );
}
