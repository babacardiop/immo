import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";
import { listingsForVisitPicker } from "@/lib/leads/listings-for-picker";
import { ScheduleVisitForm } from "@/components/leads/schedule-visit-form";
import { FieldVisitForm } from "@/components/leads/field-visit-form";
import { CloseVisitForm } from "@/components/leads/close-visit-form";
import {
  VISIT_SOURCE_LABELS,
  VISIT_STATUS_LABELS,
} from "@/lib/leads/visit-labels";
import { VISIT_OUTCOME_LABELS } from "@/lib/leads/visit-outcome";

export default async function AgentVisitesPage() {
  const agent = await requireAgent();
  const staff = isModeratorOrAbove(agent.role);
  const listings = await listingsForVisitPicker({
    agentId: agent.id,
    staff,
  });

  const where = staff
    ? { OR: [{ conductedById: agent.id }, { status: "SCHEDULED" as const }] }
    : { conductedById: agent.id };

  const [scheduled, recentClosed] = await Promise.all([
    prisma.visitReport.findMany({
      where: { ...where, status: "SCHEDULED" },
      orderBy: { scheduledAt: "asc" },
      take: 40,
      include: {
        lead: { select: { id: true, name: true, phone: true } },
        listing: { select: { id: true, title: true, slug: true, reference: true } },
        conductedBy: { select: { name: true, email: true } },
      },
    }),
    prisma.visitReport.findMany({
      where: { ...where, status: "COMPLETED" },
      orderBy: { conductedAt: "desc" },
      take: 20,
      include: {
        lead: { select: { id: true, name: true, phone: true } },
        listing: { select: { id: true, title: true, reference: true } },
        conductedBy: { select: { name: true, email: true } },
      },
    }),
  ]);

  const now = Date.now();

  return (
    <main className="max-w-3xl">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold tracking-tight">
          Visites
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Tout est loggé : prospect (nom + tél) + bien visité. Si un autre bien
          a été montré sur le terrain, on le consigne ici.
        </p>
      </header>

      <section className="mb-10 rounded-[var(--radius-card)] border border-[var(--color-ink)]/15 bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-semibold">Consigner une visite terrain</h2>
        <p className="mt-1 mb-4 text-sm text-[var(--color-muted)]">
          Cherchez le prospect (nom / tél), ou + s’il n’existe pas encore — puis
          le bien vu et l’outcome.
        </p>
        <FieldVisitForm listings={listings} />
      </section>

      <section className="mb-10 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-semibold">Planifier une visite</h2>
        <p className="mt-1 mb-4 text-sm text-[var(--color-muted)]">
          RDV prévu (offline / tel / WhatsApp) — à clôturer après.
        </p>
        <ScheduleVisitForm listings={listings} />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold">
          À clôturer ({scheduled.length})
        </h2>
        {scheduled.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Aucune visite prévue.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {scheduled.map((v) => {
              const when = v.scheduledAt ?? v.createdAt;
              const overdue = when.getTime() < now;
              return (
                <li
                  key={v.id}
                  className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] px-4 py-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">
                        {v.lead.name ?? "Sans nom"} · {v.lead.phone}
                      </p>
                      <p className="text-sm text-[var(--color-muted)]">
                        {when.toLocaleString("fr-FR")}
                        {overdue ? " · en retard" : ""} ·{" "}
                        {VISIT_SOURCE_LABELS[v.source]} ·{" "}
                        {VISIT_STATUS_LABELS[v.status]}
                      </p>
                      <p className="text-sm font-medium">
                        Bien :{" "}
                        {v.listing
                          ? `${v.listing.title}${v.listing.reference ? ` · ${v.listing.reference}` : ""}`
                          : "à préciser à la clôture"}
                      </p>
                      <p className="text-xs text-[var(--color-muted)]">
                        Agent : {v.conductedBy.name ?? v.conductedBy.email}
                      </p>
                    </div>
                    <Link
                      href={`/espace/agent/leads/${v.lead.id}`}
                      className="text-sm text-[var(--color-olive)] hover:underline"
                    >
                      Lead →
                    </Link>
                  </div>
                  {v.agentNotes ? (
                    <p className="mt-2 whitespace-pre-wrap text-sm">
                      {v.agentNotes}
                    </p>
                  ) : null}
                  <div className="mt-3">
                    <CloseVisitForm
                      visitId={v.id}
                      listings={listings}
                      defaultListingId={v.listingId}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">
          Journal prospect ↔ biens
        </h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Qui a visité quoi — dernières clôtures.
        </p>
        {recentClosed.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Aucune clôture récente.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {recentClosed.map((v) => (
              <li
                key={v.id}
                className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/20 px-3 py-2"
              >
                <p className="font-medium">
                  <Link
                    href={`/espace/agent/leads/${v.lead.id}`}
                    className="hover:underline"
                  >
                    {v.lead.name ?? "Sans nom"}
                  </Link>{" "}
                  · {v.lead.phone}
                </p>
                <p>
                  Bien :{" "}
                  <strong>
                    {v.listing
                      ? `${v.listing.title}${v.listing.reference ? ` · ${v.listing.reference}` : ""}`
                      : "—"}
                  </strong>
                </p>
                <p className="text-[var(--color-muted)]">
                  {v.conductedAt
                    ? new Date(v.conductedAt).toLocaleString("fr-FR")
                    : "—"}
                  {v.outcome ? ` · ${VISIT_OUTCOME_LABELS[v.outcome]}` : ""} ·{" "}
                  {VISIT_SOURCE_LABELS[v.source]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
