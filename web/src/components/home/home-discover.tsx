import Image from "next/image";
import Link from "next/link";

/** DS-10 discover map split — photo + pin chrome (FR) */
export function HomeDiscover() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-surface)] shadow-sm">
          <Image
            src="/images/discover-photo.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--color-sage)] bg-white shadow-md">
                <span className="text-xl" aria-hidden>
                  🏠
                </span>
              </span>
              <span className="rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink)] shadow">
                Maison de rêve
              </span>
            </div>
          </div>
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
            Trouver les biens proches →
          </Link>
        </div>
      </div>
    </section>
  );
}
