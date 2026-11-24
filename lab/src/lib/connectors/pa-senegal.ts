import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoTransaction, immoType } from "@/lib/connectors/immobilier-sn";
import { surfaceFromText, type Connector, type ParsedListing } from "@/lib/connectors/types";

/**
 * PA Sénégal (pa-senegal.com) — generalist classifieds, real-estate section
 * /immobilier/?page=N (30 cards per page, ~6 pages in Nov 2026).
 *
 * ToS (/conditions.php, read 24/11/2026): no clause on automated access.
 * robots.txt: allows * except /photos/, /numero_image.php, /phoneNumber.png… →
 * phones are images behind disallowed URLs: we never fetch them.
 * Server-side rate limit "6 hits/min per /24, ban 2h" (robots comments) → 12 s
 * between requests. Index only: cards carry price, title, place, date.
 */
const BASE = "https://www.pa-senegal.com";

const strip = (s: string) => decodeEntities(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

/** "11/12/2024" → Date (UTC). */
export function parsePaDate(raw: string | null | undefined): Date | null {
  const m = raw?.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : null;
}

export function parsePaIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const card of html.split('<article class="sn-card"').slice(1)) {
    const href = card.match(/class="sn-card__link" href="([^"]+)"/)?.[1];
    if (!href) continue;
    // /annonce/<city-slug>/<id>/<slug>.html
    const m = href.match(/^\/annonce\/([^/]+)\/([^/]+)\//);
    if (!m) continue;
    const title = strip(card.match(/sn-card__title">([\s\S]*?)<\/div>/)?.[1] ?? "") || null;
    const priceRaw = strip(card.match(/sn-card__price">([\s\S]*?)<\/div>/)?.[1] ?? "") || null;
    const loc = strip(card.match(/class="loc">([\s\S]*?)<\/span>/)?.[1] ?? "").replace(/^📍\s*/, "") || null;
    const date = card.match(/class="cat">([\s\S]*?)<\/span>/)?.[1];
    const citySlug = m[1] === "senegal" ? null : m[1];
    out.push({
      externalId: m[2],
      url: BASE + href,
      title,
      transaction: immoTransaction(null, title ?? "", priceRaw ?? ""),
      propertyType: immoType(title, title ?? ""),
      priceXof: immoPrice(priceRaw),
      priceRaw,
      surfaceM2: surfaceFromText(title),
      bedrooms: null,
      city: citySlug ? citySlug.charAt(0).toUpperCase() + citySlug.slice(1) : null,
      locationRaw: loc,
      sellerName: null,
      postedAt: parsePaDate(date),
    });
  }
  return out;
}

export const paSenegal: Connector = {
  slug: "pa-senegal",
  pageUrl: (page) => (page <= 1 ? `${BASE}/immobilier/` : `${BASE}/immobilier/?page=${page}`),
  parseIndex: (html) => parsePaIndex(html),
  minDelayMs: 12_000,
};
