import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-steel)]/40 bg-[var(--color-bg)] px-6 py-8 text-sm text-[var(--color-muted)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 EverGreen</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/agence" className="hover:text-[var(--color-ink)]">
            Agence
          </Link>
          <Link href="/guides" className="hover:text-[var(--color-ink)]">
            Guides
          </Link>
          <Link href="/quartiers/mermoz" className="hover:text-[var(--color-ink)]">
            Quartiers
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-ink)]">
            Contact
          </Link>
          <Link href="/mentions-legales" className="hover:text-[var(--color-ink)]">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-[var(--color-ink)]">
            Confidentialité
          </Link>
          <Link href="/cgu" className="hover:text-[var(--color-ink)]">
            CGU
          </Link>
        </nav>
      </div>
    </footer>
  );
}
