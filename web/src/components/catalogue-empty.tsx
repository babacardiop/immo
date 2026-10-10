import type { CatalogueChannel } from "@/lib/listings/public-query";
import { EmptyState } from "@/components/empty-state";

export function CatalogueEmpty({ channel }: { channel: CatalogueChannel }) {
  const label = channel === "acheter" ? "acheter" : "louer";
  return (
    <EmptyState
      title="Aucun bien pour ces critères"
      description="Élargissez les filtres ou contactez-nous — le stock évolue chaque semaine."
      resetHref={`/${channel}`}
      waText={`Bonjour EverGreen, je cherche à ${label} — pouvez-vous m’aider ?`}
    />
  );
}
