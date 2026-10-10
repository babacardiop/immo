import Link from "next/link";
import { WhatsAppCta } from "@/components/wa-cta";

export function HomeCta() {
  return (
    <section className="bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-sage)]/35 px-8 py-12 sm:px-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
              Prochaine étape
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Prêt à concrétiser votre projet immobilier ?
            </h2>
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">
              Explorez le catalogue, ou écrivez-nous — un conseiller vous
              répond sous 24 h.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
            <Link
              href="/acheter"
              className="inline-flex justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-bg)]"
            >
              Voir les biens
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-[var(--radius-pill)] border border-[var(--color-ink)]/20 bg-[var(--color-surface)] px-6 py-3 text-sm font-medium"
            >
              Formulaire
            </Link>
            <WhatsAppCta
              text="Bonjour EverGreen — projet immobilier"
              label="WhatsApp"
              className="justify-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
