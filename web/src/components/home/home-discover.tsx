import Image from "next/image";
import Link from "next/link";

export function HomeDiscover() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src="/images/discover-photo.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
            Catalogue
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
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
