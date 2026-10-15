import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { AGENT_ROLES } from "@/lib/roles";

export default async function ProprioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/espace/connexion");
  if (AGENT_ROLES.includes(session.user.role)) {
    redirect("/espace/agent");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-steel)]/25 pb-4">
        <div>
          <p className="font-[family-name:var(--font-brand-serif)] text-xl font-bold">
            EverGreen Proprio
          </p>
          <nav className="mt-2 flex gap-4 text-sm">
            <Link href="/espace/proprio">Accueil</Link>
            <Link href="/espace/proprio/candidatures">Candidatures</Link>
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
