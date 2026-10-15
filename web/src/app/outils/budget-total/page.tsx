import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { BudgetTotalForm } from "@/components/simulators/budget-total-form";

export const metadata: Metadata = {
  title: "Simulateur budget total projet",
  description:
    "Agrège terrain, mensualité, construction et frais d’acquisition en un budget projet FCFA.",
};

export default function BudgetTotalPage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { href: "/outils", label: "Outils" },
        { label: "Budget total" },
      ]}
      title="Budget total projet"
      description="Cash jour J + chantier — estimation globale à confirmer avec l’agence."
      wide={false}
    >
      <BudgetTotalForm />
    </PageShell>
  );
}
