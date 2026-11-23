import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { prismaLab?: PrismaClient };

/** Lab DB client (evergreen_lab). Hub data is never reachable from here. */
export const prismaLab =
  g.prismaLab ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") g.prismaLab = prismaLab;
