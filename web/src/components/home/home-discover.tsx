import Image from "next/image";
import Link from "next/link";

export function HomeDiscover() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
            Catalogue
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Filtrez par quartier, type et papier.
          </h2>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">
            La carte du catalogue montre les annonces géolocalisées publiées.
            Cherchez à proximité — ou parvenez directement à une fiche claire.
          </p>
          <Link
            href="/acheter"
            className="mt-8 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
          >
            Ouvrir le catalogue →
          </Link>
        </div>
        <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:order-2">
          <Image
            src="/images/discover-photo.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
