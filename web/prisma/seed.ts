import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
} from "../src/lib/locations/senegal";
import { guessRegionForCity } from "../src/lib/locations/regions";

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
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? password;
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
  // Full replace of thesaurus (ANSD dump is authoritative for seed).
  await prisma.quartier.deleteMany({});
  await prisma.city.deleteMany({});

  // Cities first (small).
  for (const entry of SENEGAL_CITIES) {
    const region =
      entry.region || guessRegionForCity(entry.name) || "Dakar";
    await prisma.city.upsert({
      where: { name: entry.name },
      update: { active: true, region },
      create: { name: entry.name, active: true, region },
    });
  }

  const cities = await prisma.city.findMany({
    select: { id: true, name: true, region: true },
  });
  const cityByName = new Map(cities.map((c) => [c.name, c]));

  // Ensure any city referenced only by quartiers exists.
  for (const entry of SENEGAL_QUARTIERS) {
    if (cityByName.has(entry.city)) continue;
    const region =
      entry.region || guessRegionForCity(entry.city) || "Dakar";
    const created = await prisma.city.create({
      data: { name: entry.city, active: true, region },
    });
    cityByName.set(created.name, created);
  }

  const BATCH = 500;
  let quartierCount = 0;
  for (let i = 0; i < SENEGAL_QUARTIERS.length; i += BATCH) {
    const slice = SENEGAL_QUARTIERS.slice(i, i + BATCH);
    await prisma.quartier.createMany({
      data: slice.map((entry) => {
        const city = cityByName.get(entry.city)!;
        return {
          name: entry.name,
          cityId: city.id,
          aliases: entry.aliases ?? [],
          active: true,
        };
      }),
      skipDuplicates: true,
    });
    quartierCount += slice.length;
    if ((i / BATCH) % 10 === 0) {
      console.log(`  quartiers… ${Math.min(i + BATCH, SENEGAL_QUARTIERS.length)}/${SENEGAL_QUARTIERS.length}`);
    }
  }

  console.log(
    `Seeded locations: ${cityByName.size} cities, ${quartierCount} quartiers (upserted/skipped)`,
  );
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
