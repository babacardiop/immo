import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { WhatsAppCta } from "@/components/wa-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez EverGreen — formulaire ou WhatsApp. Réponse sous 24 h.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="bg-[var(--color-sage)]/20 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Accueil" },
              { label: "Contact" },
            ]}
          />
          <h1 className="mt-2 font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight">
            Contactez-nous
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[var(--color-muted)]">
            Formulaire court — un conseiller vous répond sous 24 h. Ou
            WhatsApp pour une première qualification.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Coordonnées</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-[var(--color-muted)]">Adresse</dt>
              <dd className="mt-0.5 font-medium">Dakar, Sénégal</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">Réponse</dt>
              <dd className="mt-0.5 font-medium">Sous 24 h ouvrées</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">WhatsApp</dt>
              <dd className="mt-2">
                <WhatsAppCta
                  text="Bonjour EverGreen — contact site"
                  label="Écrire sur WhatsApp"
                />
              </dd>
            </div>
          </dl>
          <p className="mt-8 rounded-2xl bg-[var(--color-sage)]/30 px-4 py-3 text-xs text-[var(--color-muted)]">
            Vos données servent uniquement à traiter votre demande — pas de
            spam.
          </p>
        </aside>

        <section className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Formulaire</h2>
          <div className="mt-4">
            <LeadForm sourceDetail="form_contact" />
          </div>
        </section>
      </div>
    </main>
  );
}
