import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const LEFT = [
  { href: "/", label: "Accueil" },
  { href: "/agence", label: "Agence" },
  { href: "/acheter", label: "Acheter" },
  { href: "/louer", label: "Louer" },
];
const RIGHT = [
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
  { href: "/quartiers/mermoz", label: "Quartiers" },
  { href: "/mentions-legales", label: "Mentions" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-steel)]/40 bg-[var(--color-bg)] px-6 py-12 text-sm text-[var(--color-muted)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-[var(--color-steel)]/30 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-md font-[family-name:var(--font-brand-serif)] text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Découvrez le Sénégal avec un accompagnement expert
          </h2>
          <p className="text-[var(--color-muted)]">
            Dakar · Sénégal
            <br />
            Contact via WhatsApp ou formulaire
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap justify-center gap-4">
            {LEFT.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <BrandLogo />
          <nav className="flex flex-wrap justify-center gap-4">
            {RIGHT.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--color-steel)]/30 pt-6 text-xs sm:flex-row sm:justify-between">
          <p>© 2026 EverGreen Immobilier. Tous droits réservés.</p>
          <p>
            <Link href="/cgu" className="hover:text-[var(--color-ink)]">
              CGU
            </Link>
            {" · "}
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
