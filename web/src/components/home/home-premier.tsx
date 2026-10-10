import Link from "next/link";
import { listFeaturedPublic } from "@/lib/listings/public-query";
import { ListingCard } from "@/components/listing-card";

const FALLBACK = [
  "/images/listing-01.jpg",
  "/images/listing-02.jpg",
  "/images/listing-03.jpg",
  "/images/listing-04.jpg",
  "/images/listing-05.jpg",
  "/images/listing-06.jpg",
];

export async function HomePremier() {
  const items = await listFeaturedPublic(6);

  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
              Sélection
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Biens phares
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--color-muted)]">
              Critères clairs, contact direct — stock agence publié.
            </p>
          </div>
          <Link
            href="/acheter"
            className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
          >
            Voir tous les biens →
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FALLBACK.map((src, i) => (
              <Link
                key={src}
                href="/acheter"
                className="group overflow-hidden rounded-[var(--radius-card)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <p className="mt-3 text-sm font-medium">Bien curated #{i + 1}</p>
                <p className="text-xs text-[var(--color-muted)]">
                  Voir le catalogue →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
