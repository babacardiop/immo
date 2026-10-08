import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
      <p className="text-sm text-[var(--color-muted)]">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
        Page introuvable
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit rounded-md bg-[var(--color-sage)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
