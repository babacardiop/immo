"use client";

import Image from "next/image";
import { useState } from "react";
import { getHomeFaq } from "@/lib/content/home";

/** DS-11 FAQ accordion */
export function HomeFaq() {
  const items = getHomeFaq();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            Les réponses courtes avant une visite — sans jargon inutile.
          </p>
        </div>

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
                    {isOpen ? "▴" : "▾"}
                  </span>
                </button>
                {isOpen ? (
                  <div className="grid gap-4 border-t border-[var(--color-steel)]/25 px-5 py-4 sm:grid-cols-[1fr_160px] sm:items-start">
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                      {item.a}
                    </p>
                    {i === 0 ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src="/images/listing-04.jpg"
                          alt=""
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
