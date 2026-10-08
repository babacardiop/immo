import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
        Sénégal
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-6xl">
        EverGreen
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">
        Hub immobilier curated — catalogue, confiance papier, parcours agent.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/espace/connexion"
          className="inline-flex rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)]"
        >
          Espace agent
        </Link>
        <Link
          href="/api/health"
          className="inline-flex rounded-md bg-[var(--color-sage)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
        >
          Health check
        </Link>
      </div>
    </main>
  );
}
