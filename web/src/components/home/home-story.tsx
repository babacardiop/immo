import Image from "next/image";
import Link from "next/link";

/** DS-08 feature / story grid */
export function HomeStory() {
  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Votre prochain chez-vous mérite mieux qu’une annonce floue.
          </h2>
          <div className="flex max-w-sm items-center gap-3 rounded-[var(--radius-pill)] bg-[var(--color-bg)] p-2 pr-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/listing-03.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <p className="text-xs leading-snug text-[var(--color-muted)]">
              Chaque fiche offre des critères clairs, une pastille papier et un
              contact direct.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="relative min-h-[300px] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5 lg:min-h-[420px]">
            <Image
              src="/images/story-home.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-4 right-4 flex -space-x-2">
              {["/images/listing-01.jpg", "/images/listing-02.jpg", "/images/listing-04.jpg"].map(
                (src) => (
                  <div
                    key={src}
                    className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white"
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="44px" />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-bg)] px-8 py-10 text-center lg:col-span-3">
            <h3 className="text-xl font-semibold text-[var(--color-ink)]">
              De grands projets tiennent dans de bons dossiers.
            </h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              On maximise la clarté avant la visite — papier, budget, zone.
            </p>
            <Link
              href="/agence"
              className="mt-6 inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/50 bg-[var(--color-surface)] px-5 py-2 text-sm font-medium"
            >
              Détails
            </Link>
          </div>

          <div className="flex flex-col lg:col-span-4">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/listing-03.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 30vw"
              />
            </div>
            <p className="text-center text-lg font-semibold text-[var(--color-ink)]">
              Sélection curated · Dakar & régions
            </p>
            <Link
              href="/acheter"
              className="mt-4 inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
            >
              Explorer les biens →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
