/**
 * Join Géo Sénégal Localité points (from Topo200K tiles) onto LOW/MISSING quartiers.
 *
 * Prerequisite: tmp-geo/geosenegal-localites.json
 *   built by: npx tsx tmp-geo/fetch-geosenegal-localites.mjs
 *
 * Usage:
 *   npm run locations:backfill-geo:geosenegal:dry
 *   npm run locations:backfill-geo:geosenegal
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-geo");
const SOURCE = path.join(TMP, "geosenegal-localites.json");
const MATCHES = path.join(TMP, "geosenegal-matches.json");
const REPORT = path.join(TMP, "geosenegal-backfill-report.json");
const DRY = process.argv.includes("--dry") || process.argv.includes("--dry-run");

function fold(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function nameKeys(name) {
  const keys = new Set();
  const add = (raw) => {
    const f = fold(raw);
    if (!f) return;
    keys.add(f);
    keys.add(f.replace(/^(cite|village|hameau|quartier)\s+/, "").trim());
    keys.add(f.replace(/\s+\(.*\)$/, "").trim());
  };
  add(name);
  return [...keys].filter(Boolean);
}

function esc(s) {
  return String(s).replace(/'/g, "''");
}

function buildMatches() {
  const exportR = spawnSync(
    "npx",
    ["tsx", "--env-file=.env", "tmp-geo/export-gaps.mjs"],
    { cwd: ROOT, stdio: "inherit", shell: true },
  );
  if (exportR.status !== 0) throw new Error("export-gaps failed");
  if (!fs.existsSync(SOURCE)) {
    throw new Error(
      `Missing ${SOURCE}. Run: npx tsx tmp-geo/fetch-geosenegal-localites.mjs`,
    );
  }
  const src = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  const by = new Map();
  for (const p of src.places ?? []) {
    for (const k of nameKeys(p.name)) {
      const arr = by.get(k) ?? [];
      arr.push(p);
      by.set(k, arr);
    }
  }
  const gaps = JSON.parse(fs.readFileSync(path.join(TMP, "gaps.json"), "utf8"));
  const matches = [];
  let miss = 0;
  let ambiguous = 0;
  for (const g of gaps) {
    let cands = [];
    for (const k of nameKeys(g.name)) {
      cands = cands.concat(by.get(k) ?? []);
    }
    // dedupe by lat/lng
    const seen = new Set();
    cands = cands.filter((c) => {
      const id = `${c.lat},${c.lng},${fold(c.name)}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    if (!cands.length) {
      miss++;
      continue;
    }
    if (cands.length > 1) {
      // Prefer candidate closest to city region centroid soft — else skip if spread > 0.5°
      const lats = cands.map((c) => c.lat);
      const lngs = cands.map((c) => c.lng);
      const dLat = Math.max(...lats) - Math.min(...lats);
      const dLng = Math.max(...lngs) - Math.min(...lngs);
      if (dLat > 0.5 || dLng > 0.5) {
        ambiguous++;
        continue;
      }
    }
    const chosen = cands[0];
    matches.push({
      name: g.name,
      city: g.city,
      region: g.region,
      centerLat: chosen.lat,
      centerLng: chosen.lng,
      geoSource: "GEOSENEGAL",
      geoStatus: "OK",
      geoExternalId: `geosenegal:localite:${fold(chosen.name)}`,
      gsName: chosen.name,
    });
  }
  const out = { matches, miss, ambiguousSkipped: ambiguous, gaps: gaps.length };
  fs.writeFileSync(MATCHES, JSON.stringify(out));
  return out;
}

async function applyDb(matches) {
  const prisma = new PrismaClient();
  const fetchedAt = new Date();
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _gs_geo_stage`);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE _gs_geo_stage (
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
      .map(
        (m) =>
          `('${esc(m.city)}','${esc(m.name)}',${Number(m.centerLat)},${Number(m.centerLng)},'${esc(m.geoSource)}','${esc(m.geoStatus)}','${esc(m.geoExternalId)}')`,
      )
      .join(",");
    await prisma.$executeRawUnsafe(
      `INSERT INTO _gs_geo_stage
        (city_name, quartier_name, center_lat, center_lng, geo_source, geo_status, geo_external_id)
       VALUES ${values}`,
    );
  }
  const updated = await prisma.$executeRawUnsafe(`
    UPDATE "Quartier" q
    SET
      "centerLat" = s.center_lat,
      "centerLng" = s.center_lng,
      "geoSource" = s.geo_source,
      "geoStatus" = s.geo_status,
      "geoExternalId" = s.geo_external_id,
      "geoFetchedAt" = '${fetchedAt.toISOString()}'::timestamp
    FROM _gs_geo_stage s
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
    WHERE q."geoSource" = 'GEOSENEGAL'
      AND l.city IS NOT NULL
      AND l."quartierLabel" IS NOT NULL
      AND lower(l.city) = lower(c.name)
      AND lower(l."quartierLabel") = lower(q.name)
  `);
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _gs_geo_stage`);
  const stats = await prisma.quartier.groupBy({ by: ["geoStatus"], _count: true });
  await prisma.$disconnect();
  return { updated: Number(updated), listings: Number(listings), stats };
}

async function main() {
  console.log("Matching Géo Sénégal Localité ↔ gaps…");
  const payload = buildMatches();
  console.log(
    JSON.stringify(
      {
        gaps: payload.gaps,
        matches: payload.matches.length,
        miss: payload.miss,
        ambiguousSkipped: payload.ambiguousSkipped,
      },
      null,
      2,
    ),
  );
  const report = {
    ...payload,
    matchCount: payload.matches.length,
    dry: DRY,
    sample: payload.matches.slice(0, 15),
  };
  if (DRY) {
    fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
    console.log("Dry-run OK.");
    return;
  }
  console.log("Applying to DB…");
  const db = await applyDb(payload.matches);
  Object.assign(report, db);
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        matches: report.matchCount,
        updated: db.updated,
        listings: db.listings,
        geoStatus: db.stats,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
