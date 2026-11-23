// Upserts the candidate source list. Never overwrites human review fields.
import { prismaLab } from "../src/lib/db";
import { SEED_SOURCES } from "../src/lib/sources/seed";

async function main() {
  let created = 0;
  for (const s of SEED_SOURCES) {
    const existing = await prismaLab.source.findUnique({ where: { slug: s.slug } });
    if (existing) {
      await prismaLab.source.update({
        where: { slug: s.slug },
        data: { name: s.name, baseUrl: s.baseUrl, listingUrl: s.listingUrl ?? null, kind: s.kind, priority: s.priority },
      });
    } else {
      await prismaLab.source.create({
        data: { ...s, listingUrl: s.listingUrl ?? null, status: s.status ?? "CANDIDATE" },
      });
      created++;
    }
  }
  console.log(`Sources: ${SEED_SOURCES.length} in seed, ${created} created.`);
}

main().finally(() => prismaLab.$disconnect());
