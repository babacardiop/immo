import Link from "next/link";
import { Suspense } from "react";
import { FeaturedListings } from "@/components/featured-listings";

export default function Home() {
  return (
    <>
      <main className="relative flex min-h-[70vh] w-full flex-1 flex-col justify-center overflow-hidden px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,var(--color-sage)_0%,transparent_50%),radial-gradient(ellipse_at_80%_60%,#dbe4ee_0%,transparent_45%)] opacity-80"
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <p className="font-[family-name:var(--font-brand-serif)] text-5xl font-semibold tracking-tight text-[var(--color-leaf)] sm:text-7xl">
            EverGreen
          </p>
          <h1 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Immobilier au Sénégal — curated, papiers nommés
          </h1>
          <p className="mt-4 max-w-lg text-lg text-[var(--color-muted)]">
            Agence full-service — catalogue vérifié, contact direct WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/acheter"
              className="inline-flex rounded-md bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
            >
              Acheter
            </Link>
            <Link
              href="/louer"
              className="inline-flex rounded-md border border-[var(--color-ink)] px-5 py-2.5 text-sm font-medium"
            >
              Louer
            </Link>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <FeaturedListings />
      </Suspense>
    </>
  );
}
