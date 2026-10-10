"use client";

import { useState } from "react";
import { getHomeFaq } from "@/lib/content/home";

export function HomeFaq() {
  const items = getHomeFaq();
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
          FAQ
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Questions fréquentes
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Réponses courtes avant une visite — sans jargon inutile.
        </p>

        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-bg)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="text-[var(--color-muted)]" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="border-t border-[var(--color-steel)]/25 px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
