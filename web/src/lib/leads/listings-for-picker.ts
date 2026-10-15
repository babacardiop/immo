import { prisma } from "@/lib/prisma";

export type ListingOption = {
  id: string;
  title: string;
  reference: string | null;
  city: string | null;
  status: string;
};

/** Annonces sélectionnables pour consigner une visite (hors archivées). */
export async function listingsForVisitPicker(opts: {
  agentId: string;
  staff: boolean;
}): Promise<ListingOption[]> {
  return prisma.listing.findMany({
    where: {
      status: { not: "ARCHIVED" },
      ...(opts.staff ? {} : { agentId: opts.agentId }),
    },
    orderBy: { updatedAt: "desc" },
    take: 200,
    select: {
      id: true,
      title: true,
      reference: true,
      city: true,
      status: true,
    },
  });
}
