/**
 * Join HDX Senegal Settlements (ANSD/OCHA 2017) onto LOW/MISSING quartiers.
 *
 * Prerequisite:
 *   tmp-geo/sen_settlements.xlsx
 *   (from https://data.humdata.org/dataset/senegal-settlements)
 *
 * Builds matches via Python (openpyxl), then bulk-updates Postgres.
 *
 * Usage:
 *   npm run locations:backfill-geo:hdx:dry
 *   npm run locations:backfill-geo:hdx
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-geo");
const XLSX = path.join(TMP, "sen_settlements.xlsx");
const MATCHES = path.join(TMP, "hdx-matches.json");
const REPORT = path.join(TMP, "hdx-backfill-report.json");
const DRY = process.argv.includes("--dry") || process.argv.includes("--dry-run");

function ensureXlsx() {
  if (fs.existsSync(XLSX) && fs.statSync(XLSX).size > 1000) return;
  console.log("Downloading HDX settlements XLSX…");
  fs.mkdirSync(TMP, { recursive: true });
  const url =
    "https://data.humdata.org/dataset/199dc2ce-16d1-4192-80d0-c711ed7b0771/resource/37802011-bec5-4968-9a33-0be8eb409c00/download/sen_populatedplaces_tabulardata.xlsx";
  const r = spawnSync(
    "curl.exe",
    ["-sL", url, "-o", XLSX, "--max-time", "180"],
    { stdio: "inherit" },
  );
  if (r.status !== 0 || !fs.existsSync(XLSX)) {
    throw new Error("Failed to download HDX settlements XLSX");
  }
}

function runPythonMatch() {
  const exportR = spawnSync(
    "npx",
    ["tsx", "--env-file=.env", "tmp-geo/export-gaps.mjs"],
    { cwd: ROOT, stdio: "inherit", shell: true },
  );
  if (exportR.status !== 0) throw new Error("export-gaps failed");

  const py = path.join(TMP, "build-hdx-matches.py");
  const r = spawnSync("python", [py], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) throw new Error("Python HDX match failed");
}

function esc(s) {
  return String(s).replace(/'/g, "''");
}

async function applyDb(matches) {
  const prisma = new PrismaClient();
  const fetchedAt = new Date();
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _hdx_geo_stage`);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE _hdx_geo_stage (
      city_name TEXT NOT NULL,
      quartier_name TEXT NOT NULL,
      center_lat DOUBLE PRECISION NOT NULL,
      center_lng DOUBLE PRECISION NOT NULL,
      geo_source TEXT NOT NULL,
      geo_status TEXT NOT NULL,
      geo_external_id TEXT
    )
  `);

  const BATCH = 400;
  for (let i = 0; i < matches.length; i += BATCH) {
    const slice = matches.slice(i, i + BATCH);
    const values = slice
      .map((m) => {
        return `('${esc(m.city)}','${esc(m.name)}',${Number(m.centerLat)},${Number(m.centerLng)},'${esc(m.geoSource)}','${esc(m.geoStatus)}','${esc(m.geoExternalId)}')`;
      })
      .join(",");
    await prisma.$executeRawUnsafe(
      `INSERT INTO _hdx_geo_stage
        (city_name, quartier_name, center_lat, center_lng, geo_source, geo_status, geo_external_id)
       VALUES ${values}`,
    );
    if (i % 2000 === 0) {
      console.log(`  stage… ${Math.min(i + BATCH, matches.length)}/${matches.length}`);
    }
  }

  // Only upgrade LOW/MISSING — never overwrite OSM/GEONAMES/NOMINATIM/GOOGLE/MANUAL OK
  const updated = await prisma.$executeRawUnsafe(`
    UPDATE "Quartier" q
    SET
      "centerLat" = s.center_lat,
      "centerLng" = s.center_lng,
      "geoSource" = s.geo_source,
      "geoStatus" = s.geo_status,
      "geoExternalId" = s.geo_external_id,
      "geoFetchedAt" = '${fetchedAt.toISOString()}'::timestamp
    FROM _hdx_geo_stage s
    JOIN "City" c ON c.name = s.city_name
    WHERE q."cityId" = c.id
      AND q.name = s.quartier_name
      AND q."geoStatus" IN ('LOW', 'MISSING')
  `);

  const listings = await prisma.$executeRawUnsafe(`
    UPDATE "Listing" l
    SET "geoLat" = q."centerLat", "geoLng" = q."centerLng"
    FROM "Quartier" q
    JOIN "City" c ON c.id = q."cityId"
    WHERE q."geoSource" = 'HDX_ANSD'
      AND l.city IS NOT NULL
      AND l."quartierLabel" IS NOT NULL
      AND lower(l.city) = lower(c.name)
      AND lower(l."quartierLabel") = lower(q.name)
  `);

  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _hdx_geo_stage`);
  const stats = await prisma.quartier.groupBy({
    by: ["geoStatus"],
    _count: true,
  });
  const bySource = await prisma.quartier.groupBy({
    by: ["geoSource"],
    _count: true,
  });
  await prisma.$disconnect();
  return {
    updated: Number(updated),
    listings: Number(listings),
    stats,
    bySource,
  };
}

async function main() {
  fs.mkdirSync(TMP, { recursive: true });
  ensureXlsx();
  console.log("Matching HDX ↔ gaps…");
  runPythonMatch();
  const payload = JSON.parse(fs.readFileSync(MATCHES, "utf8"));
  const matches = payload.matches ?? [];
  console.log(`Matches ready: ${matches.length}`);

  const report = {
    gaps: payload.gaps,
    matches: matches.length,
    miss: payload.miss,
    ambiguousSkipped: payload.ambiguousSkipped,
    dry: DRY,
    sample: matches.slice(0, 20),
  };

  if (DRY) {
    fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    console.log("Dry-run — pass without --dry to apply.");
    return;
  }

  console.log("Applying to DB…");
  const db = await applyDb(matches);
  Object.assign(report, db);
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    matches: report.matches,
    miss: report.miss,
    ambiguousSkipped: report.ambiguousSkipped,
    updated: db.updated,
    listings: db.listings,
    geoStatus: db.stats,
  }, null, 2));
  console.log(`Wrote ${REPORT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
