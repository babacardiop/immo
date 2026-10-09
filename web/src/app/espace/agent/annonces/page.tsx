import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PaperBadge } from "@/components/paper-badge";
import { isModeratorOrAbove } from "@/lib/session";
import { listingPath } from "@/lib/listings/slug";
import { isSaleLike } from "@/lib/listings/paper";

export default async function AnnoncesListPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const where = isModeratorOrAbove(session.user.role)
    ? {}
    : { agentId: session.user.id };

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      media: {
        where: { kind: "PHOTO" },
        orderBy: { sortOrder: "asc" },
        take: 1,
      },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Annonces</h1>
        <Link
          href="/espace/agent/annonces/nouveau"
          className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
        >
          Nouveau
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="text-[var(--color-muted)]">
          Aucune annonce. Créez votre premier brouillon.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-steel)]/40 border-y border-[var(--color-steel)]/40">
          {listings.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <Link
                  href={listingPath(l.slug ?? l.id)}
                  className="font-medium hover:underline"
                >
                  {l.title}
                </Link>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {l.reference} · {l.city} · {l.status}
                  {l.priceFcfa != null
                    ? ` · ${l.priceFcfa.toLocaleString("fr-FR")} FCFA`
                    : ""}
                </p>
              </div>
              {isSaleLike(l.transaction) ? (
                <PaperBadge type={l.paperType} />
              ) : (
                <span className="text-xs text-[var(--color-muted)]">Location</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
