"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { CatalogueView } from "@/lib/listings/public-query";

export function CatalogueViewToggle({
  active,
}: {
  active: CatalogueView;
}) {
  const pathname = usePathname() ?? "/acheter";
  const searchParams = useSearchParams();

  const hrefFor = (view: CatalogueView) => {
    const qs = new URLSearchParams(searchParams.toString());
    qs.delete("cursor");
    if (view === "list") qs.delete("view");
    else qs.set("view", "map");
    const s = qs.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  const base =
    "inline-flex flex-1 items-center justify-center rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium transition sm:flex-none";

  return (
    <div
      className="inline-flex w-full gap-1 rounded-[var(--radius-pill)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-1 sm:w-auto"
      role="group"
      aria-label="Vue catalogue"
    >
      <Link
        href={hrefFor("list")}
        className={`${base} ${
          active === "list"
            ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
        aria-current={active === "list" ? "page" : undefined}
      >
        Liste
      </Link>
      <Link
        href={hrefFor("map")}
        className={`${base} ${
          active === "map"
            ? "bg-[var(--color-ink)] text-[var(--color-bg)]"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
        aria-current={active === "map" ? "page" : undefined}
      >
        Carte
      </Link>
    </div>
  );
}
