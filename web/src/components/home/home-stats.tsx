import { getHomeStats } from "@/lib/content/home";

export function HomeStats() {
  const stats = getHomeStats();
  return (
    <section className="bg-[var(--color-bg)] px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-2">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-[var(--color-steel)]/25" : ""}`}
          >
            <p className="font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
