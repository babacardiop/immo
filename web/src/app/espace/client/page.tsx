import Link from "next/link";
import { requireClient } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ClientHomePage() {
  const user = await requireClient();
  const tenantCount = await prisma.propertyAssignment.count({
    where: { userId: user.id, role: "TENANT", status: "ACTIVE" },
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        Bonjour{user.name ? `, ${user.name}` : ""}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        {tenantCount > 0
          ? "Votre portail locataire est actif pour au moins un bien."
          : "Déposez vos dossiers de candidature — les loyers apparaîtront après acceptation."}
      </p>
      <Link
        href="/espace/client/candidatures"
        className="mt-6 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
      >
        Mes candidatures
      </Link>
    </div>
  );
}
