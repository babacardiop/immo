/**
 * Google Geocoding backfill for quartiers still LOW / MISSING after free sources.
 *
 * Hard-capped under the free monthly Essentials allowance (10_000).
 * Default --limit=9500 leaves headroom for on-the-fly / retries.
 *
 * Priority:
 *  1. MISSING
 *  2. Quartiers used by listings (any status)
 *  3. Dakar city → Dakar region → other market cities
 *  4. Remaining LOW
 *
 * Usage:
 *   npm run locations:geocode-google:dry     # build queue, no API calls
 *   npm run locations:geocode-google         # live (needs GOOGLE_MAPS_API_KEY)
 *   npm run locations:geocode-google -- --limit=500 --region=Dakar
 *
 * Resume-safe: skips geoStatus=OK and geoSource in (OSM, GEONAMES, GOOGLE, MANUAL)
 * unless --force. Progress: tmp-geo/google-geocode-progress.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-geo");

const FREE_MONTHLY_CAP = 10_000;
const DEFAULT_LIMIT = 9_500;
const DEFAULT_DELAY_MS = 50; // ~20 QPS soft; Geocoding allows higher but stay gentle

function arg(name, fallback = null) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

const LIMIT = Math.min(
  Number(arg("limit", String(DEFAULT_LIMIT))) || DEFAULT_LIMIT,
  FREE_MONTHLY_CAP,
);
const DELAY_MS = Number(arg("delayMs", String(DEFAULT_DELAY_MS))) || DEFAULT_DELAY_MS;
const REGION_FILTER = arg("region", null);
const CITY_FILTER = arg("city", null);
const DRY = hasFlag("dry") || hasFlag("dry-run");
const FORCE = hasFlag("force");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? "";

const MARKET_CITIES = new Set([
  "Dakar",
  "Guédiawaye",
  "Pikine",
  "Rufisque",
  "Mbour",
  "Thiès",
  "Saly",
  "Saint-Louis",
  "Kaolack",
  "Ziguinchor",
]);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function priorityScore(q, listingKeys) {
  let score = 0;
  if (q.geoStatus === "MISSING") score += 1_000_000;
  const key = `${q.city.name}\0${q.name}`.toLowerCase();
  if (listingKeys.has(key)) score += 500_000;
  if (q.city.name === "Dakar") score += 200_000;
  if (q.city.region === "Dakar") score += 100_000;
  if (MARKET_CITIES.has(q.city.name)) score += 50_000;
  if (q.geoStatus === "LOW") score += 10_000;
  // Stable tie-break
  score += Math.max(0, 1000 - q.name.length);
  return score;
}

async function loadListingKeys(prisma) {
  const rows = await prisma.listing.findMany({
    where: {
      AND: [{ city: { not: null } }, { quartierLabel: { not: null } }],
    },
    select: { city: true, quartierLabel: true },
  });
  const keys = new Set();
  for (const r of rows) {
    if (!r.city || !r.quartierLabel) continue;
    keys.add(`${r.city}\0${r.quartierLabel}`.toLowerCase());
  }
  return keys;
}

async function buildQueue(prisma) {
  const cityFilter = {
    ...(REGION_FILTER ? { region: REGION_FILTER } : {}),
    ...(CITY_FILTER ? { name: CITY_FILTER } : {}),
  };
  const quartiers = await prisma.quartier.findMany({
    where: {
      AND: [
        { OR: [{ geoStatus: "MISSING" }, { geoStatus: "LOW" }] },
        // Skip Google/manual refined unless --force.
        // Note: SQL NULL is excluded by NOT IN — include null explicitly.
        ...(FORCE
          ? []
          : [
              {
                OR: [
                  { geoSource: null },
                  { geoSource: { notIn: ["GOOGLE", "MANUAL"] } },
                ],
              },
            ]),
      ],
      ...(Object.keys(cityFilter).length ? { city: cityFilter } : {}),
    },
    select: {
      id: true,
      name: true,
      geoStatus: true,
      geoSource: true,
      centerLat: true,
      centerLng: true,
      aliases: true,
      city: { select: { name: true, region: true } },
    },
  });

  const listingKeys = await loadListingKeys(prisma);
  const ranked = quartiers
    .map((q) => ({
      id: q.id,
      name: q.name,
      city: q.city.name,
      region: q.city.region,
      geoStatus: q.geoStatus,
      geoSource: q.geoSource,
      aliases: q.aliases,
      usedByListing: listingKeys.has(
        `${q.city.name}\0${q.name}`.toLowerCase(),
      ),
      score: priorityScore(q, listingKeys),
    }))
    .sort((a, b) => b.score - a.score);

  const selected = ranked.slice(0, LIMIT);
  return { ranked, selected, listingKeys };
}

async function geocodeOne(query) {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", query);
  url.searchParams.set("region", "sn");
  url.searchParams.set("language", "fr");
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, status: "HTTP_ERROR" };
  }
  const data = await res.json();
  if (data.status === "OK" && data.results?.[0]) {
    const r = data.results[0];
    const loc = r.geometry?.location;
    if (loc?.lat == null || loc?.lng == null) {
      return { ok: false, error: "no location", status: data.status };
    }
    // Prefer Senegal results
    const inSn = (r.address_components ?? []).some(
      (c) =>
        c.types?.includes("country") &&
        (c.short_name === "SN" || c.long_name === "Senegal"),
    );
    return {
      ok: true,
      lat: loc.lat,
      lng: loc.lng,
      placeId: r.place_id ?? null,
      formatted: r.formatted_address ?? null,
      locationType: r.geometry?.location_type ?? null,
      partial: Boolean(r.partial_match),
      inSn,
      status: data.status,
    };
  }
  return {
    ok: false,
    error: data.error_message || data.status,
    status: data.status,
  };
}

function buildAddress(q) {
  return `${q.name}, ${q.city}, ${q.region}, Senegal`;
}

async function main() {
  ensureDir(TMP);
  if (LIMIT > FREE_MONTHLY_CAP) {
    throw new Error(`limit cannot exceed free monthly cap ${FREE_MONTHLY_CAP}`);
  }
  if (!DRY && !API_KEY) {
    throw new Error(
      "GOOGLE_MAPS_API_KEY missing. Add it to .env then re-run (or use --dry).",
    );
  }

  const prisma = new PrismaClient();
  console.log(
    `Building queue (limit=${LIMIT}, dry=${DRY}, region=${REGION_FILTER ?? "*"}, city=${CITY_FILTER ?? "*"})…`,
  );
  const { ranked, selected } = await buildQueue(prisma);

  const queuePath = path.join(TMP, "google-geocode-queue.json");
  const summary = {
    freeMonthlyCap: FREE_MONTHLY_CAP,
    limit: LIMIT,
    candidatesTotal: ranked.length,
    selected: selected.length,
    byPriorityBucket: {
      missing: selected.filter((q) => q.geoStatus === "MISSING").length,
      usedByListing: selected.filter((q) => q.usedByListing).length,
      dakarCity: selected.filter((q) => q.city === "Dakar").length,
      dakarRegion: selected.filter((q) => q.region === "Dakar").length,
    },
    leftoverAfterLimit: Math.max(0, ranked.length - selected.length),
    sample: selected.slice(0, 25),
  };
  fs.writeFileSync(queuePath, JSON.stringify({ summary, selected }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Wrote ${queuePath}`);

  if (DRY) {
    await prisma.$disconnect();
    console.log("Dry-run only — no Google calls. When key is ready:");
    console.log("  npm run locations:geocode-google");
    return;
  }

  const progressPath = path.join(TMP, "google-geocode-progress.json");
  const progress = {
    startedAt: new Date().toISOString(),
    limit: LIMIT,
    requested: 0,
    ok: 0,
    rejected: 0,
    errors: 0,
    rows: [],
  };

  for (let i = 0; i < selected.length; i++) {
    const q = selected[i];
    const address = buildAddress(q);
    progress.requested += 1;
    let result;
    try {
      result = await geocodeOne(address);
    } catch (e) {
      result = { ok: false, error: String(e), status: "THROW" };
    }

    if (result.ok && result.inSn !== false) {
      // Reject very coarse country/region-only hits when possible
      const coarse =
        result.locationType === "APPROXIMATE" && result.partial === true;
      await prisma.quartier.update({
        where: { id: q.id },
        data: {
          centerLat: result.lat,
          centerLng: result.lng,
          geoSource: "GOOGLE",
          geoStatus: coarse ? "LOW" : "OK",
          geoExternalId: result.placeId
            ? `google:place:${result.placeId}`
            : null,
          geoFetchedAt: new Date(),
        },
      });
      // Inherit to listings missing coords for this quartier
      await prisma.listing.updateMany({
        where: {
          city: { equals: q.city, mode: "insensitive" },
          quartierLabel: { equals: q.name, mode: "insensitive" },
          OR: [{ geoLat: null }, { geoLng: null }],
        },
        data: { geoLat: result.lat, geoLng: result.lng },
      });
      progress.ok += 1;
      progress.rows.push({
        id: q.id,
        name: q.name,
        city: q.city,
        ok: true,
        lat: result.lat,
        lng: result.lng,
        placeId: result.placeId,
        formatted: result.formatted,
      });
    } else if (result.ok && result.inSn === false) {
      progress.rejected += 1;
      progress.rows.push({
        id: q.id,
        name: q.name,
        city: q.city,
        ok: false,
        error: "outside_senegal",
      });
    } else {
      progress.errors += 1;
      progress.rows.push({
        id: q.id,
        name: q.name,
        city: q.city,
        ok: false,
        error: result.error || result.status,
      });
      if (result.status === "OVER_QUERY_LIMIT" || result.status === "REQUEST_DENIED") {
        console.error(`Stopping: ${result.status} — ${result.error}`);
        break;
      }
    }

    if ((i + 1) % 50 === 0 || i === selected.length - 1) {
      fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
      console.log(
        `  ${i + 1}/${selected.length} requested=${progress.requested} ok=${progress.ok} err=${progress.errors} rej=${progress.rejected}`,
      );
    }
    await sleep(DELAY_MS);
  }

  progress.finishedAt = new Date().toISOString();
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));

  const stats = await prisma.quartier.groupBy({
    by: ["geoStatus"],
    _count: true,
  });
  console.log("Done.", { progress: {
    requested: progress.requested,
    ok: progress.ok,
    errors: progress.errors,
    rejected: progress.rejected,
  }, geoStatus: stats });
  console.log(`Wrote ${progressPath}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
