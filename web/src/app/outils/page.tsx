import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Outils",
  description:
    "Simulateurs EverGreen — mensualité étalée, coût de construction et budget total projet au Sénégal.",
};

const TOOLS = [
  {
    href: "/outils/mensualite",
    title: "Mensualité",
    blurb:
      "Estimez acompte et mensualité pour une vente étalée ou location-vente — pas un prêt bancaire.",
  },
  {
    href: "/outils/construction",
    title: "Coût de construction",
    blurb:
      "Fourchette FCFA/m² selon zone et finition, hors prix du terrain.",
  },
  {
    href: "/outils/budget-total",
    title: "Budget total projet",
    blurb:
      "Agrège terrain, plan de paiement, construction et frais d’acquisition.",
  },
] as const;

export default function OutilsHubPage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Outils" },
      ]}
      title="Outils"
      description="Calculez en FCFA sans créer de compte. Les résultats sont indicatifs — un conseiller EverGreen vous accompagne ensuite."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-leaf)]/50"
            >
              <h2 className="font-[family-name:var(--font-brand-serif)] text-2xl font-semibold text-[var(--color-ink)]">
                {t.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {t.blurb}
              </p>
              <span className="mt-5 text-sm font-medium text-[var(--color-olive)]">
                Ouvrir →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
