import Link from "next/link";
import { requireAgent } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AgentCandidaturesPage() {
  await requireAgent();
  const apps = await prisma.rentalApplication.findMany({
    orderBy: { updatedAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true, email: true } },
      listing: { select: { title: true, slug: true, reference: true } },
    },
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        Candidatures
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Revue staff — documents vault visibles ici uniquement.
      </p>

      {apps.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Aucune candidature pour l’instant.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[var(--color-steel)]/25">
          {apps.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div>
                <Link
                  href={`/espace/agent/candidatures/${a.id}`}
                  className="font-medium text-[var(--color-ink)] underline-offset-2 hover:underline"
                >
                  {a.user.name ?? a.user.email}
                </Link>
                <p className="text-xs text-[var(--color-muted)]">
                  {a.listing.title} · {a.status} · {a.completenessPct}%
                </p>
              </div>
              <span className="rounded-full bg-[var(--color-sage)]/30 px-2.5 py-0.5 text-xs font-medium">
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
