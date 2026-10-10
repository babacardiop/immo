import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppCta } from "@/components/wa-cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez EverGreen — formulaire ou WhatsApp. Réponse sous 24 h.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight">
        Contact
      </h1>
      <p className="mt-2 max-w-xl text-[var(--color-muted)]">
        Formulaire court — un conseiller vous répond sous 24 h. Ou écrivez-nous
        directement sur WhatsApp.
      </p>

      <div className="mt-8">
        <WhatsAppCta
          text="Bonjour EverGreen — contact site"
          label="WhatsApp"
        />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Formulaire</h2>
        <div className="mt-4">
          <LeadForm sourceDetail="form_contact" />
        </div>
      </section>
    </main>
  );
}
