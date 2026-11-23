import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

const NAV: { href?: string; label: string }[] = [
  { href: "/sources", label: "Sources" },
  { href: "/annonces", label: "Annonces brutes" },
  { label: "Review (S3)" },
  { label: "Indices (S4)" },
];

export default async function LabLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-steel)]/30 bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-bold">
              EverGreen <span className="text-[var(--color-leaf)]">Lab</span>
            </span>
            <nav className="flex flex-wrap gap-4 text-sm">
              {NAV.map((n) =>
                n.href ? (
                  <Link key={n.label} href={n.href} className="hover:text-[var(--color-leaf)]">
                    {n.label}
                  </Link>
                ) : (
                  <span key={n.label} className="text-[var(--color-muted)]">
                    {n.label}
                  </span>
                ),
              )}
            </nav>
          </div>
          <form action={logoutAction} className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <span>
              {session.user.email} · {session.user.role}
            </span>
            <button type="submit" className="underline">
              Déconnexion
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
