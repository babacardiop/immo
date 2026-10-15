import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  VISIT_SOURCE_LABELS,
} from "@/lib/leads/visit-labels";

export default async function AgentHomePage() {
  const session = await auth();
  const agentId = session?.user?.id;

  const counts = agentId
    ? await prisma.listing.groupBy({
        by: ["status"],
        where: { agentId },
        _count: true,
      })
    : [];

  const byStatus = Object.fromEntries(
    counts.map((c) => [c.status, c._count]),
  ) as Record<string, number>;

  const published = byStatus.PUBLISHED ?? 0;
  const drafts = byStatus.DRAFT ?? 0;
  const archived = byStatus.ARCHIVED ?? 0;

  const upcomingVisits = agentId
    ? await prisma.visitReport.findMany({
        where: { conductedById: agentId, status: "SCHEDULED" },
        orderBy: { scheduledAt: "asc" },
        take: 5,
        include: {
          lead: { select: { id: true, name: true, phone: true } },
          listing: { select: { title: true } },
        },
      })
    : [];

  const scheduledCount = agentId
    ? await prisma.visitReport.count({
        where: { conductedById: agentId, status: "SCHEDULED" },
      })
    : 0;

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

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
          <dt className="text-sm text-[var(--color-muted)]">Visites à clôturer</dt>
          <dd className="mt-1 text-3xl font-semibold tabular-nums">
            {scheduledCount}
          </dd>
        </div>
      </dl>

      <section className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Prochaines visites</h2>
          <Link
            href="/espace/agent/visites"
            className="text-sm font-medium text-[var(--color-olive)] hover:underline"
          >
            Gérer les visites →
          </Link>
        </div>
        {upcomingVisits.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Aucune visite prévue.{" "}
            <Link
              href="/espace/agent/visites"
              className="text-[var(--color-olive)] hover:underline"
            >
              Logger une visite offline
            </Link>
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {upcomingVisits.map((v) => (
              <li
                key={v.id}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-steel)]/15 py-2 last:border-0"
              >
                <div>
                  <span className="font-medium">
                    {v.lead.name ?? "Sans nom"}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {" "}
                    · {v.lead.phone} · {VISIT_SOURCE_LABELS[v.source]}
                  </span>
                  {v.listing ? (
                    <span className="text-[var(--color-muted)]">
                      {" "}
                      · {v.listing.title}
                    </span>
                  ) : null}
                </div>
                <time className="tabular-nums text-[var(--color-muted)]">
                  {(v.scheduledAt ?? v.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/espace/agent/visites"
          className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Logger / clôturer une visite
        </Link>
        <Link
          href="/espace/agent/annonces/nouveau"
          className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
        >
          Nouvelle annonce
        </Link>
        <Link
          href="/espace/agent/annonces"
          className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
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
