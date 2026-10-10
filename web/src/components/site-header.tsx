import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-steel)]/40 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <BrandLogo priority />
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm sm:gap-4">
          <Link href="/acheter" className="hover:text-[var(--color-leaf)]">
            Acheter
          </Link>
          <Link href="/louer" className="hover:text-[var(--color-leaf)]">
            Louer
          </Link>
          <Link href="/agence" className="hover:text-[var(--color-leaf)]">
            Agence
          </Link>
          <Link
            href="/guides"
            className="hidden hover:text-[var(--color-leaf)] sm:inline"
          >
            Guides
          </Link>
          <ThemeToggle />
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
