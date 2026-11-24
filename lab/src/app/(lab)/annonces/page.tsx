import Link from "next/link";
import { prismaLab } from "@/lib/db";
import { formatPhone, normalizePhone } from "@/lib/privacy/phone";

export const metadata = { title: "Annonces brutes" };
export const dynamic = "force-dynamic";

export default async function AnnoncesPage({
  searchParams,
}: {
  searchParams: Promise<{ tel?: string; source?: string }>;
}) {
  const sp = await searchParams;
  const tel = normalizePhone(sp.tel);
  const where = {
    ...(tel ? { sellerPhone: tel } : {}),
    ...(sp.source ? { source: { slug: sp.source } } : {}),
  };
  const [total, latest, sources] = await Promise.all([
    prismaLab.listingRaw.count({ where }),
    prismaLab.listingRaw.findMany({
      where,
      orderBy: { lastSeenAt: "desc" },
      take: 100,
      select: {
        id: true,
        title: true,
        url: true,
        transaction: true,
        propertyType: true,
        priceXof: true,
        surfaceM2: true,
        bedrooms: true,
        bathrooms: true,
        locationRaw: true,
        agencyName: true,
        sellerPhone: true,
        photoCount: true,
        detailFetchedAt: true,
        source: { select: { name: true } },
      },
    }),
    prismaLab.source.findMany({ where: { listings: { some: {} } }, select: { slug: true, name: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Annonces brutes</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {total} annonces{tel ? ` pour ${formatPhone(tel)}` : ""}. Usage interne uniquement — pas de republication.
      </p>
      <nav className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href="/annonces" className={!sp.source && !tel ? "font-semibold" : "text-[var(--color-muted)]"}>
          Toutes
        </Link>
        {sources.map((s) => (
          <Link
            key={s.slug}
            href={`/annonces?source=${s.slug}`}
            className={sp.source === s.slug ? "font-semibold" : "text-[var(--color-muted)]"}
          >
            {s.name}
          </Link>
        ))}
      </nav>
      {total === 0 ? (
        <p className="mt-8 rounded-2xl bg-[var(--color-surface)] p-6 text-sm">Aucune annonce.</p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--color-steel)]/20 rounded-2xl bg-[var(--color-surface)]">
          {latest.map((l) => (
            <li key={l.id} className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:justify-between">
              <div className="min-w-0">
                <a href={l.url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                  {l.title ?? l.url}
                </a>
                <div className="text-xs text-[var(--color-muted)]">
                  {l.source.name} · {l.transaction === "SALE" ? "Vente" : l.transaction === "RENT" ? "Location" : "?"} ·{" "}
                  {l.propertyType ?? "?"} · {l.locationRaw ?? "lieu ?"}
                  {l.bedrooms ? ` · ${l.bedrooms} ch.` : ""}
                  {l.bathrooms ? ` · ${l.bathrooms} sdb` : ""}
                  {l.surfaceM2 ? ` · ${l.surfaceM2} m²` : ""}
                  {l.photoCount ? ` · ${l.photoCount} photos` : ""}
                  {l.detailFetchedAt ? "" : " · détail non lu"}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="tabular-nums">{l.priceXof ? `${l.priceXof.toLocaleString("fr-FR")} FCFA` : "prix ?"}</div>
                <div className="text-xs text-[var(--color-muted)]">
                  {l.agencyName ?? ""}{" "}
                  {l.sellerPhone ? (
                    <Link href={`/annonces?tel=${l.sellerPhone}`} className="tabular-nums hover:underline">
                      {formatPhone(l.sellerPhone)}
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
