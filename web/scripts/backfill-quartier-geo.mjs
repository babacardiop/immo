/**
 * One-shot free-source geo backfill for seeded quartiers.
 *
 * Sources (priority):
 *  1. OSM places (Geofabrik free shapefile) — neighbourhood / village points
 *  2. GeoNames SN dump — populated places
 *  3. Commune centroids from decoupage senegal.ts — ADMIN / LOW
 *
 * Writes:
 *  - tmp-geo/quartier-geo.json   (name+city+region → geo)
 *  - tmp-geo/backfill-report.json
 *  - optionally updates DB Quartier rows (--db)
 *
 * Usage:
 *   node scripts/backfill-quartier-geo.mjs
 *   node --env-file=.env scripts/backfill-quartier-geo.mjs --db
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-geo");
const APPLY_DB = process.argv.includes("--db");

function fold(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Extra lookup keys: strip Cité/Village prefixes, roman→arabic soft variants. */
function nameKeys(name, aliases = []) {
  const keys = new Set();
  const add = (raw) => {
    const f = fold(raw);
    if (!f) return;
    keys.add(f);
    keys.add(f.replace(/^(cite|village|hameau|quartier)\s+/, "").trim());
    keys.add(f.replace(/\s+\(.*\)$/, "").trim());
    // Liberté 6 / liberte vi style
    keys.add(
      f
        .replace(/\bii\b/g, "2")
        .replace(/\biii\b/g, "3")
        .replace(/\biv\b/g, "4")
        .replace(/\bvi\b/g, "6")
        .replace(/\bv\b/g, "5")
        .replace(/\bi\b/g, "1"),
    );
  };
  add(name);
  for (const a of aliases) add(a);
  return [...keys].filter(Boolean);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function loadSeed() {
  const mod = await import(
    pathToFileURL(path.join(ROOT, "src/lib/locations/senegal-quartiers-seed.ts"))
      .href
  );
  return mod.SENEGAL_QUARTIERS_SEED;
}

/** Parse GeoNames SN.txt → index by folded name. */
function loadGeoNames() {
  const file = path.join(TMP, "SN.txt");
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file} — download https://download.geonames.org/export/dump/SN.zip`);
  }
  const byName = new Map();
  const prefer = new Set(["PPL", "PPLX", "PPLA", "PPLA2", "PPLA3", "PPLA4", "PPLC", "ADM3", "ADM2"]);
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line) continue;
    const p = line.split("\t");
    const id = p[0];
    const name = p[1];
    const ascii = p[2];
    const alts = (p[3] || "").split(",");
    const lat = Number(p[4]);
    const lng = Number(p[5]);
    const fclass = p[6];
    const fcode = p[7];
    const admin1 = p[10]; // region code-ish
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    if (fclass !== "P" && fclass !== "A" && fclass !== "L") continue;
    if (!prefer.has(fcode) && fclass !== "P") continue;
    const rec = {
      lat,
      lng,
      source: "GEONAMES",
      externalId: `geonames:${id}`,
      fcode,
      admin1,
      name,
    };
    const keys = new Set([fold(name), fold(ascii), ...alts.map(fold)].filter(Boolean));
    for (const k of keys) {
      const arr = byName.get(k) ?? [];
      arr.push(rec);
      byName.set(k, arr);
    }
  }
  return byName;
}

function centroidOfGeometry(geometry) {
  if (!geometry) return null;
  if (geometry.type === "Point") {
    const [lng, lat] = geometry.coordinates;
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  }
  // Polygon / MultiPolygon — average of outer ring vertices (good enough for pin).
  let rings = [];
  if (geometry.type === "Polygon") rings = [geometry.coordinates[0] ?? []];
  else if (geometry.type === "MultiPolygon") {
    rings = geometry.coordinates.map((p) => p[0] ?? []);
  } else return null;
  let sx = 0;
  let sy = 0;
  let n = 0;
  for (const ring of rings) {
    for (const pt of ring) {
      if (!pt || pt.length < 2) continue;
      sx += pt[0];
      sy += pt[1];
      n += 1;
    }
  }
  if (!n) return null;
  return { lng: sx / n, lat: sy / n };
}

/** OSM Geofabrik places (points + area polygons) via shpjs. */
async function loadOsmPlaces() {
  let shapefile;
  try {
    shapefile = (await import("shpjs")).default;
  } catch {
    console.warn("shpjs not installed — skip OSM pass (npm i --no-save shpjs)");
    return new Map();
  }
  const zips = ["osm-places.zip", "osm-places-a.zip"].map((f) =>
    path.join(TMP, f),
  );
  const byName = new Map();
  const okPlaces = new Set([
    "city",
    "town",
    "village",
    "hamlet",
    "suburb",
    "neighbourhood",
    "neighborhood",
    "quarter",
    "locality",
    "isolated_dwelling",
  ]);
  for (const zipPath of zips) {
    if (!fs.existsSync(zipPath)) continue;
    const geo = await shapefile(fs.readFileSync(zipPath));
    for (const f of geo.features ?? []) {
      const props = f.properties ?? {};
      const name = props.name || props.NAME;
      const fclass = String(props.fclass || props.FCLASS || "").toLowerCase();
      if (!name || !okPlaces.has(fclass)) continue;
      const c = centroidOfGeometry(f.geometry);
      if (!c) continue;
      const rec = {
        lat: c.lat,
        lng: c.lng,
        source: "OSM",
        externalId: `osm:place:${props.osm_id || props.OSM_ID || name}`,
        fcode: fclass,
        name,
      };
      for (const k of nameKeys(name)) {
        const arr = byName.get(k) ?? [];
        arr.push(rec);
        byName.set(k, arr);
      }
    }
  }
  return byName;
}

/**
 * Parse decoupage senegal.ts without eval: extract commune { name, lat, lon }.
 * Localités inherit commune centroid as ADMIN.
 */
function loadCommuneCentroids() {
  const file = path.join(TMP, "senegal-api.ts");
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}`);
  }
  const text = fs.readFileSync(file, "utf8");
  const communes = new Map(); // fold(name) → {lat,lng,name}
  // Match blocks like: name: "Biscuiterie", lat: 14.72, lon: -17.46
  const re =
    /name:\s*"([^"]+)"\s*,\s*lat:\s*(-?[\d.]+)\s*,\s*lon:\s*(-?[\d.]+)/g;
  let m;
  while ((m = re.exec(text))) {
    const name = m[1];
    const lat = Number(m[2]);
    const lng = Number(m[3]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    communes.set(fold(name), { lat, lng, name });
  }

  // Also map localite name → commune centroid by scanning localites arrays.
  // Pattern: communes: [ { name: "X", lat:.., lon:.., localites: [ { name: "Y" }, ... ]
  const localiteToCommune = new Map();
  const communeBlocks =
    text.matchAll(
      /\{\s*name:\s*"([^"]+)"\s*,\s*lat:\s*(-?[\d.]+)\s*,\s*lon:\s*(-?[\d.]+)[^]*?localites:\s*\[([\s\S]*?)\]/g,
    );
  for (const block of communeBlocks) {
    const cName = block[1];
    const lat = Number(block[2]);
    const lng = Number(block[3]);
    const list = block[4];
    const cFold = fold(cName);
    communes.set(cFold, { lat, lng, name: cName });
    for (const lm of list.matchAll(/name:\s*"([^"]+)"/g)) {
      localiteToCommune.set(fold(lm[1]), {
        lat,
        lng,
        commune: cName,
        source: "ADMIN",
        externalId: `admin:commune:${cFold}`,
      });
    }
  }
  return { communes, localiteToCommune };
}

function regionHint(region) {
  // GeoNames admin1 for Senegal roughly: DK, TH, … — soft filter only
  const map = {
    Dakar: "DK",
    Thiès: "TH",
    Diourbel: "DB",
    Fatick: "FK",
    Kaolack: "KL",
    Kolda: "KD",
    Louga: "LG",
    Matam: "MT",
    "Saint-Louis": "SL",
    Tambacounda: "TC",
    Ziguinchor: "ZG",
    Kédougou: "KE",
    Sédhiou: "SE",
    Kaffrine: "KA",
  };
  return map[region] ?? null;
}

function pickCandidate(cands, region) {
  if (!cands?.length) return null;
  if (cands.length === 1) return cands[0];
  const hint = regionHint(region);
  if (hint) {
    const regional = cands.filter((c) => c.admin1 === hint);
    if (regional.length === 1) return regional[0];
    if (regional.length > 1) return regional[0];
  }
  // Prefer neighbourhood-like / PPLX over generic
  const ranked = [...cands].sort((a, b) => {
    const score = (x) => {
      const f = String(x.fcode || "").toLowerCase();
      if (f.includes("neighbourhood") || f.includes("suburb") || f === "pplx")
        return 0;
      if (f === "ppl" || f === "village" || f === "hamlet") return 1;
      if (f.startsWith("adm")) return 3;
      return 2;
    };
    return score(a) - score(b);
  });
  return ranked[0];
}

function matchOne(entry, { osm, geonames, admin }) {
  const keys = nameKeys(entry.name, entry.aliases ?? []);
  // 1) OSM
  for (const k of keys) {
    const hit = pickCandidate(osm.get(k), entry.region);
    if (hit) {
      return {
        centerLat: hit.lat,
        centerLng: hit.lng,
        geoSource: "OSM",
        geoStatus: "OK",
        geoExternalId: hit.externalId,
      };
    }
  }
  // 2) GeoNames
  for (const k of keys) {
    const hit = pickCandidate(geonames.get(k), entry.region);
    if (hit) {
      return {
        centerLat: hit.lat,
        centerLng: hit.lng,
        geoSource: "GEONAMES",
        geoStatus: "OK",
        geoExternalId: hit.externalId,
      };
    }
  }
  // 3) ADMIN — localité → commune centroid from ANSD-shaped tree
  for (const k of keys) {
    const hit = admin.localiteToCommune.get(k);
    if (hit) {
      return {
        centerLat: hit.lat,
        centerLng: hit.lng,
        geoSource: "ADMIN",
        geoStatus: "LOW",
        geoExternalId: hit.externalId,
      };
    }
  }
  // 3b) city name as commune
  const cityHit = admin.communes.get(fold(entry.city));
  if (cityHit) {
    return {
      centerLat: cityHit.lat,
      centerLng: cityHit.lng,
      geoSource: "ADMIN",
      geoStatus: "LOW",
      geoExternalId: `admin:city:${fold(entry.city)}`,
    };
  }
  return {
    centerLat: null,
    centerLng: null,
    geoSource: null,
    geoStatus: "MISSING",
    geoExternalId: null,
  };
}

async function applyDb(results) {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  const fetchedAt = new Date();

  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _quartier_geo_stage`);
  await prisma.$executeRawUnsafe(`
    CREATE TABLE _quartier_geo_stage (
      city_name TEXT NOT NULL,
      quartier_name TEXT NOT NULL,
      center_lat DOUBLE PRECISION,
      center_lng DOUBLE PRECISION,
      geo_source TEXT,
      geo_status TEXT,
      geo_external_id TEXT
    )
  `);

  const BATCH = 500;
  for (let i = 0; i < results.length; i += BATCH) {
    const slice = results.slice(i, i + BATCH);
    const values = slice
      .map((r) => {
        const city = esc(r.city);
        const name = esc(r.name);
        const lat = r.centerLat == null ? "NULL" : Number(r.centerLat);
        const lng = r.centerLng == null ? "NULL" : Number(r.centerLng);
        const src = r.geoSource == null ? "NULL" : `'${esc(r.geoSource)}'`;
        const st = r.geoStatus == null ? "NULL" : `'${esc(r.geoStatus)}'`;
        const ext =
          r.geoExternalId == null ? "NULL" : `'${esc(r.geoExternalId)}'`;
        return `('${city}','${name}',${lat},${lng},${src},${st},${ext})`;
      })
      .join(",");
    await prisma.$executeRawUnsafe(
      `INSERT INTO _quartier_geo_stage
        (city_name, quartier_name, center_lat, center_lng, geo_source, geo_status, geo_external_id)
       VALUES ${values}`,
    );
    if (i % 2000 === 0) {
      console.log(`  stage… ${Math.min(i + BATCH, results.length)}/${results.length}`);
    }
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
    FROM _quartier_geo_stage s
    JOIN "City" c ON c.name = s.city_name
    WHERE q."cityId" = c.id AND q.name = s.quartier_name
  `);

  const listings = await prisma.$executeRawUnsafe(`
    UPDATE "Listing" l
    SET
      "geoLat" = q."centerLat",
      "geoLng" = q."centerLng"
    FROM "Quartier" q
    JOIN "City" c ON c.id = q."cityId"
    WHERE (l."geoLat" IS NULL OR l."geoLng" IS NULL)
      AND l.city IS NOT NULL
      AND l."quartierLabel" IS NOT NULL
      AND lower(l.city) = lower(c.name)
      AND lower(l."quartierLabel") = lower(q.name)
      AND q."centerLat" IS NOT NULL
      AND q."centerLng" IS NOT NULL
  `);

  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS _quartier_geo_stage`);
  await prisma.$disconnect();
  return { updated: Number(updated), listings: Number(listings) };
}

function esc(s) {
  return String(s).replace(/'/g, "''");
}

async function main() {
  ensureDir(TMP);
  console.log("Loading seed…");
  const seed = await loadSeed();
  console.log(`  ${seed.length} quartiers`);

  console.log("Loading OSM places…");
  const osm = await loadOsmPlaces();
  console.log(`  ${osm.size} distinct OSM names`);

  console.log("Loading GeoNames…");
  const geonames = loadGeoNames();
  console.log(`  ${geonames.size} distinct GeoNames keys`);

  console.log("Loading commune/admin tree…");
  const admin = loadCommuneCentroids();
  console.log(
    `  ${admin.communes.size} communes, ${admin.localiteToCommune.size} localité→commune links`,
  );

  const results = [];
  const counts = { OSM: 0, GEONAMES: 0, ADMIN: 0, MISSING: 0, OK: 0, LOW: 0 };
  for (const entry of seed) {
    const geo = matchOne(entry, { osm, geonames, admin });
    results.push({
      name: entry.name,
      city: entry.city,
      region: entry.region,
      ...geo,
    });
    if (geo.geoSource) counts[geo.geoSource] = (counts[geo.geoSource] || 0) + 1;
    counts[geo.geoStatus] = (counts[geo.geoStatus] || 0) + 1;
  }

  const outPath = path.join(TMP, "quartier-geo.json");
  fs.writeFileSync(outPath, JSON.stringify(results));
  console.log(`Wrote ${outPath}`);

  const needsGoogle = results.filter(
    (r) => r.geoStatus === "MISSING" || r.geoStatus === "LOW",
  );
  const needsGoogleMissingOnly = results.filter(
    (r) => r.geoStatus === "MISSING",
  );
  const byRegion = {};
  for (const r of needsGoogle) {
    byRegion[r.region] = byRegion[r.region] || { LOW: 0, MISSING: 0 };
    byRegion[r.region][r.geoStatus]++;
  }

  const report = {
    total: results.length,
    bySource: {
      OSM: counts.OSM || 0,
      GEONAMES: counts.GEONAMES || 0,
      ADMIN: counts.ADMIN || 0,
      MISSING: counts.MISSING || 0,
    },
    byStatus: {
      OK: counts.OK || 0,
      LOW: counts.LOW || 0,
      MISSING: counts.MISSING || 0,
    },
    /** Accurate enough from free sources (OSM or GeoNames point match). */
    accurateFree: counts.OK || 0,
    /**
     * Not accurate quartier-level: ADMIN commune fallback or no coord.
     * These are the Google-evaluation candidates.
     */
    needsGoogleOrBetter: needsGoogle.length,
    needsGoogleMissingOnly: needsGoogleMissingOnly.length,
    needsGoogleByRegion: byRegion,
    sampleMissing: needsGoogleMissingOnly.slice(0, 40).map((r) => ({
      name: r.name,
      city: r.city,
      region: r.region,
    })),
    sampleLowAdmin: needsGoogle
      .filter((r) => r.geoStatus === "LOW")
      .slice(0, 20)
      .map((r) => ({
        name: r.name,
        city: r.city,
        region: r.region,
        centerLat: r.centerLat,
        centerLng: r.centerLng,
      })),
    googleCostHint: {
      note: "Geocoding API ~$5 / 1000 requests after free monthly credit; confirm current Google pricing.",
      ifGeocodeAllNeedsGoogleOrBetter: needsGoogle.length,
      ifGeocodeMissingOnly: needsGoogleMissingOnly.length,
    },
  };

  const reportPath = path.join(TMP, "backfill-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Wrote ${reportPath}`);
  console.log(JSON.stringify(report.bySource, null, 2));
  console.log(JSON.stringify(report.byStatus, null, 2));
  console.log(
    `accurateFree=${report.accurateFree} needsGoogleOrBetter=${report.needsGoogleOrBetter} (MISSING-only=${report.needsGoogleMissingOnly})`,
  );

  // Compact CSV of Google candidates
  const csvPath = path.join(TMP, "needs-google.csv");
  const lines = ["name,city,region,status,centerLat,centerLng"];
  for (const r of needsGoogle) {
    lines.push(
      [
        JSON.stringify(r.name),
        JSON.stringify(r.city),
        JSON.stringify(r.region),
        r.geoStatus,
        r.centerLat ?? "",
        r.centerLng ?? "",
      ].join(","),
    );
  }
  fs.writeFileSync(csvPath, lines.join("\n"));
  console.log(`Wrote ${csvPath}`);

  if (APPLY_DB) {
    console.log("Applying to database…");
    const db = await applyDb(results);
    console.log(`DB quartiers updated=${db.updated}, listings inherited=${db.listings}`);
  } else {
    console.log("Skip DB write (pass --db to apply).");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
