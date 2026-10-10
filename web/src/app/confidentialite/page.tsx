import { PageShell } from "@/components/page-shell";

export default function ConfidentialitePage() {
  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Confidentialité" },
      ]}
      title="Confidentialité"
      description="Placeholder — politique de confidentialité à rédiger."
      wide={false}
    >
      <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 text-sm text-[var(--color-muted)] sm:p-8">
        Contenu juridique à venir.
      </div>
    </PageShell>
  );
}
