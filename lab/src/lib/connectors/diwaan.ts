import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import { htmlToText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Diwaan Immo (diwaan-immo.com) — Dakar agency network / portal, ~219 ads (sitemap, Nov 2026).
 * Index: /proprietes?page=N, 12 cards (badge Vente / Location Mensuelle / Location Journée,
 * price "+ / mois|/ jour", title, "Quartier, Ville", ch. / sdb. / m²).
 * Ad page /propriete/<slug>-<id>: JSON-LD RealEstateListing, description, agent WhatsApp.
 * The tel: 78 195 05 05 in header/footer is the platform's own line — ignored.
 *
 * ⚠ ToS (/terms, read 24/11/2026): "Ne pas collecter les données d'autres utilisateurs sans
 * autorisation" + no reproduction / exploitation without written consent. robots.txt allows
 * all public pages. Needs a product-owner override before crawling (like habita-sn).
 */
const BASE = "https://www.diwaan-immo.com";
const PLATFORM_PHONE = "221781950505";

const strip = (s: string) => decodeEntities(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const num = (s: string | undefined) => (s ? Number(s.replace(",", ".")) : null);

export function diwaanTransaction(badge: string | null, title: string | null): Transaction {
  const b = (badge ?? "").toLowerCase();
  if (b.includes("vente")) return "SALE";
  if (b.includes("location")) return "RENT";
  const t = (title ?? "").toLowerCase();
  if (/(à|a) louer|location/.test(t)) return "RENT";
  if (/(à|a) vendre|vente/.test(t)) return "SALE";
  return "UNKNOWN";
}

export function parseDiwaanIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const card of html.split('<article class="card property-card"').slice(1)) {
    const url = card.match(/href="(https:\/\/www\.diwaan-immo\.com\/propriete\/[^"]+)"/)?.[1];
    const id = url?.match(/-([A-Za-z0-9]{6})$/)?.[1];
    if (!url || !id) continue;
    const badge = strip(card.match(/class="badge badge-[a-z-]+">([\s\S]*?)<\/span>/)?.[1] ?? "") || null;
    const priceRaw = strip(card.match(/class="price">([\s\S]*?)<\/p>/)?.[1] ?? "") || null;
    const title = strip(card.match(/class="title">([\s\S]*?)<\/h3>/)?.[1] ?? "") || null;
    const loc = strip(card.match(/class="location">([\s\S]*?)<\/p>/)?.[1] ?? "") || null;
    const feats = strip(card.match(/class="features">([\s\S]*?)<\/div>/)?.[1] ?? "");
    const furnished = /meubl/i.test(title ?? "") || /journ/i.test(badge ?? "");
    let propertyType = immoType(title, title ?? "");
    if (propertyType === "appartement" && furnished) propertyType = "appartement-meuble";
    out.push({
      externalId: id,
      url,
      title,
      transaction: diwaanTransaction(badge, title),
      propertyType,
      priceXof: immoPrice(priceRaw),
      // Keep the rental period visible ("70 000 CFA / jour") — badge says daily vs monthly.
      priceRaw: priceRaw && badge ? `${priceRaw} (${badge})` : priceRaw,
      surfaceM2: num(feats.match(/([\d.,]+)\s*m²/)?.[1]),
      bedrooms: num(feats.match(/(\d+)\s*ch\./)?.[1]),
      city: loc?.split(",").pop()?.trim() || null,
      locationRaw: loc,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

export function parseDiwaanDetail(html: string): ParsedDetail {
  const stat = (label: string) => num(html.match(new RegExp(`>(\\d+)</p>\\s*<p[^>]*>${label}</p>`))?.[1]);
  const desc = html.match(/white-space: pre-line;">([\s\S]*?)<\/div>/)?.[1];
  const wa = html.match(/href="https:\/\/wa\.me\/(\d{8,15})\?/)?.[1];
  const phone = normalizePhone(wa);
  const ld = html.match(/"addressLocality":\s*"([^"]*)"/)?.[1];
  // Only the ad's own gallery — "Propriétés similaires" cards below carry other ads' photos.
  const main = html.split("Propriétés similaires")[0];
  const photos = new Set(main.match(/storage\/properties\/[^"' )]+/g) ?? []);
  return {
    description: htmlToText(desc),
    rooms: null,
    bedrooms: stat("Chambres"),
    bathrooms: stat("Salles de bain"),
    surfaceM2: num(html.match(/>([\d.,]+)\s*m²<\/p>/)?.[1]),
    photoCount: photos.size || null,
    locationRaw: ld ? decodeEntities(ld) : null,
    sellerPhone: phone && phone !== PLATFORM_PHONE ? phone : null,
  };
}

export const diwaan: Connector = {
  slug: "diwaan-immo",
  pageUrl: (page) => (page <= 1 ? `${BASE}/proprietes` : `${BASE}/proprietes?page=${page}`),
  parseIndex: (html) => parseDiwaanIndex(html),
  parseDetail: parseDiwaanDetail,
};
