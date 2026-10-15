import Link from "next/link";
import { requireUser } from "@/lib/session";

export default async function ProprioHomePage() {
  const user = await requireUser();
  return (
    <div>
      <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-bold">
        Espace propriétaire
      </h1>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Bonjour{user.name ? ` ${user.name}` : ""} — suivez les candidatures
        (sans accès aux pièces du dossier).
      </p>
      <Link
        href="/espace/proprio/candidatures"
        className="mt-6 inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white"
      >
        Voir les candidatures
      </Link>
    </div>
  );
}
