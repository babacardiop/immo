import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default function ClientSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={<p className="p-6 text-[var(--color-muted)]">Chargement…</p>}
    >
      <ClientShell>{children}</ClientShell>
    </Suspense>
  );
}

async function ClientShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/espace/connexion");
  if (session.user.role !== "CLIENT") {
    if (session.user.role === "LANDLORD") {
      redirect("/espace/proprio");
    }
    redirect("/espace/agent");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-steel)]/25 pb-4">
        <div>
          <p className="font-[family-name:var(--font-brand-serif)] text-xl font-bold">
            EverGreen
          </p>
          <nav className="mt-2 flex gap-4 text-sm">
            <Link href="/espace/client">Accueil</Link>
            <Link href="/espace/client/candidatures">Mes candidatures</Link>
          </nav>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[var(--color-muted)]">
            Déconnexion
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
