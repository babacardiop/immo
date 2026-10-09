-- AlterTable
ALTER TABLE "City" ADD COLUMN "region" TEXT;

-- CreateIndex
CREATE INDEX "City_region_idx" ON "City"("region");
