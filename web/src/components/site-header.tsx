import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-steel)]/40 bg-[var(--color-bg)]/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          EverGreen
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/acheter" className="hover:text-[var(--color-olive)]">
            Acheter
          </Link>
          <Link href="/louer" className="hover:text-[var(--color-olive)]">
            Louer
          </Link>
          <Link
            href="/espace/connexion"
            className="rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-[var(--color-bg)]"
          >
            Espace pro
          </Link>
        </nav>
      </div>
    </header>
  );
}
