"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-steel)]/30 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <BrandLogo priority />
        <nav
          className="hidden items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--color-ink)]/90 px-1.5 py-1 lg:flex"
          aria-label="Principale"
        >
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
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
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/espace/connexion"
            className="hidden rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] sm:inline-flex"
          >
            Espace pro
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/40 lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
              <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
              <span className="block h-0.5 w-5 bg-[var(--color-ink)]" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal>
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute inset-y-0 right-0 flex w-[78%] max-w-sm flex-col rounded-tl-[var(--radius-sheet)] bg-[var(--color-ink)]/92 px-6 py-8 text-white backdrop-blur-md"
            aria-label="Mobile"
          >
            <ul className="mt-10 flex flex-1 flex-col items-center justify-center gap-3">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-flex min-w-[180px] justify-center rounded-[var(--radius-pill)] px-5 py-2.5 text-base ${
                        active
                          ? "bg-white text-[var(--color-ink)]"
                          : "text-white/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/espace/connexion"
              className="mb-4 inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)]"
            >
              Connexion
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
