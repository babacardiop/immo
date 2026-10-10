-- AlterEnum
ALTER TYPE "LeadStage" ADD VALUE 'NURTURE';

-- CreateEnum
CREATE TYPE "LeadEventType" AS ENUM ('CREATED', 'STAGE_CHANGE', 'NOTE', 'SYSTEM');

-- AlterTable Lead
ALTER TABLE "Lead" ADD COLUMN     "sourceDetail" TEXT,
ADD COLUMN     "consentContact" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstTouchAt" TIMESTAMP(3),
ADD COLUMN     "slaDueAt" TIMESTAMP(3),
ADD COLUMN     "utmSource" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmCampaign" TEXT;

-- CreateTable
CREATE TABLE "LeadEvent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "type" "LeadEventType" NOT NULL,
    "fromStage" "LeadStage",
    "toStage" "LeadStage",
    "body" TEXT,
    "actorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadEvent_leadId_createdAt_idx" ON "LeadEvent"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_assigneeId_stage_createdAt_idx" ON "Lead"("assigneeId", "stage", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_stage_slaDueAt_idx" ON "Lead"("stage", "slaDueAt");

-- CreateIndex
CREATE INDEX "Lead_listingId_idx" ON "Lead"("listingId");

-- CreateIndex
CREATE INDEX "Lead_phone_idx" ON "Lead"("phone");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadEvent" ADD CONSTRAINT "LeadEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadEvent" ADD CONSTRAINT "LeadEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
