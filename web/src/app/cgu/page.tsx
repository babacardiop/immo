import { PageShell } from "@/components/page-shell";

export default function CguPage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "CGU" },
      ]}
      title="Conditions générales"
      description="Placeholder — CGU à rédiger."
      wide={false}
    >
      <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 text-sm text-[var(--color-muted)] sm:p-8">
        Contenu juridique à venir.
      </div>
    </PageShell>
  );
}
