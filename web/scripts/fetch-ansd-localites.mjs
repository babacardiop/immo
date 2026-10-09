/**
 * Download ANSD RGPH-5 2023 répertoire des localités (CSV per region)
 * and generate senegal-quartiers-seed.ts + cities list.
 *
 * Source: https://www.ansd.sn/donnees-recensements
 * Export: /data-recensement.csv?field_regions_value=…&field_liste_annee_value=2023
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "tmp-ansd");
const YEAR = "2023";

const REGIONS = [
  "DAKAR",
  "THIES",
  "DIOURBEL",
  "FATICK",
  "KAOLACK",
  "KOLDA",
  "LOUGA",
  "MATAM",
  "SAINT-LOUIS",
  "TAMBACOUNDA",
  "ZIGUINCHOR",
  "KEDOUGOU",
  "SEDHIOU",
  "KAFFRINE",
];

/** Canonical region display names */
const REGION_LABEL = {
  DAKAR: "Dakar",
  THIES: "Thiès",
  DIOURBEL: "Diourbel",
  FATICK: "Fatick",
  KAOLACK: "Kaolack",
  KOLDA: "Kolda",
  LOUGA: "Louga",
  MATAM: "Matam",
  "SAINT-LOUIS": "Saint-Louis",
  TAMBACOUNDA: "Tambacounda",
  ZIGUINCHOR: "Ziguinchor",
  KEDOUGOU: "Kédougou",
  SEDHIOU: "Sédhiou",
  KAFFRINE: "Kaffrine",
};

/** Map ANSD commune / département → our city label (Cap-Vert + specials). */
const CITY_ALIASES = {
  // Dakar dept — communes d’arrondissement → city Dakar
  DAKAR: "Dakar",
  GOREE: "Dakar",
  GORÉE: "Dakar",
  PLATEAU: "Dakar",
  "DAKAR-PLATEAU": "Dakar",
  MEDINA: "Dakar",
  MÉDINA: "Dakar",
  "GUEULE TAPEE-FASS-COLOBANE": "Dakar",
  "GUEULE TAPÉE-FASS-COLOBANE": "Dakar",
  "FANN-POINT E-AMITIE": "Dakar",
  "FANN-POINT E-AMITIÉ": "Dakar",
  "MERMOZ-SACRE-COEUR": "Dakar",
  "MERMOZ-SACRÉ-CŒUR": "Dakar",
  "MERMOZ-SACRE CŒUR": "Dakar",
  "MERMOZ-SACRE COEUR": "Dakar",
  NGOR: "Dakar",
  OUAKAM: "Dakar",
  YOFF: "Dakar",
  BISCUITERIE: "Dakar",
  "DIEUPPEUL-DERKLE": "Dakar",
  "DIEUPPEUL-DERKLÉ": "Dakar",
  "GRAND DAKAR": "Dakar",
  "HANN-BEL AIR": "Dakar",
  "HANN BEL-AIR": "Dakar",
  HLM: "Dakar",
  "H.L.M": "Dakar",
  "SICAP-LIBERTE": "Dakar",
  "SICAP-LIBERTÉ": "Dakar",
  CAMBERENE: "Dakar",
  CAMBÉRÈNE: "Dakar",
  "GRAND YOFF": "Dakar",
  "PARCELLES ASSAINIES": "Dakar",
  "PATTE D'OIE": "Dakar",
  "PATTE D’OIE": "Dakar",

  // Pikine
  PIKINE: "Pikine",
  "PIKINE EST": "Pikine",
  "PIKINE NORD": "Pikine",
  "PIKINE OUEST": "Pikine",
  DALIFORT: "Pikine",
  "DJIDAH THIAROYE KAO": "Pikine",
  "GUINAW RAIL NORD": "Pikine",
  "GUINAW RAIL SUD": "Pikine",
  "THIAROYE GARE": "Pikine",
  "THIAROYE SUR MER": "Pikine",
  "TIVAOUANE-DIACKSAO": "Pikine",
  "TIVAOUANE DIACKSAO": "Pikine",
  "DIAMAGUENE SICAP MBAO": "Pikine",
  "DIAMAGUÈNE SICAP MBAO": "Pikine",
  MBAO: "Pikine",
  "M'BAO": "Pikine",

  // Guédiawaye
  GUEDIAWAYE: "Guédiawaye",
  GUÉDIAWAYE: "Guédiawaye",
  "GOLF SUD": "Guédiawaye",
  "MEDINA GOUNASS": "Guédiawaye",
  "MÉDINA GOUNASS": "Guédiawaye",
  "NDIAREME LIMAMOULAYE": "Guédiawaye",
  "NDIARÈME LIMAMOULAYE": "Guédiawaye",
  "SAM NOTAIRE": "Guédiawaye",
  "WAKHINANE NIMZATT": "Guédiawaye",

  // Keur Massar
  "KEUR MASSAR": "Keur Massar",
  "KEUR MASSAR NORD": "Keur Massar",
  "KEUR MASSAR SUD": "Keur Massar",
  "JAXAAY-PARCELLES": "Keur Massar",
  MALIKA: "Keur Massar",
  "YEUMBEUL NORD": "Keur Massar",
  "YEUMBEUL SUD": "Keur Massar",

  // Rufisque
  RUFISQUE: "Rufisque",
  "RUFISQUE EST": "Rufisque",
  "RUFISQUE NORD": "Rufisque",
  "RUFISQUE OUEST": "Rufisque",
  BAMBILOR: "Rufisque",
  BAMBYLOR: "Rufisque",
  BARGNY: "Rufisque",
  DIAMNIADIO: "Diamniadio",
  SANGALKAM: "Rufisque",
  SEBIKOTANE: "Rufisque",
  SÉBIKOTANE: "Rufisque",
  SENDOU: "Rufisque",
  "TIVAOUANE PEULH NIAGHA": "Rufisque",
  "TIVAOUANE PEULH-NIAGA": "Rufisque",
  YENNE: "Rufisque",
  YÈNE: "Rufisque",

  // Thiès
  THIES: "Thiès",
  THIÈS: "Thiès",
  "THIES EST": "Thiès",
  "THIÈS EST": "Thiès",
  "THIES NORD": "Thiès",
  "THIÈS NORD": "Thiès",
  "THIES OUEST": "Thiès",
  "THIÈS OUEST": "Thiès",
  MBOUR: "Mbour",
  "M'BOUR": "Mbour",
  "SALY PORTUDAL": "Saly",
  NGAPAROU: "Ngaparou",
  SOMONE: "Somone",
  "JOAL-FADIOUTH": "Joal-Fadiouth",
  "POPENGUEINE-NDAYANE": "Popenguine",
  NGUEKHOKH: "Nguékhokh",
  NGUÉKHOKH: "Nguékhokh",
  POUT: "Pout",
  KHOMBOLE: "Khombole",
  TIVAOUANE: "Tivaouane",

  // Other chef-lieux
  "SAINT-LOUIS": "Saint-Louis",
  KAOLACK: "Kaolack",
  ZIGUINCHOR: "Ziguinchor",
  TOUBA: "Touba",
  MBACKE: "Mbacké",
  MBACKÉ: "Mbacké",
  LOUGA: "Louga",
  DIOURBEL: "Diourbel",
  TAMBACOUNDA: "Tambacounda",
  KOLDA: "Kolda",
  FATICK: "Fatick",
  MATAM: "Matam",
  KAFFRINE: "Kaffrine",
  KEDOUGOU: "Kédougou",
  KÉDOUGOU: "Kédougou",
  SEDHIOU: "Sédhiou",
  SÉDHIOU: "Sédhiou",
  "RICHARD-TOLL": "Richard-Toll",
  BIGNONA: "Bignona",
  VELINGARA: "Vélingara",
  VÉLINGARA: "Vélingara",
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      q = !q;
      continue;
    }
    if ((c === "," && !q) || ((c === "\n" || c === "\r") && !q)) {
      row.push(cur.trim());
      cur = "";
      if (c !== ",") {
        if (row.some((x) => x)) rows.push(row);
        row = [];
        if (c === "\r" && text[i + 1] === "\n") i++;
      }
      continue;
    }
    cur += c;
  }
  if (cur || row.length) {
    row.push(cur.trim());
    if (row.some((x) => x)) rows.push(row);
  }
  return rows;
}

function titleCaseFr(s) {
  const lower = s
    .toLocaleLowerCase("fr-FR")
    .replace(/\s+/g, " ")
    .trim();
  return lower.replace(/(^|[\s\-'/’])(\S)/g, (_, a, b) => a + b.toLocaleUpperCase("fr-FR"));
}

function foldKey(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveCity(commune, departement, regionKey) {
  const cKey = foldKey(commune || "");
  const dKey = foldKey(departement || "");
  if (CITY_ALIASES[cKey]) return CITY_ALIASES[cKey];
  if (CITY_ALIASES[dKey]) return CITY_ALIASES[dKey];
  // Cap-Vert: fall back to département as city
  if (regionKey === "DAKAR") {
    if (dKey.includes("PIKINE")) return "Pikine";
    if (dKey.includes("GUEDIAWAYE")) return "Guédiawaye";
    if (dKey.includes("KEUR MASSAR")) return "Keur Massar";
    if (dKey.includes("RUFISQUE")) return "Rufisque";
    return "Dakar";
  }
  if (commune) return titleCaseFr(commune);
  if (departement) return titleCaseFr(departement);
  return REGION_LABEL[regionKey] ?? titleCaseFr(regionKey);
}

async function fetchRegion(region) {
  const { spawnSync } = await import("node:child_process");
  const url =
    `https://www.ansd.sn/data-recensement.csv?field_regions_value=${encodeURIComponent(region)}` +
    `&field_liste_annee_value=${YEAR}&_format=csv`;
  const out = path.join(OUT_DIR, `${region}-${YEAR}.csv`);
  // Prefer cached file if present and non-trivial.
  if (fs.existsSync(out) && fs.statSync(out).size > 500) {
    return { region, out, bytes: fs.statSync(out).size, cached: true };
  }
  // Also accept prior manual download naming.
  const alt = path.join(OUT_DIR, `dakar-2023.csv`);
  if (region === "DAKAR" && fs.existsSync(alt) && fs.statSync(alt).size > 500) {
    fs.copyFileSync(alt, out);
    return { region, out, bytes: fs.statSync(out).size, cached: true };
  }
  const r = spawnSync(
    "curl.exe",
    [
      "-sS",
      "-L",
      "--max-time",
      "180",
      "-A",
      "immo-seed/1.0",
      "-o",
      out,
      "-w",
      "%{http_code}",
      url,
    ],
    { encoding: "utf8" },
  );
  const code = (r.stdout || "").trim();
  if (r.status !== 0 || code !== "200") {
    throw new Error(`curl status=${r.status} http=${code} ${r.stderr || ""}`);
  }
  return { region, out, bytes: fs.statSync(out).size, cached: false };
}

function loadCommercialExtras() {
  const seedPath = path.join(ROOT, "src/lib/locations/senegal-quartiers-seed.ts");
  if (!fs.existsSync(seedPath)) return [];
  // Keep market cités that ANSD may omit (Djily, Liberté 6 Ext…).
  // We merge by city+name after generating ANSD rows.
  return [];
}

function generate(rows) {
  /** @type {Map<string, {name:string,city:string,region:string,aliases?:string[]}>} */
  const quartiers = new Map();
  /** @type {Map<string, string>} city → region */
  const cities = new Map();

  for (const r of rows) {
    const regionKey = foldKey(r[0] || "");
    const departement = r[1] || "";
    const commune = r[3] || "";
    const quartierRaw = r[4] || "";
    if (!quartierRaw) continue;
    const region = REGION_LABEL[regionKey] ?? titleCaseFr(r[0]);
    const city = resolveCity(commune, departement, regionKey);
    const name = titleCaseFr(quartierRaw);
    if (name.length < 2) continue;
    const key = `${foldKey(city)}||${foldKey(name)}`;
    if (!quartiers.has(key)) {
      quartiers.set(key, { name, city, region });
    }
    if (!cities.has(city)) cities.set(city, region);
  }

  // Merge commercial extras from existing hand-curated list (aliases + missing cités).
  const commercialPath = path.join(ROOT, "src/lib/locations/senegal-quartiers-seed.commercial.ts");
  // inline merge of known market names not always in ANSD:
  const EXTRA = [
    { name: "Almadies", city: "Dakar", region: "Dakar", aliases: ["les almadies"] },
    { name: "Cité Djily Mbaye", city: "Dakar", region: "Dakar", aliases: ["djily mbaye", "djily", "cite djily mbaye"] },
    { name: "Liberté 6", city: "Dakar", region: "Dakar", aliases: ["liberte 6"] },
    { name: "Liberté 6 Extension", city: "Dakar", region: "Dakar", aliases: ["l6 extension", "liberte 6 extension"] },
    { name: "Point E", city: "Dakar", region: "Dakar", aliases: ["point-e"] },
    { name: "Sacré-Cœur", city: "Dakar", region: "Dakar", aliases: ["sacre-coeur", "sacre coeur"] },
    { name: "Mermoz", city: "Dakar", region: "Dakar" },
    { name: "VDN", city: "Dakar", region: "Dakar", aliases: ["voie de degagement nord"] },
    { name: "Scat Urbam", city: "Dakar", region: "Dakar", aliases: ["scat"] },
    { name: "Saly Nord", city: "Saly", region: "Thiès" },
    { name: "Saly Sud", city: "Saly", region: "Thiès" },
    { name: "Nianing", city: "Mbour", region: "Thiès" },
    { name: "Warang", city: "Mbour", region: "Thiès" },
    { name: "Pointe Sarène", city: "Mbour", region: "Thiès", aliases: ["pointe sarene"] },
  ];
  for (const e of EXTRA) {
    const key = `${foldKey(e.city)}||${foldKey(e.name)}`;
    if (!quartiers.has(key)) {
      quartiers.set(key, e);
    } else {
      const cur = quartiers.get(key);
      // Prefer market spelling (accents) from EXTRA when ANSD is ASCII-only.
      cur.name = e.name;
      cur.aliases = [
        ...new Set([...(cur.aliases ?? []), ...(e.aliases ?? [])]),
      ];
    }
    if (!cities.has(e.city)) cities.set(e.city, e.region);
  }

  void loadCommercialExtras;
  void commercialPath;

  const quartierList = [...quartiers.values()].sort((a, b) => {
    const r = a.region.localeCompare(b.region, "fr");
    if (r) return r;
    const c = a.city.localeCompare(b.city, "fr");
    if (c) return c;
    return a.name.localeCompare(b.name, "fr");
  });

  const cityList = [...cities.entries()]
    .map(([name, region]) => ({ name, region }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return { quartierList, cityList };
}

function emitSeedTs(quartierList) {
  const lines = [
    `export type QuartierSeedEntry = {`,
    `  name: string;`,
    `  city: string;`,
    `  region: string;`,
    `  aliases?: string[];`,
    `};`,
    ``,
    `/**`,
    ` * Thesaurus région → ville → quartier.`,
    ` * Source principale : ANSD RGPH-5 2023 répertoire des localités`,
    ` * (https://www.ansd.sn/donnees-recensements) + cités marché manquantes.`,
    ` * Généré par scripts/fetch-ansd-localites.mjs — ne pas éditer à la main.`,
    ` */`,
    `export const SENEGAL_QUARTIERS_SEED: QuartierSeedEntry[] = [`,
  ];
  for (const q of quartierList) {
    const aliases = q.aliases?.length
      ? `, aliases: ${JSON.stringify(q.aliases)}`
      : "";
    lines.push(
      `  { name: ${JSON.stringify(q.name)}, city: ${JSON.stringify(q.city)}, region: ${JSON.stringify(q.region)}${aliases} },`,
    );
  }
  lines.push(`];`, ``);
  return lines.join("\n");
}

function emitCitiesSnippet(cityList) {
  return (
    `// Auto cities from ANSD (${cityList.length}) — paste into senegal.ts CITY_NAMES if desired\n` +
    cityList.map((c) => JSON.stringify(c.name)).join(",\n") +
    "\n"
  );
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Fetching ANSD ${YEAR} localités for ${REGIONS.length} regions…`);
  const allRows = [];
  for (const region of REGIONS) {
    process.stdout.write(`  ${region}… `);
    try {
      const { out, bytes } = await fetchRegion(region);
      const parsed = parseCsv(fs.readFileSync(out, "utf8"));
      const data = parsed.slice(1);
      console.log(`${data.length} rows (${bytes} bytes)`);
      allRows.push(...data);
    } catch (e) {
      console.log(`FAIL ${e.message}`);
    }
  }

  const { quartierList, cityList } = generate(allRows);
  console.log(`\nUnique cities: ${cityList.length}`);
  console.log(`Unique quartiers: ${quartierList.length}`);

  const seedTs = emitSeedTs(quartierList);
  const seedPath = path.join(ROOT, "src/lib/locations/senegal-quartiers-seed.ts");
  fs.writeFileSync(seedPath, seedTs, "utf8");
  console.log(`Wrote ${seedPath}`);

  const citiesPath = path.join(OUT_DIR, "cities-from-ansd.txt");
  fs.writeFileSync(citiesPath, emitCitiesSnippet(cityList), "utf8");
  fs.writeFileSync(
    path.join(OUT_DIR, "summary.json"),
    JSON.stringify(
      {
        year: YEAR,
        regions: REGIONS.length,
        rawRows: allRows.length,
        cities: cityList.length,
        quartiers: quartierList.length,
        byCity: Object.fromEntries(
          [...quartierList.reduce((m, q) => {
            m.set(q.city, (m.get(q.city) || 0) + 1);
            return m;
          }, new Map())].sort((a, b) => b[1] - a[1]),
        ),
      },
      null,
      2,
    ),
    "utf8",
  );
  console.log(`Summary → ${path.join(OUT_DIR, "summary.json")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
