export function CatalogueSkeleton({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>
      <p className="mt-10 text-sm text-[var(--color-muted)]">Chargement…</p>
    </main>
  );
}
