"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/acheter", label: "Acheter" },
  { href: "/louer", label: "Louer" },
  { href: "/agence", label: "Agence" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-steel)]/30 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <BrandLogo priority />
        <nav
          className="hidden items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--color-ink)]/90 px-1.5 py-1 md:flex"
          aria-label="Principale"
        >
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[var(--radius-pill)] px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-white text-[var(--color-ink)]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav className="flex gap-3 text-sm md:hidden">
            <Link href="/acheter" className="hover:text-[var(--color-leaf)]">
              Acheter
            </Link>
            <Link href="/louer" className="hover:text-[var(--color-leaf)]">
              Louer
            </Link>
          </nav>
          <ThemeToggle />
          <Link
            href="/espace/connexion"
            className="rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)]"
          >
            Espace pro
          </Link>
        </div>
      </div>
    </header>
  );
}
