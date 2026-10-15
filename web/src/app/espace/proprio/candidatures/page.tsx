import Link from "next/link";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProprioCandidaturesPage() {
  const user = await requireUser();

  const landlordListings = await prisma.propertyAssignment.findMany({
    where: {
      userId: user.id,
      role: { in: ["LANDLORD", "CO_LANDLORD"] },
      status: "ACTIVE",
    },
    select: { listingId: true },
  });
  const listingIds = landlordListings.map((l) => l.listingId);

  const apps =
    listingIds.length === 0
      ? []
      : await prisma.rentalApplication.findMany({
          where: { listingId: { in: listingIds } },
          orderBy: { updatedAt: "desc" },
          include: {
            listing: { select: { title: true } },
            user: { select: { name: true } },
          },
        });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        Candidatures
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Métadonnées uniquement — les fichiers restent chez EverGreen.
      </p>
      {apps.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Aucune candidature — partagez votre annonce.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[var(--color-steel)]/25">
          {apps.map((a) => (
            <li key={a.id} className="py-3">
              <Link
                href={`/espace/proprio/candidatures/${a.id}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {a.user.name ?? "Candidat"} — {a.listing.title}
              </Link>
              <p className="text-xs text-[var(--color-muted)]">
                {a.status} · dossier {a.completenessPct}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
