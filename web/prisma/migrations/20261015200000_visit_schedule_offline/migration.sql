-- Visites planifiées / offline + clôture outcome

CREATE TYPE "VisitStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "VisitSource" AS ENUM ('ONLINE_REQUEST', 'OFFLINE', 'PHONE', 'WALK_IN', 'WHATSAPP');

ALTER TABLE "VisitReport" ADD COLUMN IF NOT EXISTS "status" "VisitStatus" NOT NULL DEFAULT 'COMPLETED';
ALTER TABLE "VisitReport" ADD COLUMN IF NOT EXISTS "source" "VisitSource" NOT NULL DEFAULT 'ONLINE_REQUEST';
ALTER TABLE "VisitReport" ADD COLUMN IF NOT EXISTS "scheduledAt" TIMESTAMP(3);

-- Allow planned visits without outcome / conductedAt yet
ALTER TABLE "VisitReport" ALTER COLUMN "conductedAt" DROP NOT NULL;
ALTER TABLE "VisitReport" ALTER COLUMN "outcome" DROP NOT NULL;

-- Existing rows = completed online post-mortems
UPDATE "VisitReport" SET "status" = 'COMPLETED' WHERE "conductedAt" IS NOT NULL;
UPDATE "VisitReport" SET "scheduledAt" = "conductedAt" WHERE "scheduledAt" IS NULL AND "conductedAt" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "VisitReport_conductedById_status_scheduledAt_idx" ON "VisitReport"("conductedById", "status", "scheduledAt");
CREATE INDEX IF NOT EXISTS "VisitReport_status_scheduledAt_idx" ON "VisitReport"("status", "scheduledAt");
CREATE INDEX IF NOT EXISTS "VisitReport_leadId_scheduledAt_idx" ON "VisitReport"("leadId", "scheduledAt");
