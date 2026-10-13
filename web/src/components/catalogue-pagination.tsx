import Link from "next/link";
import type { CatalogueFilters } from "@/lib/listings/public-query";
import { catalogueFiltersToSearchParams } from "@/lib/listings/parse-filters";
import type { CatalogueChannel } from "@/lib/listings/public-query";

function pageHref(
  channel: CatalogueChannel,
  filters: CatalogueFilters,
  page: number,
) {
  const qs = catalogueFiltersToSearchParams({
    ...filters,
    page: page > 1 ? page : undefined,
    cursor: undefined,
  });
  const s = qs.toString();
  return s ? `/${channel}?${s}` : `/${channel}`;
}

function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current]);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i]!;
    if (i > 0 && n - sorted[i - 1]! > 1) out.push("…");
    out.push(n);
  }
  return out;
}

export function CataloguePagination({
  channel,
  filters,
  page,
  totalPages,
}: {
  channel: CatalogueChannel;
  filters: CatalogueFilters;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const window = pageWindow(page, totalPages);

  const pill =
    "inline-flex min-w-10 items-center justify-center rounded-[var(--radius-pill)] px-3 py-2 text-sm font-medium transition";

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {prev ? (
        <Link
          href={pageHref(channel, filters, prev)}
          className={`${pill} border border-[var(--color-steel)]/40 bg-[var(--color-surface)] text-[var(--color-ink)]`}
          rel="prev"
        >
          Préc.
        </Link>
      ) : (
        <span
          className={`${pill} border border-transparent text-[var(--color-muted)] opacity-40`}
          aria-disabled
        >
          Préc.
        </span>
      )}

      {window.map((item, idx) =>
        item === "…" ? (
          <span
            key={`e-${idx}`}
            className="px-1 text-sm text-[var(--color-muted)]"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={pageHref(channel, filters, item)}
            className={`${pill} ${
              item === page
                ? "bg-[var(--color-ink)] text-white"
                : "border border-[var(--color-steel)]/40 bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-leaf)]"
            }`}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        ),
      )}

      {next ? (
        <Link
          href={pageHref(channel, filters, next)}
          className={`${pill} border border-[var(--color-steel)]/40 bg-[var(--color-surface)] text-[var(--color-ink)]`}
          rel="next"
        >
          Suiv.
        </Link>
      ) : (
        <span
          className={`${pill} border border-transparent text-[var(--color-muted)] opacity-40`}
          aria-disabled
        >
          Suiv.
        </span>
      )}
    </nav>
  );
}
