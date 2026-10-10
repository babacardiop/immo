import Image from "next/image";
import Link from "next/link";

export function HomeDiscover() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src="/images/map-discover.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]">
            Maison de rêve
          </span>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Découvrez des biens au meilleur rapport
          </h2>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">
            Filtrez par quartier, type et papier. La carte du catalogue montre
            les annonces géolocalisées publiées.
          </p>
          <Link
            href="/acheter"
            className="mt-8 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
          >
            Trouver des biens proches →
          </Link>
        </div>
      </div>
    </section>
  );
}
