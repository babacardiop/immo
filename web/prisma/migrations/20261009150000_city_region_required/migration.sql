-- Backfill any missing regions before NOT NULL
UPDATE "City" SET "region" = 'Dakar' WHERE "region" IS NULL OR "region" = '';

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "region" SET NOT NULL;

-- DropIndex
DROP INDEX IF EXISTS "City_region_idx";

-- CreateIndex
CREATE INDEX "City_region_name_idx" ON "City"("region", "name");
