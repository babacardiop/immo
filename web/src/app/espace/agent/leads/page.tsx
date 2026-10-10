import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/session";
import { isModeratorOrAbove } from "@/lib/roles";
import { LeadPipeline } from "@/components/lead-pipeline";

export const metadata = { title: "Leads" };

export default async function AgentLeadsPage() {
  const user = await requireAgent();
  const elevated = isModeratorOrAbove(user.role);

  const leads = await prisma.lead.findMany({
    where: elevated ? undefined : { assigneeId: user.id },
    orderBy: [{ stage: "asc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      listing: { select: { title: true, slug: true } },
    },
  });

  const overdueCount = leads.filter(
    (l) =>
      l.stage === "NEW" &&
      !l.firstTouchAt &&
      l.slaDueAt &&
      l.slaDueAt.getTime() < Date.now(),
  ).length;

  return (
    <main>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            File assignée · SLA 24 h sur les nouveaux
          </p>
        </div>
        {overdueCount > 0 ? (
          <p className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            SLA : {overdueCount} en retard
          </p>
        ) : null}
      </div>
      <LeadPipeline leads={leads} />
    </main>
  );
}
