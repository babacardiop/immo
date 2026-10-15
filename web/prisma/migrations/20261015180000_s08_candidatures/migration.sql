-- S08 candidatures location: roles CLIENT/LANDLORD + assignments + applications + lease

CREATE TYPE "AssignmentRole" AS ENUM ('LANDLORD', 'CO_LANDLORD', 'CANDIDATE', 'TENANT', 'BUYER', 'GUARANTOR');
CREATE TYPE "AssignmentStatus" AS ENUM ('INVITED', 'ACTIVE', 'ENDED', 'REVOKED', 'PROMOTED');
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED');
CREATE TYPE "LeaseStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ENDED', 'CANCELLED');
CREATE TYPE "DecisionMode" AS ENUM ('AGENCY_DECIDES', 'LANDLORD_DECIDES');

ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'CLIENT';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'LANDLORD';

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "convertedFromLeadId" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "User_convertedFromLeadId_key" ON "User"("convertedFromLeadId");

ALTER TABLE "Listing" ADD COLUMN IF NOT EXISTS "decisionMode" "DecisionMode" NOT NULL DEFAULT 'AGENCY_DECIDES';

ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "leadType" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "preferredSlot" TEXT;
CREATE INDEX IF NOT EXISTS "Lead_leadType_stage_idx" ON "Lead"("leadType", "stage");

CREATE TABLE IF NOT EXISTS "PropertyAssignment" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "AssignmentRole" NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'INVITED',
    "note" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PropertyAssignment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ApplicationRequirementSet" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Standard SN',
    "itemsJson" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ApplicationRequirementSet_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RentalApplication" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "completenessPct" INTEGER NOT NULL DEFAULT 0,
    "agentSummary" TEXT,
    "privacyNoticeVersion" TEXT,
    "privacyAcceptedAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "decidedAt" TIMESTAMP(3),
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RentalApplication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ApplicationDocument" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "requirementCode" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER,
    "originalName" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApplicationDocument_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Lease" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "tenantUserId" TEXT NOT NULL,
    "applicationId" TEXT,
    "status" "LeaseStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "rentFcfa" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lease_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PropertyAssignment_listingId_userId_role_key" ON "PropertyAssignment"("listingId", "userId", "role");
CREATE INDEX IF NOT EXISTS "PropertyAssignment_listingId_role_status_idx" ON "PropertyAssignment"("listingId", "role", "status");
CREATE INDEX IF NOT EXISTS "PropertyAssignment_userId_role_status_idx" ON "PropertyAssignment"("userId", "role", "status");

CREATE INDEX IF NOT EXISTS "ApplicationRequirementSet_listingId_active_idx" ON "ApplicationRequirementSet"("listingId", "active");

CREATE INDEX IF NOT EXISTS "RentalApplication_listingId_status_idx" ON "RentalApplication"("listingId", "status");
CREATE INDEX IF NOT EXISTS "RentalApplication_userId_status_idx" ON "RentalApplication"("userId", "status");
CREATE INDEX IF NOT EXISTS "RentalApplication_assignmentId_idx" ON "RentalApplication"("assignmentId");

CREATE UNIQUE INDEX IF NOT EXISTS "ApplicationDocument_storageKey_key" ON "ApplicationDocument"("storageKey");
CREATE INDEX IF NOT EXISTS "ApplicationDocument_applicationId_requirementCode_idx" ON "ApplicationDocument"("applicationId", "requirementCode");

CREATE UNIQUE INDEX IF NOT EXISTS "Lease_applicationId_key" ON "Lease"("applicationId");
CREATE INDEX IF NOT EXISTS "Lease_listingId_status_idx" ON "Lease"("listingId", "status");
CREATE INDEX IF NOT EXISTS "Lease_tenantUserId_status_idx" ON "Lease"("tenantUserId", "status");

DO $$ BEGIN
  ALTER TABLE "User" ADD CONSTRAINT "User_convertedFromLeadId_fkey" FOREIGN KEY ("convertedFromLeadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "PropertyAssignment" ADD CONSTRAINT "PropertyAssignment_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "PropertyAssignment" ADD CONSTRAINT "PropertyAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "ApplicationRequirementSet" ADD CONSTRAINT "ApplicationRequirementSet_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "RentalApplication" ADD CONSTRAINT "RentalApplication_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "RentalApplication" ADD CONSTRAINT "RentalApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "RentalApplication" ADD CONSTRAINT "RentalApplication_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "PropertyAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "ApplicationDocument" ADD CONSTRAINT "ApplicationDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "RentalApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "Lease" ADD CONSTRAINT "Lease_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "Lease" ADD CONSTRAINT "Lease_tenantUserId_fkey" FOREIGN KEY ("tenantUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "Lease" ADD CONSTRAINT "Lease_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "RentalApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
