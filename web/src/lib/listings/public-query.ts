import type {
  PaperType,
  Prisma,
  PropertyType,
  TransactionType,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isSaleLike } from "@/lib/listings/paper";

export const SALE_TRANSACTIONS: TransactionType[] = [
  "SALE",
  "INSTALLMENT_SALE",
  "RENT_TO_OWN",
];

export const RENT_TRANSACTIONS: TransactionType[] = [
  "RENT",
  "SHORT_TERM_RENT",
];

export type CatalogueChannel = "acheter" | "louer";

export type CatalogueFilters = {
  city?: string;
  quartier?: string;
  propertyType?: PropertyType;
  paperType?: PaperType;
  /** Narrow within channel (e.g. SHORT_TERM_RENT on /louer). */
  transaction?: TransactionType;
  priceMin?: number;
  priceMax?: number;
  cursor?: string;
  take?: number;
};

export function channelTransactions(
  channel: CatalogueChannel,
): TransactionType[] {
  return channel === "acheter" ? SALE_TRANSACTIONS : RENT_TRANSACTIONS;
}

export function publicListingPath(
  channel: CatalogueChannel,
  slug: string,
): string {
  return `/${channel}/${slug}`;
}

export function channelForTransaction(
  transaction: TransactionType,
): CatalogueChannel {
  return isSaleLike(transaction) ? "acheter" : "louer";
}

export function buildPublicWhere(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Prisma.ListingWhereInput {
  const allowed = channelTransactions(channel);
  const transactionFilter =
    filters.transaction && allowed.includes(filters.transaction)
      ? filters.transaction
      : undefined;

  const where: Prisma.ListingWhereInput = {
    status: "PUBLISHED",
    transaction: transactionFilter
      ? transactionFilter
      : { in: allowed },
  };

  if (filters.city?.trim()) {
    where.city = { equals: filters.city.trim(), mode: "insensitive" };
  }
  if (filters.quartier?.trim()) {
    where.quartierLabel = {
      contains: filters.quartier.trim(),
      mode: "insensitive",
    };
  }
  if (filters.propertyType) {
    where.propertyType = filters.propertyType;
  }
  if (channel === "acheter" && filters.paperType) {
    where.paperType = filters.paperType;
  }
  if (filters.priceMin != null || filters.priceMax != null) {
    where.priceFcfa = {};
    if (filters.priceMin != null) where.priceFcfa.gte = filters.priceMin;
    if (filters.priceMax != null) where.priceFcfa.lte = filters.priceMax;
  }

  return where;
}

const listInclude = {
  media: {
    where: { kind: "PHOTO" as const, storage: "PUBLIC" as const },
    orderBy: { sortOrder: "asc" as const },
    take: 1,
  },
} satisfies Prisma.ListingInclude;

export type PublicListItem = Prisma.ListingGetPayload<{
  include: typeof listInclude;
}>;

export async function listPublicListings(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Promise<{ items: PublicListItem[]; nextCursor: string | null }> {
  const take = Math.min(Math.max(filters.take ?? 12, 1), 48);
  const where = buildPublicWhere(channel, filters);

  const rows = await prisma.listing.findMany({
    where,
    include: listInclude,
    orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
    take: take + 1,
    ...(filters.cursor
      ? { cursor: { id: filters.cursor }, skip: 1 }
      : {}),
  });

  const hasMore = rows.length > take;
  const items = hasMore ? rows.slice(0, take) : rows;
  const nextCursor = hasMore ? (items[items.length - 1]?.id ?? null) : null;

  return { items, nextCursor };
}

export async function getPublishedListingBySlug(slug: string) {
  return prisma.listing.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      media: {
        where: { kind: "PHOTO", storage: "PUBLIC" },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function listFeaturedPublic(limit = 6) {
  return prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    include: listInclude,
    orderBy: [{ publishedAt: "desc" }],
    take: limit,
  });
}
