-- AlterTable
ALTER TABLE "Listing" ADD COLUMN "communeLabel" TEXT;

-- CreateTable
CREATE TABLE "Commune" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commune_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Commune_active_name_idx" ON "Commune"("active", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Commune_cityId_name_key" ON "Commune"("cityId", "name");

-- AddForeignKey
ALTER TABLE "Commune" ADD CONSTRAINT "Commune_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate Quartier → Commune: one placeholder commune per city named like the city
INSERT INTO "Commune" ("id", "name", "cityId", "active", "sortOrder", "createdAt", "updatedAt")
SELECT
  'migr_' || c."id",
  c."name",
  c."id",
  true,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "City" c;

-- Add communeId nullable first
ALTER TABLE "Quartier" ADD COLUMN "communeId" TEXT;

UPDATE "Quartier" q
SET "communeId" = 'migr_' || q."cityId";

ALTER TABLE "Quartier" ALTER COLUMN "communeId" SET NOT NULL;

-- Drop old city FK / unique
ALTER TABLE "Quartier" DROP CONSTRAINT "Quartier_cityId_fkey";
DROP INDEX IF EXISTS "Quartier_cityId_name_key";
ALTER TABLE "Quartier" DROP COLUMN "cityId";

-- CreateIndex
CREATE UNIQUE INDEX "Quartier_communeId_name_key" ON "Quartier"("communeId", "name");

-- AddForeignKey
ALTER TABLE "Quartier" ADD CONSTRAINT "Quartier_communeId_fkey" FOREIGN KEY ("communeId") REFERENCES "Commune"("id") ON DELETE CASCADE ON UPDATE CASCADE;
