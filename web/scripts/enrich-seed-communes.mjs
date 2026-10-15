/**
 * Enrich senegal-quartiers-seed.ts with commune from local ANSD tree
 * (tmp-senegal-api.ts) — région → département → commune → localité.
 *
 * City semantics stay as today (Cap-Vert: Dakar/Pikine/… ; elsewhere often
 * chef-lieu). Commune is the missing middle layer (Yoff, Ngor, …).
 *
 * Usage: npx tsx scripts/enrich-seed-communes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SENEGAL_QUARTIERS_SEED } from "../src/lib/locations/senegal-quartiers-seed.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TREE = path.join(ROOT, "tmp-senegal-api.ts");
const OUT = path.join(ROOT, "src/lib/locations/senegal-quartiers-seed.ts");

function fold(s) {
  return s
    .replace(/œ/gi, "oe")
    .replace(/æ/gi, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Marketing / commercial names → commune when not exact ANSD localités. */
const EXTRA_COMMUNE = {
  almadies: { commune: "Ngor", city: "Dakar", region: "Dakar" },
  "cite djily mbaye": { commune: "Yoff", city: "Dakar", region: "Dakar" },
  "liberte 6": { commune: "Sicap Liberté", city: "Dakar", region: "Dakar" },
  "liberte 6 extension": {
    commune: "Sicap Liberté",
    city: "Dakar",
    region: "Dakar",
  },
  "point e": {
    commune: "Fann Point E Amitie",
    city: "Dakar",
    region: "Dakar",
  },
  "sacre coeur": {
    commune: "Mermoz Sacre Coeur",
    city: "Dakar",
    region: "Dakar",
  },
  mermoz: {
    commune: "Mermoz Sacre Coeur",
    city: "Dakar",
    region: "Dakar",
  },
  vdn: { commune: "Patte D'Oie", city: "Dakar", region: "Dakar" },
  "scat urbam": {
    commune: "Parcelles Assainies",
    city: "Dakar",
    region: "Dakar",
  },
  ouakam: { commune: "Ouakam", city: "Dakar", region: "Dakar" },
};

function loadAnsdIndex() {
  const src = fs.readFileSync(TREE, "utf8");
  const senegal = eval(
    src.replace(/^export const senegal = /, "const senegal = ").replace(/;?\s*$/, "") +
      "; senegal",
  );
  /** fold(localite) → [{region, dept, commune}] */
  const byLocalite = new Map();
  /** fold(commune)|fold(region) → {commune, dept, region} for commune-as-quartier */
  const communes = [];

  for (const region of senegal) {
    for (const dept of region.departements || []) {
      for (const commune of dept.communes || []) {
        communes.push({
          region: region.name,
          dept: dept.name,
          commune: commune.name,
        });
        for (const loc of commune.localites || []) {
          const k = fold(loc.name);
          if (!byLocalite.has(k)) byLocalite.set(k, []);
          byLocalite.get(k).push({
            region: region.name,
            dept: dept.name,
            commune: commune.name,
          });
        }
      }
    }
  }
  return { byLocalite, communes };
}

function resolveCommune(q, index) {
  const extra = EXTRA_COMMUNE[fold(q.name)];
  if (extra) return extra.commune;

  const hits = index.byLocalite.get(fold(q.name)) || [];
  const inRegion = hits.filter((h) => fold(h.region) === fold(q.region));
  if (inRegion.length) {
    const city = fold(q.city);
    const byCity = inRegion.filter(
      (h) => fold(h.dept) === city || fold(h.commune) === city,
    );
    const pool = byCity.length ? byCity : inRegion;
    const uniq = [...new Set(pool.map((h) => h.commune))];
    if (uniq.length === 1) return uniq[0];
    // Prefer commune whose name equals city (rural) when ambiguous
    const eqCity = uniq.find((c) => fold(c) === city);
    if (eqCity) return eqCity;
  }

  // Quartier name is itself a commune (Ouakam, Mermoz as marketing)
  const communeHits = index.communes.filter(
    (c) =>
      fold(c.commune) === fold(q.name) && fold(c.region) === fold(q.region),
  );
  if (communeHits.length === 1) return communeHits[0].commune;
  const byDept = communeHits.filter(
    (c) => fold(c.dept) === fold(q.city) || fold(c.commune) === fold(q.city),
  );
  if (byDept.length === 1) return byDept[0].commune;

  // Fallback: commune = city (display dedupes)
  return q.city;
}

function emit(list) {
  const lines = [
    `export type QuartierSeedEntry = {`,
    `  name: string;`,
    `  commune: string;`,
    `  city: string;`,
    `  region: string;`,
    `  aliases?: string[];`,
    `};`,
    ``,
    `/**`,
    ` * Thesaurus région → ville → commune → quartier.`,
    ` * Source : ANSD RGPH-5 2023 localités (+ cités marché).`,
    ` * Commune enrichie via tmp-senegal-api.ts (scripts/enrich-seed-communes.mjs).`,
    ` * Ne pas éditer à la main — régénérer les scripts ANSD / enrich.`,
    ` */`,
    `export const SENEGAL_QUARTIERS_SEED: QuartierSeedEntry[] = [`,
  ];
  for (const q of list) {
    const aliases = q.aliases?.length
      ? `, aliases: ${JSON.stringify(q.aliases)}`
      : "";
    lines.push(
      `  { name: ${JSON.stringify(q.name)}, commune: ${JSON.stringify(q.commune)}, city: ${JSON.stringify(q.city)}, region: ${JSON.stringify(q.region)}${aliases} },`,
    );
  }
  lines.push(`];`, ``);
  return lines.join("\n");
}

const index = loadAnsdIndex();
let fromAnsd = 0;
let fallback = 0;
let extra = 0;

const enriched = SENEGAL_QUARTIERS_SEED.map((q) => {
  const before = fold(q.name);
  const commune = resolveCommune(q, index);
  if (EXTRA_COMMUNE[before]) extra++;
  else if (fold(commune) === fold(q.city)) fallback++;
  else fromAnsd++;
  return { ...q, commune };
});

// Dedupe by city|commune|name (keep first / prefer aliases)
const seen = new Map();
for (const q of enriched) {
  const key = `${fold(q.city)}|${fold(q.commune)}|${fold(q.name)}`;
  if (!seen.has(key)) seen.set(key, q);
  else {
    const cur = seen.get(key);
    cur.aliases = [
      ...new Set([...(cur.aliases ?? []), ...(q.aliases ?? [])]),
    ];
  }
}

const list = [...seen.values()].sort((a, b) => {
  const r = a.region.localeCompare(b.region, "fr");
  if (r) return r;
  const c = a.city.localeCompare(b.city, "fr");
  if (c) return c;
  const co = a.commune.localeCompare(b.commune, "fr");
  if (co) return co;
  return a.name.localeCompare(b.name, "fr");
});

fs.writeFileSync(OUT, emit(list), "utf8");
console.log(
  JSON.stringify(
    {
      wrote: OUT,
      count: list.length,
      fromAnsd,
      extraMap: extra,
      fallbackCityAsCommune: fallback,
      djily: list.find((q) => fold(q.name) === "cite djily mbaye"),
    },
    null,
    2,
  ),
);
