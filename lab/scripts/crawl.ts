// Run one connector. Usage:
//   npm run crawl -- --source=expat-dakar --pages=30
// Politeness lives in PoliteFetcher (robots, ≥5 s between requests, stop on 403/429/anti-bot).
import { prismaLab } from "../src/lib/db";
import { CONNECTORS } from "../src/lib/connectors";
import { runIngest } from "../src/lib/crawl/ingest";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

async function main() {
  const slug = arg("source");
  const connector = CONNECTORS.find((c) => c.slug === slug);
  if (!connector) {
    console.error(`Unknown --source. Available: ${CONNECTORS.map((c) => c.slug).join(", ")}`);
    process.exit(1);
  }
  const maxPages = Number(arg("pages") ?? 10);
  console.log(`Crawl ${slug}: up to ${maxPages} pages`);
  const r = await runIngest(connector, {
    maxPages,
    stopAfterStalePages: 3,
    log: (m) => console.log(`  ${m}`),
  });
  console.log(
    `${r.status}: ${r.fetched} pages · +${r.inserted} nouvelles · ${r.updated} modifiées · ${r.unchanged} inchangées · ${r.errors} erreurs${r.notes ? ` · ${r.notes}` : ""}`,
  );
}

main().finally(() => prismaLab.$disconnect());
