import Image from "next/image";
import Link from "next/link";

const TAGS = [
  { label: "Maison", href: "/acheter?propertyType=HOUSE" },
  { label: "Appartement", href: "/acheter?propertyType=APARTMENT" },
  { label: "Terrain", href: "/acheter?propertyType=LAND" },
] as const;

export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[min(92vh,920px)] w-full min-h-[560px]">
        <Image
          src="/images/hero-photo.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-6 pb-44 pt-28 sm:pb-48">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="rounded-[var(--radius-pill)] bg-white/95 px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink)] backdrop-blur"
              >
                {tag.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-xl font-[family-name:var(--font-brand-serif)] text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Construisez votre avenir, un bien à la fois.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              Catalogue curated au Sénégal — papiers nommés, contact direct,
              accompagnement agence.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-28 px-4 sm:-mt-32 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-t-[var(--radius-sheet)] rounded-b-[var(--radius-card)] bg-[var(--color-surface)] px-5 py-6 shadow-[0_20px_50px_rgba(15,15,9,0.12)] sm:px-8 sm:py-8">
          <h2 className="text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
            Trouver le meilleur bien
          </h2>
          <form
            action="/acheter"
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Type
              <select
                name="propertyType"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3.5 text-sm text-[var(--color-ink)]"
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
              Ville
              <input
                name="city"
                placeholder="Dakar…"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3.5 text-sm text-[var(--color-ink)]"
              />
            </label>
            <label className="block text-xs font-medium text-[var(--color-muted)]">
              Quartier
              <input
                name="quartier"
                placeholder="Almadies…"
                className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3.5 text-sm text-[var(--color-ink)]"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-3.5 text-sm font-semibold text-[var(--color-bg)] hover:opacity-90"
              >
                Rechercher
              </button>
            </div>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--color-muted)]">Filtres :</span>
            {[
              { label: "Dakar", href: "/acheter?city=Dakar" },
              { label: "Maison", href: "/acheter?propertyType=HOUSE" },
              { label: "Terrain", href: "/acheter?propertyType=LAND" },
              { label: "Louer", href: "/louer" },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-bg)] px-3 py-1 text-xs text-[var(--color-ink)] hover:border-[var(--color-leaf)]"
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
