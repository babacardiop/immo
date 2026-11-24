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
 * Seneweb Immo connector (seneweb.com/services/immo).
 * ToS: no terms page found (footer, /cgu, /mentions-legales… all absent/404) — 24/11/2026.
 * robots.txt: Allow /*?page=, Crawl-delay 1 (PoliteFetcher still waits ≥5 s).
 *
 * Index: /services/immo?page=N — 12 cards per page, each `div.autos-product-card`
 * with type label, title, 📍 location, chips (À vendre/À louer, N pièces, N m²),
 * price, and a fav button carrying data-ref / data-price.
 * Ad page: technical-data list (h6 / span), description, gallery JSON, tel: link.
 */

const BASE = "https://seneweb.com";

const TYPES: Record<string, string> = {
  appartement: "appartement",
  studio: "appartement",
  villa: "villa",
  maison: "maison",
  terrain: "terrain",
  bureau: "bureau",
  chambre: "chambre",
  immeuble: "immeuble",
  local: "commercial",
  commerce: "commercial",
  magasin: "commercial",
  entrepot: "commercial",
};

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export function senewebType(label: string | null, title: string): string | null {
  const key = fold(label ?? "");
  let type = TYPES[key] ?? Object.entries(TYPES).find(([k]) => key.startsWith(k))?.[1] ?? (key || null);
  if (type === "appartement" && /\bmeubl/.test(fold(title))) type = "appartement-meuble";
  return type;
}

export function senewebTransaction(chip: string | null, title: string, type: string | null): Transaction {
  const c = fold(chip ?? "");
  if (c.includes("louer") || c.includes("location")) return "RENT";
  if (c.includes("vendre") || c.includes("vente")) return "SALE";
  const t = fold(title);
  if (/\b(a louer|location|louer)\b/.test(t)) return "RENT";
  if (/\b(a vendre|vente|vendre)\b/.test(t)) return "SALE";
  if (type === "appartement-meuble" || type === "chambre") return "RENT";
  if (type === "terrain") return "SALE";
  return "UNKNOWN";
}

const strip = (s: string | undefined | null) => (s ? decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() || null : null);

export function parseSenewebIndex(html: string): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  for (const card of html.split(/<div class="autos-product-card">/).slice(1)) {
    const href = card.match(/href="(\/services\/immo\/annonce\/([^/"]+)\/[^"]*)"/);
    const externalId = card.match(/data-ref="([^"]+)"/)?.[1] ?? href?.[2];
    if (!href || !externalId || out.has(externalId)) continue;

    const content = card.match(/<div class="autos-product-card-content">([\s\S]*?)<\/div>\s*<a /)?.[1] ?? card;
    const label = strip(content.match(/^\s*<span>([^<]*)<\/span>/)?.[1]);
    const titleHtml = content.match(/<h5>\s*([\s\S]*?)<\/h5>/)?.[1] ?? "";
    const title = strip(titleHtml.replace(/<span>[\s\S]*?<\/span>/g, "")) ?? strip(card.match(/aria-label="([^"]*)"/)?.[1]);
    const location = strip(content.match(/<p class="svc-card-loc">([\s\S]*?)<\/p>/)?.[1])?.replace(/^📍\s*/u, "") || null;
    const chips = [...(content.match(/<div class="svc-card-chips">([\s\S]*?)<\/div>/)?.[1] ?? "").matchAll(/<span>([^<]*)<\/span>/g)].map(
      (m) => decodeEntities(m[1]).trim(),
    );
    const txChip = chips.find((c) => /louer|vendre|location|vente/i.test(c)) ?? null;
    const surfaceChip = chips.find((c) => /m²|m2/i.test(c));

    const priceNum = Number(card.match(/data-price="([\d.]+)"/)?.[1] ?? "0");
    const priceRaw = strip(content.match(/<h5 class="price">([\s\S]*?)<\/h5>/)?.[1]);
    const t = title ?? "";
    const propertyType = senewebType(label, t);

    out.set(externalId, {
      externalId,
      url: `${BASE}${href[1]}`,
      title,
      transaction: senewebTransaction(txChip, t, propertyType),
      propertyType,
      priceXof: priceNum >= 1000 ? BigInt(Math.round(priceNum)) : null,
      priceRaw,
      surfaceM2: surfaceFromText(surfaceChip) ?? surfaceFromText(t),
      bedrooms: bedroomsFromText(t),
      city: null, // cards give a single locality (e.g. "POINT E")
      locationRaw: location,
      sellerName: null, // only on the ad page
      sellerPhone: null, // only on the ad page
      postedAt: null, // only on the ad page
    });
  }
  return [...out.values()];
}

export function parseSenewebDetail(html: string): ParsedDetail {
  const tech = new Map<string, string>();
  const list = html.match(/<ul class="technical-data-list">([\s\S]*?)<\/ul>/)?.[1] ?? "";
  for (const m of list.matchAll(/<h6>([\s\S]*?)<\/h6>\s*<span>([\s\S]*?)<\/span>/g)) {
    tech.set(fold(strip(m[1]) ?? ""), strip(m[2]) ?? "");
  }
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = [...tech.entries()].find(([key]) => key.startsWith(k))?.[1];
      const n = v ? Number(v.replace(/[^\d]/g, "")) : NaN;
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };
  const description = htmlToText(html.match(/<div class="autos-post-description">\s*<h4>[^<]*<\/h4>\s*<p>([\s\S]*?)<\/p>/)?.[1]);
  const images = html.match(/const images\s*=\s*(\[[^\]]*\])/)?.[1];
  let photoCount: number | null = null;
  if (images) {
    try {
      photoCount = (JSON.parse(images) as unknown[]).length || null;
    } catch {
      photoCount = null;
    }
  }

  return {
    description,
    rooms: num("pieces"),
    bedrooms: num("chambres") ?? bedroomsFromText(description),
    bathrooms: num("salles de bain", "salle de bain", "salles d'eau"),
    surfaceM2: num("surface", "superficie") ?? surfaceFromText(description),
    photoCount,
    locationRaw: tech.get("localisation") || null,
    sellerPhone: normalizePhone(html.match(/href="tel:([^"]+)"/)?.[1] ?? html.match(/wa\.me\/(\d+)/)?.[1]),
    postedAt: parseSenewebDate(html.match(/icon-date"><\/i>\s*<span>([^<]+)<\/span>/)?.[1]),
    sellerName: strip(html.match(/appelez directement ([^—<]+?)\s*(?:—|<)/)?.[1] ?? null) || null,
  };
}

const SW_MONTHS: Record<string, number> = {
  jan: 0, janv: 0, feb: 1, fev: 1, fevr: 1, mar: 2, mars: 2, apr: 3, avr: 3, may: 4, mai: 4, jun: 5, juin: 5,
  jul: 6, juil: 6, aug: 7, aou: 7, aout: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

/** "19 Nov 2026" / "3 févr. 2026" → UTC midnight. */
export function parseSenewebDate(raw: string | null | undefined): Date | null {
  const m = raw ? fold(raw).match(/(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})/) : null;
  if (!m) return null;
  const month = SW_MONTHS[m[2]] ?? SW_MONTHS[m[2].slice(0, 4)] ?? SW_MONTHS[m[2].slice(0, 3)];
  return month == null ? null : new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
}

export const seneweb: Connector = {
  slug: "seneweb-immo",
  pageUrl: (page) => (page <= 1 ? `${BASE}/services/immo` : `${BASE}/services/immo?page=${page}`),
  parseIndex: (html) => parseSenewebIndex(html),
  parseDetail: parseSenewebDetail,
};
