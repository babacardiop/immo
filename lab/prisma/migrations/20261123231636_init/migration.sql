-- CreateEnum
CREATE TYPE "SourceKind" AS ENUM ('CLASSIFIEDS', 'PORTAL', 'AGENCY', 'AGGREGATOR', 'DIRECTORY', 'SOCIAL');

-- CreateEnum
CREATE TYPE "SourceStatus" AS ENUM ('CANDIDATE', 'PROBED', 'APPROVED', 'ACTIVE', 'PAUSED', 'EXCLUDED', 'DEAD');

-- CreateEnum
CREATE TYPE "CrawlVerdict" AS ENUM ('OK', 'CAUTION', 'NO');

-- CreateEnum
CREATE TYPE "RenderMode" AS ENUM ('SERVER', 'EMBEDDED_JSON', 'CLIENT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Transaction" AS ENUM ('SALE', 'RENT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "IngestKind" AS ENUM ('CRAWL', 'CSV_IMPORT');

-- CreateEnum
CREATE TYPE "IngestStatus" AS ENUM ('RUNNING', 'SUCCEEDED', 'PARTIAL', 'FAILED');

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "listingUrl" TEXT,
    "kind" "SourceKind" NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'SN',
    "status" "SourceStatus" NOT NULL DEFAULT 'CANDIDATE',
    "priority" INTEGER NOT NULL DEFAULT 2,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "verdict" "CrawlVerdict",
    "verdictReasons" TEXT[],
    "renderMode" "RenderMode",
    "robotsAllowed" BOOLEAN,
    "crawlDelaySec" INTEGER,
    "sitemapUrls" TEXT[],
    "antiBot" TEXT,
    "lastProbedAt" TIMESTAMP(3),
    "tosUrl" TEXT,
    "tosReviewed" BOOLEAN NOT NULL DEFAULT false,
    "tosNotes" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceProbe" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "probedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT NOT NULL,
    "dnsOk" BOOLEAN NOT NULL,
    "robotsStatus" INTEGER,
    "robotsAllowed" BOOLEAN,
    "crawlDelaySec" INTEGER,
    "sitemapUrls" TEXT[],
    "pageStatus" INTEGER,
    "pageUrl" TEXT,
    "finalUrl" TEXT,
    "pageBytes" INTEGER,
    "durationMs" INTEGER,
    "antiBot" TEXT,
    "renderMode" "RenderMode",
    "priceHits" INTEGER,
    "linkCount" INTEGER,
    "hasJsonLd" BOOLEAN,
    "verdict" "CrawlVerdict" NOT NULL,
    "reasons" TEXT[],
    "error" TEXT,

    CONSTRAINT "SourceProbe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngestRun" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "kind" "IngestKind" NOT NULL,
    "status" "IngestStatus" NOT NULL DEFAULT 'RUNNING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "fetched" INTEGER NOT NULL DEFAULT 0,
    "inserted" INTEGER NOT NULL DEFAULT 0,
    "updated" INTEGER NOT NULL DEFAULT 0,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "triggeredById" TEXT,
    "notes" TEXT,

    CONSTRAINT "IngestRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingRaw" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lastRunId" TEXT,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removedAt" TIMESTAMP(3),
    "postedAt" TIMESTAMP(3),
    "title" TEXT,
    "transaction" "Transaction" NOT NULL DEFAULT 'UNKNOWN',
    "propertyType" TEXT,
    "priceXof" BIGINT,
    "priceRaw" TEXT,
    "surfaceM2" DOUBLE PRECISION,
    "rooms" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "city" TEXT,
    "locationRaw" TEXT,
    "quartierId" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "sellerType" TEXT,
    "agencyName" TEXT,
    "photoCount" INTEGER,
    "photoHashes" TEXT[],
    "contentHash" TEXT NOT NULL,
    "payloadKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingRaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quartier" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "commune" TEXT,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "aliases" TEXT[],
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "hubLocationId" TEXT,

    CONSTRAINT "Quartier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabAuditLog" (
    "id" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "meta" JSONB,

    CONSTRAINT "LabAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_slug_key" ON "Source"("slug");

-- CreateIndex
CREATE INDEX "Source_status_idx" ON "Source"("status");

-- CreateIndex
CREATE INDEX "Source_verdict_idx" ON "Source"("verdict");

-- CreateIndex
CREATE INDEX "SourceProbe_sourceId_probedAt_idx" ON "SourceProbe"("sourceId", "probedAt");

-- CreateIndex
CREATE INDEX "IngestRun_sourceId_startedAt_idx" ON "IngestRun"("sourceId", "startedAt");

-- CreateIndex
CREATE INDEX "ListingRaw_quartierId_transaction_idx" ON "ListingRaw"("quartierId", "transaction");

-- CreateIndex
CREATE INDEX "ListingRaw_lastSeenAt_idx" ON "ListingRaw"("lastSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "ListingRaw_sourceId_externalId_key" ON "ListingRaw"("sourceId", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Quartier_slug_key" ON "Quartier"("slug");

-- CreateIndex
CREATE INDEX "LabAuditLog_entity_entityId_idx" ON "LabAuditLog"("entity", "entityId");

-- AddForeignKey
ALTER TABLE "SourceProbe" ADD CONSTRAINT "SourceProbe_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngestRun" ADD CONSTRAINT "IngestRun_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingRaw" ADD CONSTRAINT "ListingRaw_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingRaw" ADD CONSTRAINT "ListingRaw_lastRunId_fkey" FOREIGN KEY ("lastRunId") REFERENCES "IngestRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingRaw" ADD CONSTRAINT "ListingRaw_quartierId_fkey" FOREIGN KEY ("quartierId") REFERENCES "Quartier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
