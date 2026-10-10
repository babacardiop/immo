import Link from "next/link";
import type { QuartierLanding } from "@/lib/content/quartiers";
import { quartierCatalogueHref } from "@/lib/content/quartiers";
import { WhatsAppCta } from "@/components/wa-cta";

export function QuartierCta({
  landing,
  channel = "acheter",
}: {
  landing: QuartierLanding;
  channel?: "acheter" | "louer";
}) {
  const href = quartierCatalogueHref(landing, channel);
  const label =
    channel === "acheter"
      ? `Voir les biens à vendre — ${landing.name}`
      : `Voir les locations — ${landing.name}`;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={href}
        className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
        data-testid="quartier-catalogue-cta"
      >
        {label}
      </Link>
      <WhatsAppCta
        text={`Bonjour EverGreen, je m’intéresse à ${landing.name} (${landing.city}).`}
        label="WhatsApp"
      />
    </div>
  );
}
