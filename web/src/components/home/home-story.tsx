import Image from "next/image";
import Link from "next/link";

const POINTS = [
  {
    title: "Papiers nommés",
    text: "Pastille claire sur chaque vente — titre, bail, délibération.",
  },
  {
    title: "Fiches lisibles",
    text: "Critères, zone et budget avant la visite — pas d’annonce floue.",
  },
  {
    title: "Contact direct",
    text: "WhatsApp ou formulaire — un conseiller sous 24 h.",
  },
] as const;

export function HomeStory() {
  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src="/images/story-home.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
            L’agence
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Votre prochain chez-vous mérite mieux qu’une annonce floue.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Chaque fiche offre des critères clairs et un contact direct —
            sélection curated à Dakar et en régions.
          </p>

          <ul className="mt-8 space-y-5 border-t border-[var(--color-steel)]/25 pt-6">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-sage)]"
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-muted)]">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/agence"
              className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
            >
              Découvrir l’agence
            </Link>
            <Link
              href="/acheter"
              className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/50 bg-[var(--color-bg)] px-5 py-2.5 text-sm font-medium"
            >
              Explorer les biens
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
