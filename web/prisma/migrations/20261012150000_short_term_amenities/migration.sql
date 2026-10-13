-- AlterTable
ALTER TABLE "Listing" ADD COLUMN "alsoShortTerm" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Listing" ADD COLUMN "shortTermPriceFcfa" INTEGER;
ALTER TABLE "Listing" ADD COLUMN "shortTermPricePeriod" "PricePeriod";
ALTER TABLE "Listing" ADD COLUMN "minStayDays" INTEGER;
ALTER TABLE "Listing" ADD COLUMN "furnished" BOOLEAN;
