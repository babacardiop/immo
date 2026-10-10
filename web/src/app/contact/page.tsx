import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { PageShell } from "@/components/page-shell";
import { WhatsAppCta } from "@/components/wa-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez EverGreen — formulaire ou WhatsApp. Réponse sous 24 h.",
};

export default function ContactPage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Contact" },
      ]}
      title="Contact"
      description="Formulaire court — un conseiller vous répond sous 24 h. Ou écrivez-nous directement sur WhatsApp."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <aside className="rounded-[var(--radius-card)] bg-[var(--color-sage)]/25 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">
            Réponse rapide
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Préférez WhatsApp pour une première qualification. Le formulaire
            crée aussi un lead suivi dans notre CRM.
          </p>
          <div className="mt-6">
            <WhatsAppCta
              text="Bonjour EverGreen — contact site"
              label="WhatsApp"
            />
          </div>
        </aside>
        <section className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Formulaire</h2>
          <div className="mt-4">
            <LeadForm sourceDetail="form_contact" />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
