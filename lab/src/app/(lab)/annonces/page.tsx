import { prismaLab } from "@/lib/db";

export const metadata = { title: "Annonces brutes" };
export const dynamic = "force-dynamic";

export default async function AnnoncesPage() {
  const [total, latest] = await Promise.all([
    prismaLab.listingRaw.count(),
    prismaLab.listingRaw.findMany({
      orderBy: { lastSeenAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        url: true,
        transaction: true,
        priceXof: true,
        surfaceM2: true,
        locationRaw: true,
        source: { select: { name: true } },
      },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Annonces brutes</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {total} annonces en base. Usage interne uniquement — pas de republication.
      </p>
      {total === 0 ? (
        <p className="mt-8 rounded-2xl bg-[var(--color-surface)] p-6 text-sm">
          Aucune annonce pour le moment. Le premier connecteur (sprint S2) remplira cette table.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[var(--color-steel)]/20 rounded-2xl bg-[var(--color-surface)]">
          {latest.map((l) => (
            <li key={l.id} className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm">
              <a href={l.url} target="_blank" rel="noreferrer" className="hover:underline">
                {l.title ?? l.url}
              </a>
              <span className="text-[var(--color-muted)]">
                {l.source.name} · {l.transaction} ·{" "}
                {l.priceXof ? `${l.priceXof.toLocaleString("fr-FR")} FCFA` : "prix ?"}
                {l.surfaceM2 ? ` · ${l.surfaceM2} m²` : ""} {l.locationRaw ? `· ${l.locationRaw}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
