import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-steel)]/40 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          EverGreen
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm sm:gap-4">
          <Link href="/acheter" className="hover:text-[var(--color-olive)]">
            Acheter
          </Link>
          <Link href="/louer" className="hover:text-[var(--color-olive)]">
            Louer
          </Link>
          <Link href="/agence" className="hover:text-[var(--color-olive)]">
            Agence
          </Link>
          <Link
            href="/guides"
            className="hidden hover:text-[var(--color-olive)] sm:inline"
          >
            Guides
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
