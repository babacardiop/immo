import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import type { Connector, ParsedDetail, ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Agencies on the WordPress plugin G5 ERE (3H Immobilier, Immo Star… Nov 2026; FR or EN labels).
 * The REST API doesn't expose the "property" post type → index = Yoast /property-sitemap.xml
 * (one URL per ad, /property/<slug>/). The slug alone gives a first guess (louer/vendre, type);
 * the ad page then supplies everything: h1 title, .g5ere__lpp-price, .g5ere__property-status
 * (Location / Vente), overview "<span>Chambres|Bedrooms</span><strong>3</strong>", Superficie|Size,
 * og:description, agency phone (tel:).
 */
type G5Detail = ParsedDetail & {
  title?: string | null;
  transaction?: Transaction;
  propertyType?: string | null;
  priceXof?: bigint | null;
  priceRaw?: string | null;
};

const text = (s: string | undefined) => decodeEntities((s ?? "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function txFrom(s: string): Transaction {
  const f = fold(s);
  if (/\b(louer|location|rent)\b/.test(f)) return "RENT";
  if (/\b(vendre|vente|sale)\b/.test(f)) return "SALE";
  return "UNKNOWN";
}

export function parseG5Sitemap(xml: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const m of xml.matchAll(/<loc>\s*(https?:\/\/[^<\s]+\/property\/([a-z0-9-]+)\/?)\s*<\/loc>/g)) {
    const [, url, slug] = m;
    const words = slug.replace(/-\d+$/, "").replace(/-/g, " ");
    out.push({
      externalId: slug,
      url,
      title: null,
      transaction: txFrom(words),
      propertyType: immoType(words, words),
      priceXof: null,
      priceRaw: null,
      surfaceM2: null,
      bedrooms: null,
      city: null,
      locationRaw: null,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

export function parseG5Detail(html: string): G5Detail {
  const overview = new Map<string, string>();
  for (const [, label, value] of html.matchAll(/<span>([^<]{2,30})<\/span>\s*<strong>([\s\S]*?)<\/strong>/g)) {
    overview.set(fold(label.trim()), text(value));
  }
  const get = (...labels: string[]) => labels.map((l) => overview.get(fold(l))).find((v) => v);
  const int = (s: string | undefined) => (s && /\d/.test(s) ? Number(s.replace(/[^\d]/g, "")) || null : null);
  const title = text(html.match(/<h1 class="g5ere__property-title">([\s\S]*?)<\/h1>/)?.[1]) || null;
  const priceRaw = text(html.match(/class="g5ere__lpp-price">([\s\S]*?)<\/span>/)?.[1]) || null;
  const status = text(html.match(/class="g5ere__property-status">([\s\S]*?)<\/span>/)?.[1]);
  const type = get("Type de biens", "Type", "Property Type");
  const size = get("Superficie", "Size", "Surface")?.match(/(\d[\d\s.,]*)/)?.[1];
  const tel = html.match(/href="tel:([+\d\s]+)"/)?.[1]?.replace(/\s/g, "");
  let propertyType = immoType(type ?? title, title ?? "");
  if (propertyType === "appartement" && /meubl/i.test(title ?? "")) propertyType = "appartement-meuble";
  const transaction = txFrom(status) !== "UNKNOWN" ? txFrom(status) : txFrom(title ?? "");
  return {
    title,
    ...(transaction !== "UNKNOWN" ? { transaction } : {}),
    propertyType,
    priceXof: immoPrice(priceRaw),
    priceRaw,
    description: text(html.match(/<meta property="og:description" content="([^"]*)"/)?.[1]) || null,
    rooms: int(get("Pièces", "Rooms")),
    bedrooms: int(get("Chambres", "Bedrooms")),
    bathrooms: int(get("Salles de bains", "Bathrooms")),
    surfaceM2: size ? Number(size.replace(/[\s.]/g, "").replace(",", ".")) || null : null,
    photoCount: null,
    locationRaw: null,
    sellerPhone: normalizePhone(tel),
  };
}

export function g5ereConnector(slug: string, base: string): Connector {
  return {
    slug,
    // Single sitemap page; page 2 → 404 ends the crawl.
    pageUrl: (page) => (page <= 1 ? `${base}/property-sitemap.xml` : `${base}/property-sitemap${page}.xml`),
    parseIndex: (xml) => parseG5Sitemap(xml),
    parseDetail: parseG5Detail,
  };
}

export const troisH = g5ereConnector("3h-immobilier", "https://3h-immobilier.com");
export const immoStar = g5ereConnector("immo-star-dakar", "https://www.agence-immobiliere-dakar.com");
