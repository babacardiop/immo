import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-ink)]">
      <div className="relative min-h-[72vh] w-full sm:min-h-[78vh]">
        <Image
          src="/images/hero-photo.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-end px-6 pb-44 pt-24 sm:min-h-[78vh] sm:pb-48">
          <p className="text-sm font-medium tracking-wide text-white/80">
            EverGreen · Sénégal
          </p>
          <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-brand-serif)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Construisez votre avenir, un bien à la fois.
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">
            Catalogue curated — papiers nommés, contact direct, accompagnement
            agence.
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-28 px-4 sm:-mt-32 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[var(--radius-sheet)] border border-[var(--color-steel)]/20 bg-[var(--color-surface)] px-5 py-6 shadow-sm sm:px-8 sm:py-8">
          <h2 className="text-lg font-semibold text-[var(--color-ink)] sm:text-xl">
            Trouver un bien
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
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="w-full rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-[var(--color-bg)] hover:opacity-90"
              >
                Rechercher
              </button>
            </div>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Dakar", href: "/acheter?city=Dakar" },
              { label: "Maison", href: "/acheter?propertyType=HOUSE" },
              { label: "Terrain", href: "/acheter?propertyType=LAND" },
              { label: "Louer", href: "/louer" },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="rounded-[var(--radius-pill)] bg-[var(--color-sage)]/40 px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-sage)]/70"
              >
                {chip.label}
              </Link>
            ))}
            <Link
              href="/acheter"
              className="ml-auto text-xs font-medium text-[var(--color-leaf)] underline-offset-2 hover:underline"
            >
              Voir le catalogue →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
