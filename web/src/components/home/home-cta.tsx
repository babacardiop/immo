import Image from "next/image";
import Link from "next/link";

export function HomeCta() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
        <h2 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight sm:text-5xl">
          Prêt à concrétiser votre projet immobilier ?
        </h2>
        <p className="mt-4 text-white/85">
          Explorez une sélection curated alignée sur votre vision — puis
          contactez un conseiller.
        </p>
        <Link
          href="/acheter"
          className="mt-8 inline-flex rounded-[var(--radius-pill)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
        >
          Commencer →
        </Link>
      </div>
    </section>
  );
}
