import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import { surfaceFromText, type Connector, type ParsedListing } from "@/lib/connectors/types";

/**
 * Senemarket (senemarket.sn) — generalist classifieds (Laravel "LaraClassifier"), real-estate
 * category /category/immobilier?page=N: 12 cards/page, ~210 pages (Nov 2026).
 * Card: /<slug>/<id>, h5.add-title, sub-category ("Terrains et parcelles à vendre",
 * slug land-and-plots-for-sale…), exact date in data-bs-content ("20 nov. 2026 à 11h09"),
 * location, h2.item-price ("32.000.000 FCFA"), photo count, P(ro)/particulier badge.
 * ToS (/page/terms, read 24/11/2026): no clause on automated access. robots.txt allows.
 */
const BASE = "https://www.senemarket.sn";
const MONTHS: Record<string, number> = { janv: 0, févr: 1, fevr: 1, mars: 2, avr: 3, mai: 4, juin: 5, juil: 6, août: 7, aout: 7, sept: 8, oct: 9, nov: 10, déc: 11, dec: 11 };

const strip = (s: string) => decodeEntities(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

/** "20 nov. 2026 à 11h09" → Date (Dakar = UTC). */
export function parseSenemarketDate(raw: string | null | undefined): Date | null {
  const m = raw?.toLowerCase().match(/(\d{1,2})\s+([a-zéû]+)\.?\s+(\d{4})(?:\s+à\s+(\d{1,2})h(\d{2}))?/);
  if (!m) return null;
  const month = MONTHS[m[2]] ?? MONTHS[m[2].slice(0, 4)] ?? MONTHS[m[2].slice(0, 3)];
  if (month == null) return null;
  return new Date(Date.UTC(+m[3], month, +m[1], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0));
}

export function senemarketTransaction(subcat: string, title: string): Transaction {
  const s = `${subcat} ${title}`.toLowerCase();
  if (/for-rent|for-lease|à louer|a louer|location|rent/.test(s)) return "RENT";
  if (/for-sale|à vendre|a vendre|vente/.test(s)) return "SALE";
  return "UNKNOWN";
}

export function parseSenemarketIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const card of html.split('<div class="item-list">').slice(1)) {
    const m = card.match(/<h5 class="add-title">\s*<a href="(https:\/\/www\.senemarket\.sn\/[^"]+\/(\d+))">([\s\S]*?)<\/a>/);
    if (!m) continue;
    const title = strip(m[3]) || null;
    const cats = [...card.matchAll(/href="https:\/\/www\.senemarket\.sn\/category\/immobilier\/([a-z0-9-]+)" class="info-link">([\s\S]*?)<\/a>/g)];
    const subSlug = cats[0]?.[1] ?? "";
    const subName = strip(cats[0]?.[2] ?? "");
    const loc = strip(card.match(/class="item-location">[\s\S]*?class="info-link">([\s\S]*?)<\/a>/)?.[1] ?? "") || null;
    const priceRaw = strip(card.match(/<h2 class="item-price">([\s\S]*?)<\/h2>/)?.[1] ?? "") || null;
    const when = card.match(/data-bs-content="([^"]+)">\s*il y a/)?.[1];
    // Posters often pick the wrong sub-category ("Villa à vendre" filed under land): title first.
    let propertyType = immoType(title, title ?? "") ?? immoType(subName, title ?? "");
    if (propertyType === "appartement" && /meubl/i.test(`${subName} ${title}`)) propertyType = "appartement-meuble";
    out.push({
      externalId: m[2],
      url: m[1],
      title,
      transaction: senemarketTransaction(`${subSlug} ${subName}`, title ?? ""),
      propertyType,
      priceXof: priceRaw && /cfa|xof/i.test(priceRaw) ? immoPrice(priceRaw.replace(/\./g, " ")) : null,
      priceRaw,
      surfaceM2: surfaceFromText(title),
      bedrooms: null,
      city: loc,
      locationRaw: loc,
      sellerName: /title="Professionnel"/.test(card) ? "Professionnel" : null,
      postedAt: parseSenemarketDate(when),
    });
  }
  return out;
}

export const senemarket: Connector = {
  slug: "senemarket",
  pageUrl: (page) => (page <= 1 ? `${BASE}/category/immobilier` : `${BASE}/category/immobilier?page=${page}`),
  parseIndex: (html) => parseSenemarketIndex(html),
};
