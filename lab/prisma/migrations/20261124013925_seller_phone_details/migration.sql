-- AlterTable
ALTER TABLE "ListingRaw" ADD COLUMN     "description" TEXT,
ADD COLUMN     "detailFetchedAt" TIMESTAMP(3),
ADD COLUMN     "sellerPhone" TEXT;

-- CreateIndex
CREATE INDEX "ListingRaw_sellerPhone_idx" ON "ListingRaw"("sellerPhone");
