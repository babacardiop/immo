import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";
import { PageShell } from "@/components/page-shell";

export default function ConnexionPage() {
  return (
    <Suspense
      fallback={
        <PageShell
          crumbs={[
            { href: "/", label: "Accueil" },
            { label: "Connexion" },
          ]}
          title="Connexion"
        >
          <p className="text-[var(--color-muted)]">Chargement…</p>
        </PageShell>
      }
    >
      <ConnexionContent />
    </Suspense>
  );
}

async function ConnexionContent() {
  const session = await auth();
  if (session?.user) {
    redirect("/espace/agent");
  }

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Connexion" },
      ]}
      title="Connexion"
      description="Accès réservé aux agents, OD et admins."
      wide={false}
    >
      <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 sm:p-8">
        <LoginForm />
      </div>
    </PageShell>
  );
}
