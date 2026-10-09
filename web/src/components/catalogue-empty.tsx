import Link from "next/link";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import { WhatsAppCta } from "@/components/wa-cta";

export function CatalogueEmpty({ channel }: { channel: CatalogueChannel }) {
  const label = channel === "acheter" ? "acheter" : "louer";
  return (
    <div className="py-16 text-center">
      <h2 className="text-2xl font-semibold">Aucun bien pour ces critères</h2>
      <p className="mt-2 text-[var(--color-muted)]">
        Élargissez les filtres ou contactez-nous — le stock évolue chaque
        semaine.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={`/${channel}`}
          className="inline-flex rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm text-[var(--color-bg)]"
        >
          Réinitialiser
        </Link>
        <WhatsAppCta
          text={`Bonjour EverGreen, je cherche à ${label} — pouvez-vous m’aider ?`}
          label="Demander sur WhatsApp"
        />
      </div>
    </div>
  );
}
