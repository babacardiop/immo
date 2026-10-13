export function CatalogueSkeleton({ title }: { title: string; subtitle?: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-8 text-sm text-[var(--color-muted)]">Chargement…</p>
    </main>
  );
}
