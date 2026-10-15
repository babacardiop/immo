"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

/** Primary destinations — keep the bar lean. */
const PRIMARY_NAV = [
  { href: "/", label: "Accueil" },
  { href: "/acheter", label: "Acheter" },
  { href: "/louer", label: "Louer" },
] as const;

/** Secondary — Agence / content / contact (and future Blog, Partenariat). */
const MORE_NAV = [
  { href: "/outils", label: "Outils" },
  { href: "/agence", label: "Agence" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
  { href: "/partenaires", label: "Partenariat" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function moreIsActive(pathname: string) {
  return MORE_NAV.some((item) => isActive(pathname, item.href));
}

/** Fixed dark chrome so dark/green themes don't invert the pill to light-on-light. */
const NAV_PILL =
  "hidden items-center gap-1 rounded-[var(--radius-pill)] bg-[#0f0f09]/92 px-1.5 py-1 lg:flex";
const NAV_LINK =
  "rounded-[var(--radius-pill)] px-3 py-1.5 text-sm transition text-white/85 hover:text-white";
const NAV_LINK_ACTIVE = "rounded-[var(--radius-pill)] px-3 py-1.5 text-sm bg-white text-[#0f0f09]";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreMenuId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  /* Agent BO has its own dark sidebar shell */
  if (pathname.startsWith("/espace/agent")) return null;

  const moreActive = moreIsActive(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-steel)]/30 bg-[var(--color-bg)]/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <BrandLogo priority />

        <nav className={NAV_PILL} aria-label="Principale">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? NAV_LINK_ACTIVE : NAV_LINK}
              >
                {item.label}
              </Link>
            );
          })}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              className={moreActive || moreOpen ? NAV_LINK_ACTIVE : NAV_LINK}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              aria-controls={moreMenuId}
              onClick={() => setMoreOpen((v) => !v)}
            >
              Plus
              <span className="ml-1 inline-block text-[10px]" aria-hidden>
                {moreOpen ? "▴" : "▾"}
              </span>
            </button>
            {moreOpen ? (
              <div
                id={moreMenuId}
                role="menu"
                className="absolute left-1/2 z-[60] mt-2 min-w-[12rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-black/10 bg-white py-1 shadow-lg"
              >
                {MORE_NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={`block px-4 py-2.5 text-sm transition ${
                        active
                          ? "bg-[#0f0f09] font-medium text-white"
                          : "text-[#0f0f09] hover:bg-[#f2f2f2]"
                      }`}
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/espace/connexion"
            className="hidden rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-3 py-1.5 text-sm font-medium text-[#0f0f09] sm:inline-flex"
          >
            Espace pro
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/40 text-[var(--color-ink)] lg:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Fermer"
            onClick={() => setMobileOpen(false)}
          />
          {/* Fixed dark panel — not theme ink (light on dark/green themes). */}
          <nav
            className="absolute inset-y-0 right-0 flex w-[min(86vw,22rem)] flex-col bg-[#0f0f09] px-6 py-8 text-white shadow-2xl"
            aria-label="Mobile"
          >
            <button
              type="button"
              className="mb-6 self-end rounded-full border border-white/25 px-3 py-1 text-sm text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Fermer
            </button>
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-base ${
                        active
                          ? "bg-white font-medium text-[#0f0f09]"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mb-2 mt-6 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Plus
            </p>
            <ul className="flex flex-col gap-1">
              {MORE_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-base ${
                        active
                          ? "bg-white font-medium text-[#0f0f09]"
                          : "text-white/90 hover:bg-white/10"
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
              className="mt-auto inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-5 py-3 text-sm font-semibold text-[#0f0f09]"
            >
              Connexion
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
