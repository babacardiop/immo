import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { canAccessLead } from "@/lib/leads/acl";
import { isLeadOverdue } from "@/lib/leads/sla";
import { LEAD_STAGE_LABELS } from "@/lib/leads/labels";
import { isModeratorOrAbove } from "@/lib/roles";
import { listingsForVisitPicker } from "@/lib/leads/listings-for-picker";
import { SlaBadge, StageBadge } from "@/components/lead-pipeline";
import { LeadDetailControls } from "@/components/lead-detail-controls";
import { CreerCompteClientForm } from "@/components/users/creer-compte-client-form";
import { AssignationForm } from "@/components/assignments/assignation-form";
import { VisitReportForm } from "@/components/leads/visit-report-form";
import { ScheduleVisitForm } from "@/components/leads/schedule-visit-form";
import { FieldVisitForm } from "@/components/leads/field-visit-form";
import { CloseVisitForm } from "@/components/leads/close-visit-form";
import { VISIT_OUTCOME_LABELS } from "@/lib/leads/visit-outcome";
import {
  VISIT_SOURCE_LABELS,
  VISIT_STATUS_LABELS,
} from "@/lib/leads/visit-labels";

export default async function AgentLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAgent();
  const staff = isModeratorOrAbove(user.role);
  const listings = await listingsForVisitPicker({
    agentId: user.id,
    staff,
  });

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      listing: { select: { id: true, title: true, slug: true } },
      assignee: { select: { name: true, email: true } },
      convertedUser: { select: { id: true, email: true, name: true } },
      visitReports: {
        orderBy: [{ scheduledAt: "desc" }, { conductedAt: "desc" }],
        include: {
          conductedBy: { select: { name: true, email: true } },
          listing: {
            select: { id: true, title: true, reference: true },
          },
        },
      },
      events: {
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { actor: { select: { name: true, email: true } } },
      },
    },
  });

  if (!lead) notFound();
  if (
    !canAccessLead({
      assigneeId: lead.assigneeId,
      actorId: user.id,
      actorRole: user.role,
    })
  ) {
    notFound();
  }

  const overdue = isLeadOverdue({
    stage: lead.stage,
    slaDueAt: lead.slaDueAt,
    firstTouchAt: lead.firstTouchAt,
  });

  const biensVisites = Array.from(
    new Map(
      lead.visitReports
        .filter((v) => v.listing)
        .map((v) => [v.listing!.id, v.listing!]),
    ).values(),
  );

  return (
    <main className="max-w-3xl">
      <Link
        href="/espace/agent/leads"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-olive)]"
      >
        ← Leads
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {lead.name ?? "Sans nom"}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {lead.phone}
            {lead.email ? ` · ${lead.email}` : ""}
            {lead.intent ? ` · ${lead.intent}` : ""}
          </p>
          {lead.listing ? (
            <p className="mt-1 text-sm">Bien d’origine : {lead.listing.title}</p>
          ) : null}
          {biensVisites.length > 0 ? (
            <p className="mt-1 text-sm">
              Biens visités :{" "}
              {biensVisites
                .map(
                  (b) =>
                    `${b.title}${b.reference ? ` (${b.reference})` : ""}`,
                )
                .join(" · ")}
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <StageBadge stage={lead.stage} />
          {overdue ? <SlaBadge /> : null}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Actions</h2>
        <div className="mt-3">
          <LeadDetailControls leadId={lead.id} stage={lead.stage} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Visites</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Chaque visite = ce prospect + un bien. Un autre bien montré sur place
          = une nouvelle ligne.
        </p>
        {lead.visitReports.length > 0 ? (
          <ul className="mt-3 space-y-3 text-sm">
            {lead.visitReports.map((vr) => {
              const when = vr.conductedAt ?? vr.scheduledAt ?? vr.createdAt;
              return (
                <li
                  key={vr.id}
                  className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 px-3 py-2"
                >
                  <p className="font-medium">
                    {when.toLocaleString("fr-FR")} ·{" "}
                    {vr.conductedBy.name ?? vr.conductedBy.email}
                  </p>
                  <p className="font-medium">
                    Bien :{" "}
                    {vr.listing
                      ? `${vr.listing.title}${vr.listing.reference ? ` · ${vr.listing.reference}` : ""}`
                      : "à préciser"}
                  </p>
                  <p className="text-[var(--color-muted)]">
                    {VISIT_STATUS_LABELS[vr.status]} ·{" "}
                    {VISIT_SOURCE_LABELS[vr.source]}
                    {vr.outcome
                      ? ` · Suite : ${VISIT_OUTCOME_LABELS[vr.outcome]}`
                      : ""}
                    {vr.outcomeMotif ? ` — ${vr.outcomeMotif}` : ""}
                  </p>
                  {vr.agentNotes ? (
                    <p className="mt-1 whitespace-pre-wrap">{vr.agentNotes}</p>
                  ) : null}
                  {vr.status === "SCHEDULED" ? (
                    <div className="mt-3">
                      <CloseVisitForm
                        visitId={vr.id}
                        listings={listings}
                        defaultListingId={vr.listingId}
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Aucune visite loguée pour l’instant.
          </p>
        )}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">
              Autre bien visité (terrain)
            </h3>
            <FieldVisitForm
              listings={listings}
              leadId={lead.id}
              defaultName={lead.name ?? undefined}
              defaultPhone={lead.phone ?? ""}
              defaultEmail={lead.email ?? undefined}
            />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Planifier (offline)</h3>
            <ScheduleVisitForm
              listings={listings}
              leadId={lead.id}
              defaultName={lead.name ?? undefined}
              defaultPhone={lead.phone ?? ""}
              defaultListingId={lead.listingId ?? undefined}
            />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">
              Logger une visite déjà faite
            </h3>
            <VisitReportForm
              leadId={lead.id}
              listings={listings}
              defaultListingId={lead.listingId}
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Compte client (S08)</h2>
        {lead.convertedUser ? (
          <div className="mt-3 space-y-4 text-sm">
            <p>
              Compte : <strong>{lead.convertedUser.email}</strong> (
              {lead.convertedUser.id})
            </p>
            {lead.listing ? (
              <div>
                <p className="mb-2 text-[var(--color-muted)]">
                  Assigner ce client en <strong>candidat</strong> sur le bien :
                </p>
                <AssignationForm
                  listingId={lead.listing.id}
                  defaultUserId={lead.convertedUser.id}
                  defaultRole="CANDIDATE"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-3">
            <CreerCompteClientForm
              leadId={lead.id}
              defaultName={lead.name ?? undefined}
              defaultEmail={lead.email ?? undefined}
              defaultPhone={lead.phone ?? undefined}
            />
          </div>
        )}
      </section>

      {lead.message ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Message</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm">{lead.message}</p>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Historique</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {lead.events.map((ev) => (
            <li
              key={ev.id}
              className="border-l-2 border-[var(--color-steel)]/40 pl-3"
            >
              <p className="text-[var(--color-muted)]">
                {ev.createdAt.toLocaleString("fr-FR")}
                {ev.actor?.email ? ` · ${ev.actor.email}` : ""}
                {ev.type === "STAGE_CHANGE"
                  ? ` · ${ev.fromStage ? LEAD_STAGE_LABELS[ev.fromStage] : "—"} → ${ev.toStage ? LEAD_STAGE_LABELS[ev.toStage] : "—"}`
                  : ` · ${ev.type}`}
              </p>
              {ev.body ? <p className="mt-1">{ev.body}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
