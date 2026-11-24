import Link from "next/link";
import { prismaLab } from "@/lib/db";
import { formatPhone } from "@/lib/privacy/phone";

export const metadata = { title: "Vendeurs" };
export const dynamic = "force-dynamic";

type Row = {
  phone: string;
  ads: number;
  sources: string[];
  names: string[];
  quartiers: string[];
  sale: number;
  rent: number;
  last_seen: Date;
};

/** Owners grouped by normalised phone, across sources. Lab-only data. */
export default async function VendeursPage() {
  const rows = await prismaLab.$queryRaw<Row[]>`
    select l."sellerPhone" as phone,
           count(*)::int as ads,
           array_agg(distinct s.name) as sources,
           array_remove(array_agg(distinct l."agencyName"), null) as names,
           (array_remove(array_agg(distinct initcap(trim(split_part(l."locationRaw", ',', 1)))), null))[1:6] as quartiers,
           count(*) filter (where l.transaction = 'SALE')::int as sale,
           count(*) filter (where l.transaction = 'RENT')::int as rent,
           max(l."lastSeenAt") as last_seen
    from "ListingRaw" l join "Source" s on s.id = l."sourceId"
    where l."sellerPhone" is not null and l."removedAt" is null
    group by l."sellerPhone"
    order by count(*) desc, max(l."lastSeenAt") desc
    limit 200`;
  const [withPhone, total] = await Promise.all([
    prismaLab.listingRaw.count({ where: { sellerPhone: { not: null } } }),
    prismaLab.listingRaw.count(),
  ]);
  const multiSource = rows.filter((r) => r.sources.length > 1).length;

  return (
    <div>
      <h1 className="text-2xl font-bold">Vendeurs</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {rows.length} numéros · {withPhone}/{total} annonces avec téléphone · {multiSource} vendeurs présents sur plusieurs
        sites. Données internes au Lab — ne jamais exporter vers le hub ni republier.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[var(--color-surface)]">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase text-[var(--color-muted)]">
            <tr>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Noms affichés</th>
              <th className="px-4 py-3 text-right">Annonces</th>
              <th className="px-4 py-3">Vente / Loc.</th>
              <th className="px-4 py-3">Sites</th>
              <th className="px-4 py-3">Quartiers</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.phone} className="border-t border-[var(--color-steel)]/20 align-top">
                <td className="whitespace-nowrap px-4 py-2 font-medium tabular-nums">
                  <Link href={`/annonces?tel=${r.phone}`} className="hover:underline">
                    {formatPhone(r.phone)}
                  </Link>
                </td>
                <td className="px-4 py-2">{r.names.slice(0, 3).join(" · ") || "—"}</td>
                <td className="px-4 py-2 text-right tabular-nums">{r.ads}</td>
                <td className="px-4 py-2 tabular-nums">
                  {r.sale} / {r.rent}
                </td>
                <td className="px-4 py-2">{r.sources.join(", ")}</td>
                <td className="px-4 py-2 text-xs text-[var(--color-muted)]">{r.quartiers.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
