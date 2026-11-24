import { createHash } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { prismaLab } from "@/lib/db";
import type { Connector, ParsedDetail, ParsedListing } from "@/lib/connectors/types";
import { CrawlBlockedError, PoliteFetcher } from "@/lib/crawl/polite-fetcher";

/** Hash of the index-page fields that matter for change detection. */
export function contentHash(l: ParsedListing) {
  const key = [l.title, l.transaction, l.propertyType, l.priceXof?.toString(), l.surfaceM2, l.bedrooms, l.locationRaw]
    .map((v) => v ?? "")
    .join("|");
  return createHash("sha256").update(key).digest("hex");
}

export type IngestOptions = {
  maxPages: number;
  /** Max ad pages fetched this run (new / changed ads first, then backfill). 0 = none. */
  maxDetails?: number;
  /** Stop after this many consecutive pages without a single new ad. */
  stopAfterStalePages?: number;
  triggeredById?: string | null;
  log?: (msg: string) => void;
};

/** Detail values win over index values, but never erase them with null. */
function detailData(d: ParsedDetail): Prisma.ListingRawUpdateInput {
  const data: Record<string, unknown> = { detailFetchedAt: new Date() };
  for (const [k, v] of Object.entries(d)) if (v != null) data[k] = v;
  return data as Prisma.ListingRawUpdateInput;
}

export async function runIngest(connector: Connector, opts: IngestOptions) {
  const log = opts.log ?? (() => {});
  const source = await prismaLab.source.findUniqueOrThrow({ where: { slug: connector.slug } });
  if (source.status === "EXCLUDED" || source.status === "DEAD") {
    throw new Error(`Source ${source.slug} is ${source.status} — refusing to crawl`);
  }
  if (!source.tosReviewed) throw new Error(`Source ${source.slug}: ToS not reviewed — refusing to crawl`);

  const run = await prismaLab.ingestRun.create({
    data: { sourceId: source.id, kind: "CRAWL", triggeredById: opts.triggeredById ?? null },
  });
  const stats = { fetched: 0, inserted: 0, updated: 0, unchanged: 0, details: 0, errors: 0 };
  const fetcher = new PoliteFetcher(source.baseUrl);
  const maxDetails = connector.parseDetail ? (opts.maxDetails ?? 0) : 0;
  let status: "SUCCEEDED" | "PARTIAL" | "FAILED" = "SUCCEEDED";
  let notes = "";
  let stale = 0;

  const fetchDetail = async (id: string, url: string) => {
    if (stats.details >= maxDetails) return;
    try {
      const d = connector.parseDetail!(await fetcher.get(url));
      await prismaLab.listingRaw.update({ where: { id }, data: detailData(d) });
      stats.details++;
    } catch (e) {
      if (e instanceof CrawlBlockedError) throw e;
      stats.errors++;
      log(`détail ${url}: ${(e as Error).message}`);
    }
  };

  try {
    for (let page = 1; page <= opts.maxPages; page++) {
      const url = connector.pageUrl(page);
      let listings: ParsedListing[];
      try {
        listings = connector.parseIndex(await fetcher.get(url));
        stats.fetched++;
      } catch (e) {
        if (e instanceof CrawlBlockedError) throw e;
        stats.errors++;
        log(`page ${page}: ${(e as Error).message}`);
        continue;
      }
      if (listings.length === 0) {
        notes = `page ${page} vide — fin des résultats`;
        break;
      }

      const existing = await prismaLab.listingRaw.findMany({
        where: { sourceId: source.id, externalId: { in: listings.map((l) => l.externalId) } },
        select: { id: true, externalId: true, contentHash: true, detailFetchedAt: true },
      });
      const byId = new Map(existing.map((e) => [e.externalId, e]));
      const needDetail: { id: string; url: string }[] = [];
      let newOnPage = 0;
      const now = new Date();

      for (const l of listings) {
        const hash = contentHash(l);
        const prev = byId.get(l.externalId);
        const fields = {
          url: l.url,
          title: l.title,
          transaction: l.transaction,
          propertyType: l.propertyType,
          priceXof: l.priceXof,
          priceRaw: l.priceRaw,
          surfaceM2: l.surfaceM2,
          bedrooms: l.bedrooms,
          city: l.city,
          locationRaw: l.locationRaw,
          agencyName: l.sellerName,
          ...(l.sellerPhone ? { sellerPhone: l.sellerPhone } : {}),
          contentHash: hash,
        };
        const observation = { create: { runId: run.id, priceXof: l.priceXof, surfaceM2: l.surfaceM2, contentHash: hash } };

        if (!prev) {
          const created = await prismaLab.listingRaw.create({
            data: { ...fields, sourceId: source.id, externalId: l.externalId, postedAt: l.postedAt, lastRunId: run.id, observations: observation },
            select: { id: true },
          });
          byId.set(l.externalId, { id: created.id, externalId: l.externalId, contentHash: hash, detailFetchedAt: null });
          needDetail.push({ id: created.id, url: l.url });
          stats.inserted++;
          newOnPage++;
        } else if (prev.contentHash !== hash) {
          await prismaLab.listingRaw.update({
            where: { id: prev.id },
            data: { ...fields, lastSeenAt: now, removedAt: null, lastRunId: run.id, observations: observation },
          });
          needDetail.push({ id: prev.id, url: l.url });
          stats.updated++;
        } else {
          await prismaLab.listingRaw.update({
            where: { id: prev.id },
            data: { lastSeenAt: now, removedAt: null, lastRunId: run.id, ...(l.sellerPhone ? { sellerPhone: l.sellerPhone } : {}) },
          });
          if (!prev.detailFetchedAt) needDetail.push({ id: prev.id, url: l.url });
          stats.unchanged++;
        }
      }

      for (const d of needDetail) await fetchDetail(d.id, d.url);
      log(`page ${page}: ${listings.length} annonces, ${newOnPage} nouvelles, détails ${stats.details}/${maxDetails}`);
      stale = newOnPage === 0 ? stale + 1 : 0;
      if (opts.stopAfterStalePages && stale >= opts.stopAfterStalePages && stats.details >= maxDetails) {
        notes = `${stale} pages sans nouveauté — arrêt`;
        break;
      }
    }

    // Backfill: older ads of this source never opened yet, while budget remains.
    if (stats.details < maxDetails) {
      const backlog = await prismaLab.listingRaw.findMany({
        where: { sourceId: source.id, detailFetchedAt: null, removedAt: null },
        orderBy: { lastSeenAt: "desc" },
        take: maxDetails - stats.details,
        select: { id: true, url: true },
      });
      for (const b of backlog) await fetchDetail(b.id, b.url);
      if (backlog.length) log(`rattrapage détails : ${backlog.length}`);
    }
  } catch (e) {
    status = e instanceof CrawlBlockedError ? "PARTIAL" : "FAILED";
    notes = (e as Error).message;
    log(`STOP: ${notes}`);
    if (e instanceof CrawlBlockedError) {
      await prismaLab.source.update({ where: { id: source.id }, data: { status: "PAUSED", notes: `Auto-pause : ${notes}` } });
    }
  }

  await prismaLab.ingestRun.update({
    where: { id: run.id },
    data: {
      status,
      finishedAt: new Date(),
      fetched: stats.fetched + stats.details,
      inserted: stats.inserted,
      updated: stats.updated,
      errors: stats.errors,
      notes: [notes, `index: ${stats.fetched}`, `détails: ${stats.details}`, `inchangées: ${stats.unchanged}`].filter(Boolean).join(" · "),
    },
  });
  if (status !== "FAILED" && source.status === "APPROVED") {
    await prismaLab.source.update({ where: { id: source.id }, data: { status: "ACTIVE", enabled: true } });
  }
  return { runId: run.id, status, ...stats, notes };
}
