import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { bedroomsFromText, htmlToText, surfaceFromText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * CoinAfrique Sénégal connector.
 * ⚠ ToS (sn.coinafrique.com/tu §5) forbid robots and extraction. Crawled by
 * product-owner override 24/11/2026 for internal research only — never
 * republished. Keep it slow and polite (PoliteFetcher).
 *
 * Index: /categorie/immobilier?page=N — each card has a favourite button with
 * data-post-id / data-ad-price / data-ad-title / data-ad-category, a location
 * and a relative age ("6 heures"). Ad page adds rooms, bathrooms, text, phone.
 */

const BASE = "https://sn.coinafrique.com";

const TYPES: Record<string, string> = {
  appartements: "appartement",
  "appartements meubles": "appartement-meuble",
  villas: "villa",
  maisons: "maison",
  chambres: "chambre",
  terrains: "terrain",
  "bureaux & commerces": "commercial",
  immeubles: "immeuble",
};

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export function coinTransaction(title: string, propertyType: string | null): Transaction {
  const t = fold(title);
  if (/\b(location|louer|a louer|bail)\b/.test(t)) return "RENT";
  if (/\b(vente|vendre|a vendre|cession|cede)\b/.test(t)) return "SALE";
  if (propertyType?.endsWith("-meuble") || propertyType === "chambre") return "RENT";
  if (propertyType === "terrain") return "SALE";
  return "UNKNOWN";
}

/** "<span class="time">6</span><span>heures</span>" → Date. */
export function coinAge(value: number, unit: string, now = new Date()): Date | null {
  const u = fold(unit);
  const mins = u.startsWith("sec")
    ? 0
    : u.startsWith("min")
      ? value
      : u.startsWith("heure")
        ? value * 60
        : u.startsWith("jour")
          ? value * 1440
          : u.startsWith("semaine")
            ? value * 10080
            : u.startsWith("mois")
              ? value * 43200
              : u.startsWith("an")
                ? value * 525600
                : null;
  return mins == null ? null : new Date(now.getTime() - mins * 60_000);
}

function cleanLocation(raw: string | null) {
  if (!raw) return null;
  return decodeEntities(raw).replace(/\s+/g, " ").replace(/,\s*S[ée]n[ée]gal\s*$/i, "").trim() || null;
}

export function parseCoinIndex(html: string, now = new Date()): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  const chunks = html.split(/<div class="card /).slice(1);
  for (const chunk of chunks) {
    const fav = chunk.match(/data-post-id="(\d+)" data-ad-price="([^"]*)" data-ad-title="([^"]*)" data-ad-category="([^"]*)"/);
    if (!fav) continue;
    const [, externalId, priceStr, rawTitle, rawCat] = fav;
    if (out.has(externalId)) continue;
    const href = chunk.match(/href="(\/annonce\/[^"]+)"/)?.[1];
    if (!href) continue;

    const title = decodeEntities(rawTitle);
    const propertyType = TYPES[fold(decodeEntities(rawCat))] ?? (fold(rawCat) || null);
    const priceNum = Number(priceStr);
    const location = cleanLocation(
      chunk.match(/(?:ad__card-location|card-location)"[^>]*>[\s\S]*?<\/i>(?:&nbsp;|\s)*(?:<span>)?([^<]+)/)?.[1] ?? null,
    );
    const age = chunk.match(/<span class="time">(\d+)<\/span>\s*<span>([^<]+)<\/span>/);
    const beds = fold(title).match(/(\d+)\s*chambres?/);

    out.set(externalId, {
      externalId,
      url: `${BASE}${href}`,
      title,
      transaction: coinTransaction(title, propertyType),
      propertyType,
      priceXof: priceNum >= 1000 ? BigInt(Math.round(priceNum)) : null,
      priceRaw: priceStr ? `${priceNum.toLocaleString("fr-FR")} CFA` : null,
      surfaceM2: surfaceFromText(title),
      bedrooms: beds ? Number(beds[1]) : null,
      city: location?.includes(",") ? location.split(",").pop()!.trim() : null,
      locationRaw: location,
      sellerName: decodeEntities(chunk.match(/title="Visiter le profil de ([^"]+)"/)?.[1] ?? "") || null,
      sellerPhone: null, // only on the ad page
      postedAt: age ? coinAge(Number(age[1]), age[2], now) : null,
    });
  }
  return [...out.values()];
}

export function parseCoinDetail(html: string): ParsedDetail {
  const chars = new Map<string, string>();
  const block = html.match(/<div class="details-characteristics">([\s\S]*?)<\/ul>/)?.[1] ?? "";
  for (const m of block.matchAll(/<span>([^<]+)<\/span>\s*<span class="qt">([^<]*)<\/span>/g)) {
    chars.set(fold(decodeEntities(m[1])), decodeEntities(m[2]).trim());
  }
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = [...chars.entries()].find(([c]) => c.includes(k))?.[1];
      const n = v ? Number(v.replace(/[^\d]/g, "")) : NaN;
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };
  const descHtml = html.match(/ad__info__box-descriptions">[\s\S]*?<\/p>\s*<p>([\s\S]*?)<\/p>/)?.[1];
  const description = htmlToText(descHtml);
  const id = html.match(/id="report_ad_id" value="(\d+)"/)?.[1];
  const photos = id ? new Set(html.match(new RegExp(`${id}_uploaded_image\\d+`, "g")) ?? []).size : 0;
  const loc = html.match(/location_[^"]*\.png"[^>]*>\s*<span>([^<]+)<\/span>/)?.[1] ?? null;

  return {
    description,
    rooms: num("pieces"),
    bedrooms: num("chambres") ?? bedroomsFromText(description),
    bathrooms: num("salles de bain", "salle de bain"),
    surfaceM2: num("superficie", "surface") ?? surfaceFromText(description),
    photoCount: photos || null,
    locationRaw: cleanLocation(loc),
    sellerPhone: normalizePhone(html.match(/href="tel:([^"]+)"/)?.[1] ?? html.match(/phone-number="([^"]+)"/)?.[1]),
  };
}

export const coinAfrique: Connector = {
  slug: "coinafrique-sn",
  pageUrl: (page) => (page <= 1 ? `${BASE}/categorie/immobilier` : `${BASE}/categorie/immobilier?page=${page}`),
  parseIndex: parseCoinIndex,
  parseDetail: parseCoinDetail,
};
