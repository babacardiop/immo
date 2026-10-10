"use client";

import { useState } from "react";
import { getHomeTestimonials } from "@/lib/content/home";

export function HomeTestimonials() {
  const items = getHomeTestimonials();
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0]!;

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
          Témoignages
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Ce que disent nos clients
        </h2>

        <blockquote className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] px-8 py-10">
          <p className="text-lg leading-relaxed text-[var(--color-ink)] sm:text-xl">
            « {current.quote} »
          </p>
          <footer className="mt-6">
            <p className="font-semibold">{current.name}</p>
            <p className="text-sm text-[var(--color-muted)]">{current.role}</p>
          </footer>
        </blockquote>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Précédent"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/40 bg-[var(--color-surface)]"
            onClick={() =>
              setIndex((i) => (i - 1 + items.length) % items.length)
            }
          >
            ←
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Témoignage ${i + 1}`}
                className={`h-2 rounded-full transition ${
                  i === index
                    ? "w-6 bg-[var(--color-leaf)]"
                    : "w-2 bg-[var(--color-steel)]/50"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Suivant"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-steel)]/40 bg-[var(--color-surface)]"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
