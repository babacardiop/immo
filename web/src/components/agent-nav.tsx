"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { logoutAction } from "@/app/actions/auth";
import { isModeratorOrAbove } from "@/lib/roles";

const links = [
  { href: "/espace/agent", label: "Tableau de bord", exact: true },
  { href: "/espace/agent/leads", label: "Leads" },
  { href: "/espace/agent/visites", label: "Visites" },
  { href: "/espace/agent/candidatures", label: "Candidatures" },
  { href: "/espace/agent/annonces", label: "Annonces" },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AgentNav({
  email,
  role,
}: {
  email?: string | null;
  role?: UserRole | null;
}) {
  const pathname = usePathname() ?? "/";
  const showLieux = role ? isModeratorOrAbove(role) : false;

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[var(--color-ink)] text-white lg:w-60 lg:min-h-full">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/espace/agent" className="block">
          <p className="font-[family-name:var(--font-brand-serif)] text-lg font-bold tracking-tight">
            EverGreen
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
            Agent back-office
          </p>
        </Link>
      </div>

      <nav
        className="flex flex-1 flex-row gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-3 lg:py-4"
        aria-label="Espace agent"
      >
        {links.map((l) => {
          const active = isActive(pathname, l.href, "exact" in l && l.exact);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition lg:pl-4 ${
                active
                  ? "bg-white/10 font-medium text-white lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-0.5 lg:before:rounded-full lg:before:bg-[var(--color-leaf-bright)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
        {showLieux ? (
          <Link
            href="/espace/agent/lieux"
            className={`relative whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition lg:pl-4 ${
              isActive(pathname, "/espace/agent/lieux")
                ? "bg-white/10 font-medium text-white lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-0.5 lg:before:rounded-full lg:before:bg-[var(--color-leaf-bright)]"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            Lieux
          </Link>
        ) : null}
      </nav>

      <div className="mt-auto border-t border-white/10 px-4 py-4">
        <div className="mb-3 hidden lg:block">
          <p className="truncate text-sm font-medium text-white">
            {email ?? "Agent"}
          </p>
          <p className="text-xs text-white/50">Back-office</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
