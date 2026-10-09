import Link from "next/link";
import type { UserRole } from "@prisma/client";
import { logoutAction } from "@/app/actions/auth";
import { isModeratorOrAbove } from "@/lib/roles";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/espace/agent", label: "Tableau de bord" },
  { href: "/espace/agent/annonces", label: "Annonces" },
];

export function AgentNav({
  email,
  role,
}: {
  email?: string | null;
  role?: UserRole | null;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-[var(--color-steel)]/40 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <nav className="flex flex-wrap gap-4 text-sm">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-medium text-[var(--color-ink)] hover:text-[var(--color-olive)]"
          >
            {l.label}
          </Link>
        ))}
        {role && isModeratorOrAbove(role) ? (
          <Link
            href="/espace/agent/lieux"
            className="font-medium text-[var(--color-ink)] hover:text-[var(--color-olive)]"
          >
            Lieux
          </Link>
        ) : null}
      </nav>
      <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
        <span>{email}</span>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost">
            Se déconnecter
          </Button>
        </form>
      </div>
    </div>
  );
}
