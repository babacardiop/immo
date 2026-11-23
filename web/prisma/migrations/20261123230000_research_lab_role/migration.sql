-- Research Lab access (sprint S0.4)
ALTER TYPE "UserRole" ADD VALUE 'RESEARCH_LAB';

ALTER TABLE "User" ADD COLUMN "labAccess" BOOLEAN NOT NULL DEFAULT false;
