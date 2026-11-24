import { prismaLab } from "@/lib/db";

export const metadata = { title: "Marché" };
export const dynamic = "force-dynamic";

type Row = {
  quartier: string;
  transaction: string;
  property_type: string | null;
  n: number;
  median_price: number | null;
  median_m2: number | null;
  n_m2: number;
};

const MIN_N = 5;
const fmt = (v: number | null) => (v == null ? "—" : Math.round(v).toLocaleString("fr-FR"));

/**
 * S2.7 mini report: medians by neighbourhood (first part of the ad location),
 * transaction and type. Raw ads, no dedup yet (S3) — indicative only, internal.
 */
export default async function MarchePage() {
  const rows = await prismaLab.$queryRaw<Row[]>`
    select
      initcap(trim(split_part("locationRaw", ',', 1))) as quartier,
      "transaction"::text as transaction,
      "propertyType" as property_type,
      count(*)::int as n,
      percentile_cont(0.5) within group (order by "priceXof")::float as median_price,
      percentile_cont(0.5) within group (order by ("priceXof"::float / nullif("surfaceM2", 0)))
        filter (where "surfaceM2" > 0)::float as median_m2,
      count(*) filter (where "surfaceM2" > 0)::int as n_m2
    from "ListingRaw"
    where "priceXof" is not null and "removedAt" is null and "locationRaw" is not null
    group by 1, 2, 3
    having count(*) >= ${MIN_N}
    order by n desc
    limit 60`;

  const [total, priced, runs] = await Promise.all([
    prismaLab.listingRaw.count(),
    prismaLab.listingRaw.count({ where: { priceXof: { not: null } } }),
    prismaLab.ingestRun.findMany({
      orderBy: { startedAt: "desc" },
      take: 5,
      include: { source: { select: { name: true } } },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Marché — médianes brutes</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {total} annonces · {priced} avec prix. Groupes d’au moins {MIN_N} annonces. Pas encore de
        dédoublonnage multi-sources (S3) : indicatif, usage interne.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-[var(--color-surface)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase text-[var(--color-muted)]">
            <tr>
              <th className="px-4 py-3">Quartier</th>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Annonces</th>
              <th className="px-4 py-3 text-right">Prix médian (FCFA)</th>
              <th className="px-4 py-3 text-right">FCFA / m² médian</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-[var(--color-muted)]">
                  Pas encore assez d’annonces par groupe.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={`${r.quartier}-${r.transaction}-${r.property_type}`} className="border-t border-[var(--color-steel)]/20">
                  <td className="px-4 py-2 font-medium">{r.quartier}</td>
                  <td className="px-4 py-2">{r.transaction === "SALE" ? "Vente" : r.transaction === "RENT" ? "Location" : "?"}</td>
                  <td className="px-4 py-2">{r.property_type ?? "—"}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{r.n}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{fmt(r.median_price)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {r.n_m2 >= MIN_N ? fmt(r.median_m2) : <span className="text-[var(--color-muted)]">n={r.n_m2}</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Dernières collectes</h2>
      <ul className="mt-3 divide-y divide-[var(--color-steel)]/20 rounded-2xl bg-[var(--color-surface)] text-sm">
        {runs.map((r) => (
          <li key={r.id} className="flex flex-wrap justify-between gap-2 px-4 py-3">
            <span>
              {r.source.name} · {r.startedAt.toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })}
            </span>
            <span className="text-[var(--color-muted)]">
              {r.status} · {r.fetched} pages · +{r.inserted} · {r.updated} modifiées{r.notes ? ` · ${r.notes}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
