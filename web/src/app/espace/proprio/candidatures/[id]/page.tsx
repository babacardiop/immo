import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ReviewActions } from "@/components/applications/review-actions";

export default async function ProprioCandidatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;

  const app = await prisma.rentalApplication.findUnique({
    where: { id },
    include: {
      listing: { select: { id: true, title: true, decisionMode: true } },
      user: { select: { name: true } },
    },
  });
  if (!app) notFound();

  const landlord = await prisma.propertyAssignment.findFirst({
    where: {
      listingId: app.listingId,
      userId: user.id,
      role: { in: ["LANDLORD", "CO_LANDLORD"] },
      status: "ACTIVE",
    },
  });
  if (!landlord) notFound();

  return (
    <div>
      <Link
        href="/espace/proprio/candidatures"
        className="text-sm text-[var(--color-muted)] hover:underline"
      >
        ← Candidatures
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        {app.user.name ?? "Candidat"}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {app.listing.title} · {app.status} · complétude {app.completenessPct}%
      </p>

      {app.agentSummary ? (
        <section className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-sage)]/15 px-4 py-3 text-sm">
          <h2 className="font-semibold">Synthèse EverGreen</h2>
          <p className="mt-1 whitespace-pre-wrap">{app.agentSummary}</p>
        </section>
      ) : (
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          Pas encore de synthèse agent.
        </p>
      )}

      {/* Intentionally no document links / download — vault staff-only */}
      <section className="mt-8">
        <ReviewActions applicationId={app.id} showDocLinks={false} />
      </section>
    </div>
  );
}
