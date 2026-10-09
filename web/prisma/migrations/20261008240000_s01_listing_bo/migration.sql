-- CreateEnum
CREATE TYPE "MandateType" AS ENUM ('EXCLUSIVE', 'SIMPLE');

-- CreateEnum
CREATE TYPE "MandateStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ENDED');

-- CreateEnum
CREATE TYPE "PricePeriod" AS ENUM ('MONTH');

-- CreateEnum
CREATE TYPE "GeoPrecision" AS ENUM ('EXACT', 'APPROX', 'ZONE');

-- CreateEnum
CREATE TYPE "MediaKind" AS ENUM ('PHOTO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "StorageBucket" AS ENUM ('PUBLIC', 'VAULT');

-- AlterTable Listing
ALTER TABLE "Listing"
ADD COLUMN     "nicad" TEXT,
ADD COLUMN     "edrDate" TIMESTAMP(3),
ADD COLUMN     "dossierNumber" TEXT,
ADD COLUMN     "titleNotes" TEXT,
ADD COLUMN     "deliberationDisclaimerAck" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pricePeriod" "PricePeriod" NOT NULL DEFAULT 'MONTH',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'XOF',
ADD COLUMN     "areaM2" DECIMAL(12,2),
ADD COLUMN     "areaHa" DECIMAL(12,4),
ADD COLUMN     "chargesFcfa" INTEGER,
ADD COLUMN     "depositMonths" DECIMAL(4,1),
ADD COLUMN     "installmentMonths" INTEGER,
ADD COLUMN     "installmentDownFcfa" INTEGER,
ADD COLUMN     "negotiable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "addressPublic" TEXT,
ADD COLUMN     "geoLat" DOUBLE PRECISION,
ADD COLUMN     "geoLng" DOUBLE PRECISION,
ADD COLUMN     "geoPrecision" "GeoPrecision" NOT NULL DEFAULT 'APPROX',
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "rooms" INTEGER,
ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "videoUrl" TEXT,
ADD COLUMN     "waPhone" TEXT,
ADD COLUMN     "showPhone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "archivedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Listing_agentId_status_idx" ON "Listing"("agentId", "status");

-- CreateIndex
CREATE INDEX "Listing_status_publishedAt_idx" ON "Listing"("status", "publishedAt");

-- CreateTable
CREATE TABLE "Mandate" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "type" "MandateType" NOT NULL DEFAULT 'SIMPLE',
    "reference" TEXT,
    "status" "MandateStatus" NOT NULL DEFAULT 'DRAFT',
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mandate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "listingId" TEXT,
    "mandateId" TEXT,
    "kind" "MediaKind" NOT NULL,
    "storage" "StorageBucket" NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mandate_listingId_key" ON "Mandate"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_key_key" ON "MediaAsset"("key");

-- CreateIndex
CREATE INDEX "MediaAsset_listingId_kind_sortOrder_idx" ON "MediaAsset"("listingId", "kind", "sortOrder");

-- AddForeignKey
ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_mandateId_fkey" FOREIGN KEY ("mandateId") REFERENCES "Mandate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
