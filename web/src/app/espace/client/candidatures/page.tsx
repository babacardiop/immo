import Link from "next/link";
import { requireClient } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function MesCandidaturesPage() {
  const user = await requireClient();

  const [apps, candidateAssignments] = await Promise.all([
    prisma.rentalApplication.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        listing: { select: { title: true } },
      },
    }),
    prisma.propertyAssignment.findMany({
      where: {
        userId: user.id,
        role: "CANDIDATE",
        status: "ACTIVE",
      },
      include: {
        listing: { select: { id: true, title: true } },
      },
    }),
  ]);

  const appListingIds = new Set(apps.map((a) => a.listingId));
  const pendingAssign = candidateAssignments.filter(
    (a) => !appListingIds.has(a.listingId),
  );

  return (
    <div>
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        Mes candidatures
      </h1>
      {apps.length === 0 && pendingAssign.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          Aucune candidature — un agent doit d’abord vous assigner un bien en
          candidat.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[var(--color-steel)]/25">
          {pendingAssign.map((a) => (
            <li key={a.id} className="py-3">
              <Link
                href={`/espace/client/candidatures/start/${a.listingId}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {a.listing.title}
              </Link>
              <p className="text-xs text-[var(--color-muted)]">
                Assignation candidat — démarrer le dossier
              </p>
            </li>
          ))}
          {apps.map((a) => (
            <li key={a.id} className="py-3">
              <Link
                href={`/espace/client/candidatures/${a.id}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {a.listing.title}
              </Link>
              <p className="text-xs text-[var(--color-muted)]">
                {a.status} · {a.completenessPct}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
