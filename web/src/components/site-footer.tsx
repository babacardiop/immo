import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/acheter", label: "Acheter" },
  { href: "/louer", label: "Louer" },
  { href: "/agence", label: "Agence" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

/** Lean footer — logo + nav + legal (no heavy CTA band) */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-steel)]/30 bg-[var(--color-bg)] px-6 py-8 text-sm text-[var(--color-muted)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <BrandLogo />
        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          aria-label="Pied de page"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-[var(--color-ink)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex w-full flex-col gap-2 border-t border-[var(--color-steel)]/25 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EverGreen Immobilier</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/mentions-legales" className="hover:text-[var(--color-ink)]">
              Mentions
            </Link>
            <Link href="/cgu" className="hover:text-[var(--color-ink)]">
              CGU
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-[var(--color-ink)]"
            >
              Confidentialité
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
