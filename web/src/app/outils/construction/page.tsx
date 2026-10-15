import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ConstructionForm } from "@/components/simulators/construction-form";

export const metadata: Metadata = {
  title: "Simulateur coût de construction",
  description:
    "Estimez le budget construction d’une maison au Sénégal (FCFA/m²) selon zone et finition — hors terrain.",
};

export default function ConstructionPage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { href: "/outils", label: "Outils" },
        { label: "Construction" },
      ]}
      title="Coût de construction"
      description="Fourchette indicative hors prix du terrain — devis partenaire ensuite."
      wide={false}
    >
      <ConstructionForm />
    </PageShell>
  );
}
