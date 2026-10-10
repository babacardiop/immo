import type { ReactNode } from "react";
import { PageBreadcrumb, type Crumb } from "@/components/page-breadcrumb";

export function PageShell({
  crumbs,
  title,
  description,
  children,
  wide = true,
}: {
  crumbs: Crumb[];
  title?: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <main
      className={`mx-auto w-full flex-1 px-6 py-12 ${wide ? "max-w-6xl" : "max-w-3xl"}`}
    >
      <PageBreadcrumb items={crumbs} />
      {title ? (
        <header className="mb-8">
          <h1 className="font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-lg text-[var(--color-muted)]">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      {children}
    </main>
  );
}
