import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { MensualiteForm } from "@/components/simulators/mensualite-form";

export const metadata: Metadata = {
  title: "Simulateur de mensualité",
  description:
    "Calculez acompte et mensualité FCFA pour vente étalée ou location-vente au Sénégal — simulation indicative, pas un crédit bancaire.",
};

export default function MensualitePage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { href: "/outils", label: "Outils" },
        { label: "Mensualité" },
      ]}
      title="Mensualité"
      description="Facilité vendeur via agence — résultat immédiat, sans email."
      wide={false}
    >
      <MensualiteForm />
    </PageShell>
  );
}
