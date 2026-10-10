"use client";

import Image from "next/image";
import { useState } from "react";
import { getHomeTestimonials } from "@/lib/content/home";

/** DS-12 testimonials — portrait + quote */
export function HomeTestimonials() {
  const items = getHomeTestimonials();
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0]!;

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-sage)]"
                >
                  <Image
                    src="/images/listing-01.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </span>
              ))}
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Plus de <strong className="text-[var(--color-ink)]">200+</strong>{" "}
              avis
            </p>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-surface)] shadow-sm sm:grid-cols-[200px_1fr]">
            <div className="relative min-h-[240px] bg-[var(--color-sage)]/40 sm:min-h-full">
              <Image
                src="/images/listing-02.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-10">
              <span className="text-5xl leading-none text-[var(--color-sage)]">
                “
              </span>
              <p className="mt-2 text-lg leading-relaxed text-[var(--color-ink)]">
                {current.quote}
              </p>
              <p className="mt-6 font-semibold">{current.name}</p>
              <p className="text-sm text-[var(--color-muted)]">{current.role}</p>
            </div>
          </div>
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
                      ? "w-6 bg-[var(--color-sage)]"
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
      </div>
    </section>
  );
}
