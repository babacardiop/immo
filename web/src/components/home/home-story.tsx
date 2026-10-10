import Image from "next/image";
import Link from "next/link";

export function HomeStory() {
  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Votre prochain chez-vous mérite mieux qu’une annonce floue.
          </h2>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            Chaque fiche offre des critères clairs, une pastille papier sur les
            ventes, et un contact direct.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5 lg:min-h-[420px]">
            <Image
              src="/images/feature-home-large.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-col justify-center rounded-[var(--radius-card)] bg-[var(--color-bg)] px-8 py-10 text-center lg:col-span-3">
            <h3 className="text-xl font-semibold text-[var(--color-ink)]">
              De grands projets tiennent dans de bons dossiers.
            </h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              On maximise la clarté avant la visite — papier, budget, zone.
            </p>
            <Link
              href="/agence"
              className="mt-6 inline-flex justify-center rounded-[var(--radius-pill)] border border-[var(--color-steel)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium"
            >
              Détails
            </Link>
          </div>
          <div className="lg:col-span-4">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/feature-home-pool.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 30vw"
              />
            </div>
            <p className="text-sm font-medium text-[var(--color-ink)]">
              Sélection curated · Dakar & régions
            </p>
            <Link
              href="/acheter"
              className="mt-3 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
            >
              Explorer les biens →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
