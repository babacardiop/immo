-- Post-mortem visite réalisée (S08)

CREATE TYPE "VisitOutcome" AS ENUM (
  'NOT_INTERESTED',
  'CONTINUE',
  'VISIT_OTHER_RENTALS',
  'NEEDS_TIME',
  'NO_SHOW',
  'OTHER'
);

CREATE TABLE "VisitReport" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "listingId" TEXT,
    "conductedById" TEXT NOT NULL,
    "conductedAt" TIMESTAMP(3) NOT NULL,
    "outcome" "VisitOutcome" NOT NULL,
    "outcomeMotif" TEXT,
    "agentNotes" TEXT,
    "wantsOtherListings" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VisitReport_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "VisitReport_leadId_conductedAt_idx" ON "VisitReport"("leadId", "conductedAt");
CREATE INDEX "VisitReport_conductedById_conductedAt_idx" ON "VisitReport"("conductedById", "conductedAt");
CREATE INDEX "VisitReport_listingId_idx" ON "VisitReport"("listingId");
CREATE INDEX "VisitReport_outcome_idx" ON "VisitReport"("outcome");

ALTER TABLE "VisitReport" ADD CONSTRAINT "VisitReport_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VisitReport" ADD CONSTRAINT "VisitReport_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "VisitReport" ADD CONSTRAINT "VisitReport_conductedById_fkey" FOREIGN KEY ("conductedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
