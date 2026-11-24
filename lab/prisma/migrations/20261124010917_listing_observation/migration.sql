-- CreateTable
CREATE TABLE "ListingObservation" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "runId" TEXT,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priceXof" BIGINT,
    "surfaceM2" DOUBLE PRECISION,
    "contentHash" TEXT NOT NULL,

    CONSTRAINT "ListingObservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListingObservation_listingId_observedAt_idx" ON "ListingObservation"("listingId", "observedAt");

-- AddForeignKey
ALTER TABLE "ListingObservation" ADD CONSTRAINT "ListingObservation_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "ListingRaw"("id") ON DELETE CASCADE ON UPDATE CASCADE;
