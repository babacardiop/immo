import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import {
  bedroomsFromText,
  htmlToText,
  surfaceFromText,
  type Connector,
  type ParsedDetail,
  type ParsedListing,
} from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Espace Villa (immobilier.espacevilla.com) — WordPress + Houzez theme, ~1 240
 * ads (103 pages × 12), almost all sales (land + villas), Dakar and Petite Côte.
 * Reviewed 24/11/2026: no CGU page (only a privacy policy, no robots/copy
 * clause); robots.txt only disallows /wp-admin/. Internal research use only.
 *
 * Index: "/" then "/page/N/" — 12 Houzez cards each (status, price + unit,
 * address, area, type, author, relative age). Every page also embeds a map
 * JSON (houzezOpenStreetMapElementor) with property_id → lat/lng, used to geo-
 * tag the cards. Past the last page the site answers 200 with 0 cards → the
 * ingest loop stops on the empty page.
 * Ad page: overview (type, m², beds, baths), description, address block,
 * gallery, agent block (name + tel), houzez_single_property_map (lat/lng).
 */

const BASE = "https://immobilier.espacevilla.com";
const EUR_TO_XOF = 655.957;
/** The site's own house account ("Agent EV"). Espace Villa is itself an agency, so its line IS kept as the seller phone (decision 24/11/2026). */

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null : null;

/** "Villa à vendre", "Terrain à vendre, Villa à vendre" → first type in our vocabulary. */
export function evPropertyType(raw: string | null | undefined): string | null {
  const t = fold(raw ?? "").split(",")[0];
  if (!t) return null;
  if (t.includes("terrain") || t.includes("parcelle")) return "terrain";
  if (t.includes("villa")) return "villa";
  if (t.includes("appartement")) return t.includes("meubl") ? "appartement-meuble" : "appartement";
  if (t.includes("immeuble")) return "immeuble";
  if (t.includes("maison")) return "maison";
  if (t.includes("bureau")) return "bureau";
  if (t.includes("hotel") || t.includes("commerc") || t.includes("restau") || t.includes("local")) return "commercial";
  if (t.includes("chambre")) return "chambre";
  return null;
}

export function evTransaction(status: string | null, type: string | null, priceRaw: string | null): Transaction {
  const s = fold([status, type].filter(Boolean).join(" "));
  if (/louer|location/.test(s) || /\/\s*mois/i.test(priceRaw ?? "")) return "RENT";
  if (/vendre|vente/.test(s)) return "SALE";
  return "UNKNOWN";
}

/**
 * "650,000,000FCFA" → 650 000 000 · "35,000FCFA/m2" × area · "60,000FCFA/Ha" × ha ·
 * "16,000,000FCFA/terrain" or "/Parcelle" = total · "€" → XOF. < 1000 → null.
 */
export function evPrice(raw: string | null, areaM2: number | null): bigint | null {
  if (!raw) return null;
  const txt = raw.replace(/\s+/g, "");
  const m = txt.match(/([\d][\d,.]*)/);
  if (!m) return null;
  let n = Number(m[1].replace(/[,.](?=\d{3}(\D|$))/g, "").replace(",", "."));
  if (!Number.isFinite(n)) return null;
  if (/€|eur/i.test(txt)) n *= EUR_TO_XOF;
  const unit = fold(txt.split("/")[1] ?? "");
  if (unit.startsWith("m2") || unit.startsWith("m²")) {
    if (!areaM2) return null;
    n *= areaM2;
  } else if (unit.startsWith("ha")) {
    if (!areaM2) return null;
    n *= areaM2 / 10_000;
  }
  return n >= 1000 ? BigInt(Math.round(n)) : null;
}

/** "il y a1 semaine", "il y a 3 jours", "il y a 2 mois", "il y a 5 heures" → Date. */
export function evAge(raw: string | null | undefined, now = new Date()): Date | null {
  const m = fold(raw ?? "").match(/il y a\s*(\d+)\s*([a-z]+)/);
  if (!m) return null;
  const v = Number(m[1]);
  const u = m[2];
  const mins = u.startsWith("sec")
    ? 0
    : u.startsWith("min")
      ? v
      : u.startsWith("heure")
        ? v * 60
        : u.startsWith("jour")
          ? v * 1440
          : u.startsWith("semaine")
            ? v * 10080
            : u.startsWith("mois")
              ? v * 43200
              : u.startsWith("an")
                ? v * 525600
                : null;
  return mins == null ? null : new Date(now.getTime() - mins * 60_000);
}

/** Long Nominatim-style address → "Quartier, Région" + city (= région name). */
export function evLocation(address: string | null): { locationRaw: string | null; city: string | null } {
  if (!address) return { locationRaw: null, city: null };
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  const region = parts.find((p) => /^r[ée]gion de /i.test(p))?.replace(/^r[ée]gion de /i, "") ?? null;
  const ADMIN = /^(commune|arrondissement|d[ée]partement|r[ée]gion|communaut[ée])/i;
  const named =
    parts.find(
      (p) =>
        !/^(rue|avenue|av\.|route|boulevard|bd|all[ée]e|voie|impasse|\d)/i.test(p) &&
        !ADMIN.test(p) &&
        !/^s[ée]n[ée]gal$/i.test(p) &&
        (!region || fold(p) !== fold(region)),
    ) ?? null;
  // "Arrondissement des Almadies" / "Commune de Diamniadio" → "Almadies" / "Diamniadio"
  const fromAdmin = parts
    .find((p) => /^(arrondissement|commune)\b/i.test(p))
    ?.replace(/^(?:commune d'arrondissement|arrondissement|commune)\s+(?:des|de la|du|de|d')\s*/i, "")
    .trim();
  const place = named ?? fromAdmin ?? parts[0];
  const locationRaw = [place, region && fold(region) !== fold(place) ? region : null].filter(Boolean).join(", ") || null;
  return { locationRaw, city: region };
}

/** property_id → {lat,lng} from the map JSON embedded in every index page. */
export function evMapCoords(html: string): Map<string, { lat: number; lng: number }> {
  const out = new Map<string, { lat: number; lng: number }>();
  const k = html.indexOf('houzezOpenStreetMapElementor("');
  if (k < 0) return out;
  const start = html.indexOf("[", k);
  if (start < 0) return out;
  // Bracket-balanced scan (the array is followed by more JS on the same line).
  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = -1;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "[") depth++;
    else if (c === "]" && --depth === 0) {
      end = i;
      break;
    }
  }
  if (end < 0) return out;
  try {
    const arr = JSON.parse(html.slice(start, end + 1)) as { property_id: number | string; lat?: string; lng?: string }[];
    for (const p of arr) {
      const lat = Number(p.lat);
      const lng = Number(p.lng);
      if (Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0) out.set(String(p.property_id), { lat, lng });
    }
  } catch {
    // map unavailable — cards still parse
  }
  return out;
}

export function parseEspaceVillaIndex(html: string, now = new Date()): ParsedListing[] {
  const coords = evMapCoords(html);
  const out = new Map<string, ParsedListing>();
  for (const block of html.split(/<div class="item-listing-wrap /).slice(1)) {
    const externalId = block.match(/data-hz-id="hz-(\d+)"/)?.[1] ?? block.match(/data-listid="(\d+)"/)?.[1];
    if (!externalId || out.has(externalId)) continue;
    const titleM = block.match(/<h2 class="item-title">\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!titleM) continue;

    const status = strip(block.match(/label-status[^>]*>([\s\S]*?)<\/a>/)?.[1]);
    const type = strip(block.match(/<li class="h-type"><span>([\s\S]*?)<\/span>/)?.[1]);
    const areaNum = Number(block.match(/<li class="h-area">[\s\S]*?<span class="hz-figure">([\d.,\s]+)<\/span>/)?.[1]?.replace(/[\s,]/g, ""));
    const areaUnit = fold(block.match(/area_postfix">([^<]*)</)?.[1] ?? "m²");
    const areaM2 = Number.isFinite(areaNum) && areaNum > 0 ? (areaUnit.startsWith("ha") ? areaNum * 10_000 : areaNum) : null;
    const priceRaw = strip(block.match(/class="item-price">([\s\S]*?)<\/li>/)?.[1]);
    const beds = Number(block.match(/<li class="h-beds">[\s\S]*?<span class="hz-figure">(\d+)/)?.[1]);
    const address = strip(block.match(/<address class="item-address">([\s\S]*?)<\/address>/)?.[1]);
    const { locationRaw, city } = evLocation(address);
    const author = strip(block.match(/class="item-author">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/)?.[1]);
    const geo = coords.get(externalId);
    const propertyType = evPropertyType(type);

    out.set(externalId, {
      externalId,
      url: decodeEntities(titleM[1]),
      title: strip(titleM[2]),
      transaction: evTransaction(status, type, priceRaw),
      propertyType,
      priceXof: evPrice(priceRaw, areaM2),
      priceRaw,
      surfaceM2: areaM2 ?? surfaceFromText(strip(titleM[2])),
      bedrooms: Number.isFinite(beds) && beds > 0 ? beds : null,
      city,
      locationRaw,
      sellerName: author,
      sellerPhone: null, // ad page only
      postedAt: evAge(strip(block.match(/class="item-date">([\s\S]*?)<\/div>/)?.[1]), now),
      lat: geo?.lat ?? null,
      lng: geo?.lng ?? null,
    });
  }
  return [...out.values()];
}

/** ParsedDetail + coordinates (ingest writes every non-null key; lat/lng are ListingRaw columns). */
export type EspaceVillaDetail = ParsedDetail & { lat: number | null; lng: number | null };

export function parseEspaceVillaDetail(html: string): EspaceVillaDetail {
  const ov = (cls: string) => {
    const m = html.match(new RegExp(`<strong>([^<]*)</strong></li>\\s*<li class="hz-meta-label ${cls}"`));
    const n = m ? Number(m[1].replace(/[^\d.]/g, "")) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  const description = htmlToText(html.match(/<div class="description-content">([\s\S]*?)<\/div>/)?.[1]);
  const city = strip(html.match(/<li class="detail-city"><strong>[^<]*<\/strong>\s*<span>([\s\S]*?)<\/span>/)?.[1]);
  const area = strip(html.match(/<li class="detail-area"><strong>[^<]*<\/strong>\s*<span>([\s\S]*?)<\/span>/)?.[1]);
  const gallery = html.match(/property-gallery-js[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>|$)/)?.[0] ?? "";
  const photos = new Set(gallery.match(/data-thumb="([^"]+)"/g) ?? []).size;

  const agentBlock = html.match(/<div class="agent-details">([\s\S]*?)<\/ul>/)?.[1] ?? "";
  const agentName = strip(agentBlock.match(/<li class="agent-name">([\s\S]*?)<\/li>/)?.[1]);
  const tel = html.match(/href="tel:([^"]+)"[^>]*class="[^"]*hz-btn-call/)?.[1] ?? html.match(/href="tel:([^"]+)"/)?.[1];

  const mapJson = html.match(/var houzez_single_property_map = (\{[\s\S]*?\});/)?.[1];
  let lat: number | null = null;
  let lng: number | null = null;
  if (mapJson) {
    try {
      const m = JSON.parse(mapJson) as { lat?: string; lng?: string };
      const la = Number(m.lat);
      const ln = Number(m.lng);
      if (Number.isFinite(la) && Number.isFinite(ln) && la !== 0) {
        lat = la;
        lng = ln;
      }
    } catch {
      // ignore
    }
  }

  const locationRaw = city ? (area && !fold(city).includes(fold(area)) ? `${city}, ${area}` : city) : area;

  // Feature tags like ".../caractéristique/4-chambres/" are more reliable than free text.
  const featBeds = Number(html.match(/caract(?:%c3%a9|é|e)ristique\/(\d{1,2})-chambres?\//i)?.[1]);

  return {
    description,
    rooms: ov("h-rooms"),
    bedrooms: ov("h-beds") ?? (featBeds > 0 ? featBeds : null) ?? bedroomsFromText(description),
    bathrooms: ov("h-baths"),
    surfaceM2: ov("h-area") ?? ov("h-land-area") ?? surfaceFromText(description),
    photoCount: photos || null,
    locationRaw: locationRaw ?? null,
    sellerPhone: normalizePhone(tel),
    sellerName: agentName,
    lat,
    lng,
  };
}

export const espaceVilla: Connector = {
  slug: "espacevilla",
  pageUrl: (page) => (page <= 1 ? `${BASE}/` : `${BASE}/page/${page}/`),
  parseIndex: (html, now) => parseEspaceVillaIndex(html, now),
  parseDetail: parseEspaceVillaDetail,
};
