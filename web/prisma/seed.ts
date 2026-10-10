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

/** Demo geolocated listings so Carte view is non-empty on staging. */
async function seedDemoListings() {
  const agentEmail = (
    process.env.SEED_AGENT_EMAIL ?? "agent@evergreen.sn"
  ).toLowerCase();
  const agent = await prisma.user.findUnique({ where: { email: agentEmail } });
  if (!agent) {
    console.warn("Skip demo listings: agent not found");
    return;
  }

  const demos = [
    {
      slug: "villa-almadies-demo",
      title: "Villa contemporaine — Almadies",
      transaction: "SALE" as const,
      propertyType: "HOUSE" as const,
      paperType: "TF" as const,
      priceFcfa: 185_000_000,
      city: "Dakar",
      quartierLabel: "Almadies",
      geoLat: 14.7445,
      geoLng: -17.5252,
      bedrooms: 5,
      bathrooms: 4,
      areaM2: 450,
    },
    {
      slug: "appart-mermoz-demo",
      title: "Appartement 3 chambres — Mermoz",
      transaction: "SALE" as const,
      propertyType: "APARTMENT" as const,
      paperType: "TF" as const,
      priceFcfa: 95_000_000,
      city: "Dakar",
      quartierLabel: "Mermoz",
      geoLat: 14.7168,
      geoLng: -17.4725,
      bedrooms: 3,
      bathrooms: 2,
      areaM2: 120,
    },
    {
      slug: "location-point-e-demo",
      title: "F3 meublé — Point E",
      transaction: "RENT" as const,
      propertyType: "APARTMENT" as const,
      paperType: null,
      priceFcfa: 650_000,
      city: "Dakar",
      quartierLabel: "Point E",
      geoLat: 14.6955,
      geoLng: -17.4612,
      bedrooms: 3,
      bathrooms: 2,
      areaM2: 95,
    },
    {
      slug: "terrain-mbour-demo",
      title: "Terrain 300 m² — Mbour",
      transaction: "SALE" as const,
      propertyType: "LAND" as const,
      paperType: "DELIBERATION" as const,
      priceFcfa: 25_000_000,
      city: "Mbour",
      quartierLabel: "Centre",
      geoLat: 14.4112,
      geoLng: -16.9644,
      bedrooms: null,
      bathrooms: null,
      areaM2: 300,
    },
  ];

  for (const d of demos) {
    await prisma.listing.upsert({
      where: { slug: d.slug },
      update: {
        status: "PUBLISHED",
        publishedAt: new Date(),
        geoLat: d.geoLat,
        geoLng: d.geoLng,
        city: d.city,
        quartierLabel: d.quartierLabel,
        priceFcfa: d.priceFcfa,
      },
      create: {
        slug: d.slug,
        reference: `DEMO-${d.slug.slice(0, 8).toUpperCase()}`,
        status: "PUBLISHED",
        publishedAt: new Date(),
        transaction: d.transaction,
        propertyType: d.propertyType,
        title: d.title,
        description:
          "Annonce démo seed — pour tester Liste / Carte et filtres géo.",
        paperType: d.paperType,
        priceFcfa: d.priceFcfa,
        city: d.city,
        quartierLabel: d.quartierLabel,
        geoLat: d.geoLat,
        geoLng: d.geoLng,
        bedrooms: d.bedrooms,
        bathrooms: d.bathrooms,
        areaM2: d.areaM2,
        agentId: agent.id,
        deliberationDisclaimerAck: d.paperType === "DELIBERATION",
      },
    });
  }
  console.log(`Seeded ${demos.length} demo geolocated listings`);
}

async function main() {
  await seedUsers();
  await seedLocations();
  await seedDemoListings();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
