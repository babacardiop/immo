import Link from "next/link";
import type { Lead, LeadStage } from "@prisma/client";
import { isLeadOverdue } from "@/lib/leads/sla";
import { LEAD_STAGE_LABELS } from "@/lib/leads/labels";

export type LeadRow = Pick<
  Lead,
  | "id"
  | "name"
  | "phone"
  | "email"
  | "stage"
  | "intent"
  | "createdAt"
  | "slaDueAt"
  | "firstTouchAt"
  | "sourceDetail"
> & {
  listing?: { title: string; slug: string | null } | null;
};

export function LeadPipeline({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)]">
        Aucun lead pour le moment.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-steel)]/30">
      {leads.map((lead) => {
        const overdue = isLeadOverdue({
          stage: lead.stage,
          slaDueAt: lead.slaDueAt,
          firstTouchAt: lead.firstTouchAt,
        });
        return (
          <li key={lead.id} className="flex flex-wrap items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <Link
                href={`/espace/agent/leads/${lead.id}`}
                className="font-medium hover:text-[var(--color-olive)]"
              >
                {lead.name ?? "Sans nom"}
              </Link>
              <p className="text-sm text-[var(--color-muted)]">
                {lead.phone}
                {lead.intent ? ` · ${lead.intent}` : ""}
                {lead.listing?.title ? ` · ${lead.listing.title}` : ""}
              </p>
            </div>
            <StageBadge stage={lead.stage} />
            {overdue ? <SlaBadge /> : null}
          </li>
        );
      })}
    </ul>
  );
}

export function StageBadge({ stage }: { stage: LeadStage }) {
  return (
    <span
      data-testid="lead-stage"
      className="rounded-md bg-[var(--color-steel)]/20 px-2 py-1 text-xs font-medium"
    >
      {LEAD_STAGE_LABELS[stage]}
    </span>
  );
}

export function SlaBadge() {
  return (
    <span
      data-testid="sla-overdue"
      className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800"
    >
      SLA dépassé
    </span>
  );
}
