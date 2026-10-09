import { listFeaturedPublic } from "@/lib/listings/public-query";
import { ListingCard } from "@/components/listing-card";

export async function FeaturedListings() {
  const items = await listFeaturedPublic(4);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16">
      <h2 className="text-2xl font-semibold tracking-tight">À la une</h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Dernières annonces publiées.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {items.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
