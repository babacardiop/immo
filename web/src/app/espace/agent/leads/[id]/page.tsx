import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { canAccessLead } from "@/lib/leads/acl";
import { isLeadOverdue } from "@/lib/leads/sla";
import { LEAD_STAGE_LABELS } from "@/lib/leads/labels";
import { SlaBadge, StageBadge } from "@/components/lead-pipeline";
import { LeadDetailControls } from "@/components/lead-detail-controls";

export default async function AgentLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAgent();

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      listing: { select: { title: true, slug: true } },
      assignee: { select: { name: true, email: true } },
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
            <p className="mt-1 text-sm">
              Bien : {lead.listing.title}
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
