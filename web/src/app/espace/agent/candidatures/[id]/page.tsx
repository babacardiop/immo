import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAgent } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ReviewActions } from "@/components/applications/review-actions";
import { parseRequirementItems } from "@/lib/applications/requirements";

export default async function AgentCandidatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAgent();
  const { id } = await params;
  const app = await prisma.rentalApplication.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      listing: { select: { title: true, id: true } },
      documents: true,
    },
  });
  if (!app) notFound();

  const reqSet = await prisma.applicationRequirementSet.findFirst({
    where: { listingId: app.listingId, active: true },
  });
  const items = reqSet ? parseRequirementItems(reqSet.itemsJson) : [];
  const labelByCode = Object.fromEntries(items.map((i) => [i.code, i.label]));

  return (
    <div>
      <Link
        href="/espace/agent/candidatures"
        className="text-sm text-[var(--color-muted)] hover:underline"
      >
        ← Candidatures
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        {app.user.name ?? app.user.email}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {app.listing.title} · {app.status} · complétude {app.completenessPct}%
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Documents (vault)
        </h2>
        {app.documents.length === 0 ? (
          <p className="mt-2 text-sm">Aucun document.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {app.documents.map((d) => (
              <li key={d.id}>
                <a
                  href={`/api/espace/application-docs/${d.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[var(--color-leaf)] underline"
                >
                  {labelByCode[d.requirementCode] ?? d.requirementCode}
                </a>
                <span className="ml-2 text-xs text-[var(--color-muted)]">
                  {d.mimeType}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Décision
        </h2>
        <div className="mt-3">
          <ReviewActions applicationId={app.id} showDocLinks />
        </div>
      </section>
    </div>
  );
}
