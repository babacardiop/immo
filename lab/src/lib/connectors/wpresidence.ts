import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import { htmlToText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Agencies on the WordPress theme WPResidence (2Simmo, Snimmo… Nov 2026).
 * Index = the site's public WP REST API: /wp-json/wp/v2/estate_property?per_page=50&page=N&_embed=wp:term
 *   → id, link, title, date + taxonomy terms (property_action_category "Locations|Ventes",
 *     property_category "Appartements à louer", property_city, property_area).
 *   Past the last page WP answers HTTP 400 (rest_post_invalid_page_number) → end of results.
 * Ad page: price in .price_area ("105 000CFA /Mois"), "Chambres: 1", "SDB: 2", surface,
 * description, agent WhatsApp (wa.me/…) = the agency's phone.
 */
const PER_PAGE = 50;

type WpTerm = { taxonomy: string; name: string };
type WpProperty = {
  id: number;
  link: string;
  date?: string;
  title?: { rendered?: string };
  _embedded?: { "wp:term"?: WpTerm[][] };
};

const text = (s: string | undefined) => decodeEntities((s ?? "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function wpTransaction(action: string | null, category: string | null, title: string | null): Transaction {
  const s = fold(`${action ?? ""} ${category ?? ""}`);
  if (/vente|vendre/.test(s)) return "SALE";
  if (/location|louer/.test(s)) return "RENT";
  const t = fold(title ?? "");
  if (/a louer|location/.test(t)) return "RENT";
  if (/a vendre|vente/.test(t)) return "SALE";
  return "UNKNOWN";
}

const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s-])\p{L}/gu, (m) => m.toUpperCase());

export function parseWpResidenceIndex(json: string): ParsedListing[] {
  let items: WpProperty[];
  try {
    items = JSON.parse(json);
  } catch {
    return [];
  }
  if (!Array.isArray(items)) return [];
  return items.map((p) => {
    const terms = (p._embedded?.["wp:term"] ?? []).flat();
    const term = (tax: string) => terms.find((t) => t.taxonomy === tax)?.name ?? null;
    const title = text(p.title?.rendered) || null;
    const category = term("property_category");
    const city = term("property_city");
    const area = term("property_area");
    let propertyType = immoType(category ?? title, title ?? "");
    if (propertyType === "appartement" && /meubl/i.test(`${category} ${title}`)) propertyType = "appartement-meuble";
    if (!propertyType && /studio/i.test(title ?? "")) propertyType = "appartement";
    const posted = p.date ? new Date(`${p.date}Z`) : null;
    return {
      externalId: String(p.id),
      url: p.link,
      title,
      transaction: wpTransaction(term("property_action_category"), category, title),
      propertyType,
      priceXof: null,
      priceRaw: null,
      surfaceM2: null,
      bedrooms: null,
      city: city ? titleCase(text(city)) : null,
      locationRaw: [area && titleCase(text(area)), city && titleCase(text(city))].filter(Boolean).join(", ") || null,
      sellerName: null,
      postedAt: posted && !Number.isNaN(posted.getTime()) ? posted : null,
    };
  });
}

export function parseWpResidenceDetail(html: string): ParsedDetail & { priceXof?: bigint | null; priceRaw?: string | null } {
  const priceBlock = html.match(/class="price_area">([\s\S]*?)<\/div>\s*<div class="property_categs/)?.[1] ?? html.match(/class="price_area">([\s\S]{0,400}?)<\/div>\s*<\/div>/)?.[1];
  const priceRaw = priceBlock ? text(priceBlock.replace(/<div class="second_price_area">[\s\S]*?<\/div>/, "")) || null : null;
  const field = (label: string) => html.match(new RegExp(`<strong>\\s*${label}\\s*:?\\s*</strong>\\s*([^<]+)`, "i"))?.[1]?.trim();
  const num = (s: string | undefined) => (s && /\d/.test(s) ? Number(s.replace(/[^\d.,]/g, "").replace(",", ".")) || null : null);
  const desc = html.match(/<div class="wpestate_property_description[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? html.match(/id="description"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  const wa = html.match(/wa\.me\/(\d{9,15})/)?.[1];
  const surface = field("Taille de la propriété") ?? field("Surface") ?? field("Superficie");
  return {
    description: htmlToText(desc ?? null)?.replace(/^Description\s*/i, "") || null,
    rooms: num(field("Pièces")),
    bedrooms: num(field("Chambres")),
    bathrooms: num(field("SDB") ?? field("Salles de bains")),
    surfaceM2: num(surface),
    photoCount: null,
    locationRaw: null,
    sellerPhone: normalizePhone(wa),
    priceXof: immoPrice(priceRaw),
    priceRaw,
  };
}

export function wpResidenceConnector(slug: string, base: string): Connector {
  return {
    slug,
    pageUrl: (page) => `${base}/wp-json/wp/v2/estate_property?per_page=${PER_PAGE}&page=${Math.max(page, 1)}&_embed=wp:term`,
    parseIndex: (json) => parseWpResidenceIndex(json),
    parseDetail: parseWpResidenceDetail,
  };
}

export const twoSimmo = wpResidenceConnector("2simmo", "https://www.2simmobilier.com");
export const snimmo = wpResidenceConnector("snimmo", "https://snimmo.sn");
