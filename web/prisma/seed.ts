import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
} from "../src/lib/locations/senegal";

const prisma = new PrismaClient();

async function seedUsers() {
  const email = (
    process.env.SEED_AGENT_EMAIL ?? "agent@evergreen.sn"
  ).toLowerCase();
  const password = process.env.SEED_AGENT_PASSWORD ?? "ChangeMeStaging1!";
  const passwordHash = await bcrypt.hash(password, 12);

  const agent = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: UserRole.AGENT,
      name: "Agent Staging",
    },
    create: {
      email,
      name: "Agent Staging",
      role: UserRole.AGENT,
      passwordHash,
    },
  });
  console.log(`Seeded agent: ${agent.email} (${agent.role})`);

  const adminEmail = (
    process.env.SEED_ADMIN_EMAIL ?? "admin@evergreen.sn"
  ).toLowerCase();
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD ?? password;
  const adminHash = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: adminHash,
      role: UserRole.ADMIN,
      name: "Admin Staging",
    },
    create: {
      email: adminEmail,
      name: "Admin Staging",
      role: UserRole.ADMIN,
      passwordHash: adminHash,
    },
  });
  console.log(`Seeded admin: ${admin.email} (${admin.role})`);
}

async function seedLocations() {
  let cityCount = 0;
  let quartierCount = 0;

  for (const name of SENEGAL_CITIES) {
    await prisma.city.upsert({
      where: { name },
      update: { active: true },
      create: { name, active: true },
    });
    cityCount += 1;
  }

  for (const entry of SENEGAL_QUARTIERS) {
    const city = await prisma.city.findUnique({ where: { name: entry.city } });
    if (!city) {
      const created = await prisma.city.create({
        data: { name: entry.city, active: true },
      });
      cityCount += 1;
      await prisma.quartier.upsert({
        where: {
          cityId_name: { cityId: created.id, name: entry.name },
        },
        update: {
          active: true,
          aliases: entry.aliases ?? [],
        },
        create: {
          name: entry.name,
          cityId: created.id,
          aliases: entry.aliases ?? [],
          active: true,
        },
      });
      quartierCount += 1;
      continue;
    }

    await prisma.quartier.upsert({
      where: {
        cityId_name: { cityId: city.id, name: entry.name },
      },
      update: {
        active: true,
        aliases: entry.aliases ?? [],
      },
      create: {
        name: entry.name,
        cityId: city.id,
        aliases: entry.aliases ?? [],
        active: true,
      },
    });
    quartierCount += 1;
  }

  console.log(`Seeded locations: ${cityCount} cities, ${quartierCount} quartiers`);
}

async function main() {
  await seedUsers();
  await seedLocations();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
