import type {
  PaperType,
  Prisma,
  PropertyType,
  TransactionType,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isSaleLike } from "@/lib/listings/paper";
import { cityNamesForRegions } from "@/lib/locations/cities-for-region";

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

export type CatalogueView = "list" | "map";

export type CatalogueFilters = {
  /** One or more Senegal régions (multi-select). */
  regions?: string[];
  city?: string;
  quartier?: string;
  propertyType?: PropertyType;
  paperType?: PaperType;
  /** Narrow within channel (e.g. SHORT_TERM_RENT on /louer). */
  transaction?: TransactionType;
  priceMin?: number;
  priceMax?: number;
  /** 1-based page for list view. */
  page?: number;
  take?: number;
  /** @deprecated prefer page — kept for older links */
  cursor?: string;
  /** UI only — not part of Prisma where. */
  view?: CatalogueView;
};

export const CATALOGUE_PAGE_SIZE = 24;

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
  };

  const and: Prisma.ListingWhereInput[] = [];

  // Courte durée filter also includes RENT listings flagged alsoShortTerm
  if (transactionFilter === "SHORT_TERM_RENT") {
    and.push({
      OR: [
        { transaction: "SHORT_TERM_RENT" },
        { transaction: "RENT", alsoShortTerm: true },
      ],
    });
  } else if (transactionFilter) {
    where.transaction = transactionFilter;
  } else {
    where.transaction = { in: allowed };
  }

  if (filters.city?.trim()) {
    where.city = { equals: filters.city.trim(), mode: "insensitive" };
  } else if (filters.regions && filters.regions.length > 0) {
    const cities = cityNamesForRegions(filters.regions);
    if (cities.length > 0) {
      and.push({
        OR: cities.map((name) => ({
          city: { equals: name, mode: "insensitive" as const },
        })),
      });
    } else {
      // Unknown region → match nothing
      where.city = { equals: "__no_region_match__" };
    }
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

  if (and.length > 0) where.AND = and;

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
): Promise<{
  items: PublicListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const pageSize = Math.min(
    Math.max(filters.take ?? CATALOGUE_PAGE_SIZE, 1),
    48,
  );
  const requestedPage = Math.max(1, filters.page ?? 1);
  const where = buildPublicWhere(channel, filters);

  const total = await prisma.listing.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const page = Math.min(requestedPage, totalPages);

  const items = await prisma.listing.findMany({
    where,
    include: listInclude,
    orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return { items, total, page, pageSize, totalPages };
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
