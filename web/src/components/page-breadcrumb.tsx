import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function PageBreadcrumb({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Fil d’Ariane"
      className="-mx-6 mb-8 border-y border-[var(--color-steel)]/30 bg-[var(--color-surface)]/80 px-6 py-3 text-sm text-[var(--color-muted)] sm:mx-0 sm:rounded-[var(--radius-card)] sm:border"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden>›</span> : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-ink)] hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "font-medium text-[var(--color-ink)]" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
