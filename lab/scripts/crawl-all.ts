// Crawl every crawlable source in parallel — one PoliteFetcher per site, so each
// host still sees ≥5 s between requests. Usage:
//   npm run crawl:all -- --pages=10 --details=150 [--only=expat-dakar,coinafrique-sn]
// A source is crawled when it has a registered connector, ToS reviewed, and
// status APPROVED / ACTIVE (EXCLUDED, PAUSED, DEAD, CANDIDATE are skipped).
import { prismaLab } from "../src/lib/db";
import { CONNECTORS } from "../src/lib/connectors";
import { runIngest } from "../src/lib/crawl/ingest";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

async function main() {
  const maxPages = Number(arg("pages") ?? 10);
  const maxDetails = Number(arg("details") ?? 150);
  const only = arg("only")?.split(",");

  const sources = await prismaLab.source.findMany({
    where: {
      slug: { in: CONNECTORS.map((c) => c.slug).filter((s) => !only || only.includes(s)) },
      status: { in: ["APPROVED", "ACTIVE"] },
      tosReviewed: true,
    },
    select: { slug: true, name: true },
  });
  const skipped = CONNECTORS.map((c) => c.slug).filter((s) => !sources.some((x) => x.slug === s));
  console.log(`Crawl en parallèle : ${sources.map((s) => s.slug).join(", ") || "(aucune)"}`);
  if (skipped.length) console.log(`Ignorées (statut / CGU) : ${skipped.join(", ")}`);

  const results = await Promise.allSettled(
    sources.map((s) =>
      runIngest(CONNECTORS.find((c) => c.slug === s.slug)!, {
        maxPages,
        maxDetails,
        stopAfterStalePages: 3,
        log: (m) => console.log(`[${s.slug}] ${m}`),
      }),
    ),
  );

  console.log("\nRésumé");
  results.forEach((r, i) => {
    const slug = sources[i].slug;
    if (r.status === "rejected") console.log(`  ${slug}: ÉCHEC ${(r.reason as Error).message}`);
    else
      console.log(
        `  ${slug}: ${r.value.status} · +${r.value.inserted} nouvelles · ${r.value.updated} modifiées · ${r.value.details} détails · ${r.value.errors} erreurs`,
      );
  });
}

main().finally(() => prismaLab.$disconnect());
