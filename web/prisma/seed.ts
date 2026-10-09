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
  let cityCount = 0;
  let quartierCount = 0;

  for (const entry of SENEGAL_CITIES) {
    const region =
      entry.region || guessRegionForCity(entry.name) || "Dakar";
    await prisma.city.upsert({
      where: { name: entry.name },
      update: { active: true, region },
      create: { name: entry.name, active: true, region },
    });
    cityCount += 1;
  }

  for (const entry of SENEGAL_QUARTIERS) {
    const region =
      entry.region || guessRegionForCity(entry.city) || "Dakar";
    let city = await prisma.city.findUnique({ where: { name: entry.city } });
    if (!city) {
      city = await prisma.city.create({
        data: { name: entry.city, active: true, region },
      });
      cityCount += 1;
    } else if (!city.region) {
      city = await prisma.city.update({
        where: { id: city.id },
        data: { region },
      });
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

  console.log(
    `Seeded locations: ${cityCount} cities, ${quartierCount} quartiers`,
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
