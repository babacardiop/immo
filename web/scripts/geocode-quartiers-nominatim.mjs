/**
 * Nominatim (OSM) drip geocode for quartiers still LOW / MISSING.
 *
 * Public Nominatim policy: max ~1 req/s + valid User-Agent.
 * Default delay 1100ms. Resume-safe via DB status (OK rows drop out of queue).
 *
 * Priority: MISSING → listing-used → Dakar city → Dakar region → market cities → rest.
 *
 * Usage:
 *   npm run locations:geocode-nominatim:dry
 *   npm run locations:geocode-nominatim -- --city=Dakar
 *   npm run locations:geocode-nominatim -- --limit=500
 *   npm run locations:geocode-nominatim          # full queue (~1 req/s)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, "tmp-geo");

const DEFAULT_LIMIT = 25_000;
const DEFAULT_DELAY_MS = 1_100;
const NOMINATIM_URL =
  process.env.NOMINATIM_URL ?? "https://nominatim.openstreetmap.org/search";
const USER_AGENT =
  process.env.NOMINATIM_USER_AGENT ??
  "EverGreenImmo/1.0 (quartier-geo; https://evergreen.sn; contact@evergreen.sn)";

function arg(name, fallback = null) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

const LIMIT = Number(arg("limit", String(DEFAULT_LIMIT))) || DEFAULT_LIMIT;
const DELAY_MS =
  Number(arg("delayMs", String(DEFAULT_DELAY_MS))) || DEFAULT_DELAY_MS;
const REGION_FILTER = arg("region", null);
const CITY_FILTER = arg("city", null);
const DRY = hasFlag("dry") || hasFlag("dry-run");
const FORCE = hasFlag("force");

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
        ...(FORCE
          ? []
          : [
              {
                OR: [
                  { geoSource: null },
                  {
                    geoSource: {
                      notIn: ["GOOGLE", "MANUAL", "NOMINATIM"],
                    },
                  },
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

  return { ranked, selected: ranked.slice(0, LIMIT) };
}

function buildQuery(q) {
  return `${q.name}, ${q.city}, Senegal`;
}

async function geocodeOne(q) {
  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("q", buildQuery(q));
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "sn");
  url.searchParams.set("addressdetails", "0");

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
  });
  if (res.status === 429) {
    return { ok: false, error: "rate_limited", status: 429 };
  }
  if (!res.ok) {
    return { ok: false, error: `HTTP ${res.status}`, status: res.status };
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    return { ok: false, error: "no_results", status: 200 };
  }
  const hit = data[0];
  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { ok: false, error: "bad_coords", status: 200 };
  }
  const cls = String(hit.class ?? "");
  const type = String(hit.type ?? "");
  // Soft quality: prefer place/* settlement-like; still accept if in SN bbox-ish
  const inSnBbox =
    lat >= 12.0 && lat <= 17.0 && lng >= -18.0 && lng <= -11.0;
  if (!inSnBbox) {
    return { ok: false, error: "outside_sn_bbox", status: 200 };
  }
  return {
    ok: true,
    lat,
    lng,
    osmType: hit.osm_type,
    osmId: hit.osm_id,
    cls,
    type,
    display: hit.display_name,
  };
}

async function main() {
  ensureDir(TMP);
  if (DELAY_MS < 1000 && !hasFlag("fast")) {
    console.warn(
      `delayMs=${DELAY_MS} is under Nominatim's 1 req/s policy — use --fast to force.`,
    );
    throw new Error("Refuse delayMs < 1000 without --fast");
  }

  const prisma = new PrismaClient();
  console.log(
    `Nominatim queue (limit=${LIMIT}, delayMs=${DELAY_MS}, dry=${DRY}, city=${CITY_FILTER ?? "*"}, region=${REGION_FILTER ?? "*"})`,
  );
  console.log(`User-Agent: ${USER_AGENT}`);
  console.log(`Endpoint: ${NOMINATIM_URL}`);

  const { ranked, selected } = await buildQueue(prisma);
  const summary = {
    candidatesTotal: ranked.length,
    selected: selected.length,
    estMinutes: Math.ceil((selected.length * DELAY_MS) / 60000),
    byPriorityBucket: {
      missing: selected.filter((q) => q.geoStatus === "MISSING").length,
      usedByListing: selected.filter((q) => q.usedByListing).length,
      dakarCity: selected.filter((q) => q.city === "Dakar").length,
      dakarRegion: selected.filter((q) => q.region === "Dakar").length,
    },
    leftoverAfterLimit: Math.max(0, ranked.length - selected.length),
    sample: selected.slice(0, 15),
  };
  const queuePath = path.join(TMP, "nominatim-geocode-queue.json");
  fs.writeFileSync(queuePath, JSON.stringify({ summary, selected }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Wrote ${queuePath}`);

  if (DRY) {
    await prisma.$disconnect();
    console.log("Dry-run only. Start with Dakar:");
    console.log("  npm run locations:geocode-nominatim -- --city=Dakar");
    return;
  }

  const progressPath = path.join(TMP, "nominatim-geocode-progress.json");
  const progress = {
    startedAt: new Date().toISOString(),
    limit: LIMIT,
    requested: 0,
    ok: 0,
    miss: 0,
    errors: 0,
    rows: [],
  };

  for (let i = 0; i < selected.length; i++) {
    const q = selected[i];
    progress.requested += 1;
    let result;
    try {
      result = await geocodeOne(q);
    } catch (e) {
      result = { ok: false, error: String(e), status: "THROW" };
    }

    if (result.ok) {
      await prisma.quartier.update({
        where: { id: q.id },
        data: {
          centerLat: result.lat,
          centerLng: result.lng,
          geoSource: "NOMINATIM",
          geoStatus: "OK",
          geoExternalId: result.osmId
            ? `nominatim:${result.osmType}:${result.osmId}`
            : null,
          geoFetchedAt: new Date(),
        },
      });
      await prisma.listing.updateMany({
        where: {
          city: { equals: q.city, mode: "insensitive" },
          quartierLabel: { equals: q.name, mode: "insensitive" },
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
        display: result.display,
      });
    } else if (result.error === "no_results" || result.error === "outside_sn_bbox") {
      progress.miss += 1;
      progress.rows.push({
        id: q.id,
        name: q.name,
        city: q.city,
        ok: false,
        error: result.error,
      });
    } else {
      progress.errors += 1;
      progress.rows.push({
        id: q.id,
        name: q.name,
        city: q.city,
        ok: false,
        error: result.error,
      });
      if (result.status === 429) {
        console.warn("429 rate limited — sleeping 30s then continuing…");
        await sleep(30_000);
      }
    }

    if ((i + 1) % 25 === 0 || i === selected.length - 1) {
      fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
      console.log(
        `  ${i + 1}/${selected.length} ok=${progress.ok} miss=${progress.miss} err=${progress.errors}`,
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
  console.log("Done.", {
    requested: progress.requested,
    ok: progress.ok,
    miss: progress.miss,
    errors: progress.errors,
    geoStatus: stats,
  });
  console.log(`Wrote ${progressPath}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
