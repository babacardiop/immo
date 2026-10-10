import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-end px-6 pb-36 pt-28 sm:pb-40">
        <div className="flex flex-wrap gap-2">
          {["Maison", "Appartement", "Terrain"].map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] bg-white/95 px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="max-w-xl font-[family-name:var(--font-brand-serif)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Construisez votre avenir, un bien à la fois.
          </h1>
          <p className="max-w-md text-base text-white/90 sm:text-lg">
            Catalogue curated au Sénégal — papiers nommés, contact direct,
            accompagnement agence.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-t-[var(--radius-sheet)] bg-[var(--color-surface)] px-5 py-6 shadow-lg sm:px-8 sm:py-8">
          <h2 className="text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
            Trouver le meilleur bien
          </h2>
          <form
            action="/acheter"
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Type
              <select
                name="propertyType"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
                defaultValue=""
              >
                <option value="">Tous</option>
                <option value="LAND">Terrain</option>
                <option value="HOUSE">Maison</option>
                <option value="APARTMENT">Appartement</option>
                <option value="OFFICE">Bureau</option>
              </select>
            </label>
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Prix max
              <input
                name="priceMax"
                type="number"
                placeholder="FCFA"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
              />
            </label>
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Ville
              <input
                name="city"
                placeholder="Dakar…"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
              />
            </label>
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Quartier
              <input
                name="quartier"
                placeholder="Almadies…"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-[var(--color-bg)] hover:opacity-90"
              >
                Rechercher
              </button>
            </div>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--color-muted)]">Filtres :</span>
            {["Dakar", "Maison", "Terrain", "Appartement"].map((chip) => (
              <Link
                key={chip}
                href={
                  chip === "Dakar"
                    ? "/acheter?city=Dakar"
                    : chip === "Maison"
                      ? "/acheter?propertyType=HOUSE"
                      : chip === "Terrain"
                        ? "/acheter?propertyType=LAND"
                        : "/acheter?propertyType=APARTMENT"
                }
                className="rounded-[var(--radius-pill)] border border-[var(--color-steel)]/50 px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-leaf)]"
              >
                {chip}
              </Link>
            ))}
            <Link
              href="/acheter"
              className="ml-auto rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-2 text-xs font-medium text-[var(--color-bg)]"
            >
              Voir le catalogue →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
