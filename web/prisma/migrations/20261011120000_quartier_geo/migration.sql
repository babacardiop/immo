-- AlterTable
ALTER TABLE "Quartier" ADD COLUMN     "centerLat" DOUBLE PRECISION,
ADD COLUMN     "centerLng" DOUBLE PRECISION,
ADD COLUMN     "geoSource" TEXT,
ADD COLUMN     "geoStatus" TEXT,
ADD COLUMN     "geoExternalId" TEXT,
ADD COLUMN     "geoFetchedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Quartier_geoStatus_idx" ON "Quartier"("geoStatus");
