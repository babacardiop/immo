import Link from "next/link";
import { notFound } from "next/navigation";
import { requireClient } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { CandidatureForm } from "@/components/applications/candidature-form";
import { parseRequirementItems } from "@/lib/applications/requirements";

export default async function ClientCandidatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireClient();
  const { id } = await params;
  const app = await prisma.rentalApplication.findUnique({
    where: { id },
    include: {
      listing: { select: { title: true } },
      documents: true,
    },
  });
  if (!app || app.userId !== user.id) notFound();

  const reqSet = await prisma.applicationRequirementSet.findFirst({
    where: { listingId: app.listingId, active: true },
  });
  const requirements = reqSet ? parseRequirementItems(reqSet.itemsJson) : [];

  const editable = ["DRAFT", "SUBMITTED"].includes(app.status) ||
    app.status === "UNDER_REVIEW";

  return (
    <div>
      <Link
        href="/espace/client/candidatures"
        className="text-sm text-[var(--color-muted)] hover:underline"
      >
        ← Mes candidatures
      </Link>

      {app.status === "ACCEPTED" ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm">
          Candidature <strong>acceptée</strong> — portail locataire débloqué pour
          ce bien.
        </div>
      ) : null}

      {editable && app.status !== "ACCEPTED" ? (
        <div className="mt-6">
          <CandidatureForm
            applicationId={app.id}
            listingTitle={app.listing.title}
            requirements={requirements}
            uploadedCodes={app.documents.map((d) => d.requirementCode)}
            completenessPct={app.completenessPct}
          />
        </div>
      ) : (
        <p className="mt-6 text-sm">
          Statut : <strong>{app.status}</strong> · complétude{" "}
          {app.completenessPct}%
        </p>
      )}
    </div>
  );
}
