import type { Transaction } from "@prisma/client";
import type { Connector, ParsedListing } from "@/lib/connectors/types";

/**
 * Expat-Dakar connector (S2 spike). Reads ONLY the category index pages:
 * every card carries data-t-listing_* attributes (id, title, category, price,
 * currency, location) plus chips (bedrooms, m²), a date and the seller name.
 * Detail pages are never fetched. WhatsApp numbers on cards are ignored.
 * ToS reviewed 24/11/2026: internal use only, no republication.
 */

const BASE = "https://www.expat-dakar.com";
const EUR_TO_XOF = 655.957; // fixed parity

const MONTHS: Record<string, number> = {
  janv: 0, fevr: 1, mars: 2, avr: 3, mai: 4, juin: 5,
  juil: 6, aout: 7, sept: 8, oct: 9, nov: 10, dec: 11,
};
const WEEKDAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function decodeEntities(s: string) {
  return s
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** "Aujourd'hui, 00:14" · "Hier, 23:00" · "jeudi, 15:47" · "4. nov., 10:06". Dakar = UTC. */
export function parseExpatDate(raw: string, now = new Date()): Date | null {
  const s = fold(decodeEntities(raw)).trim();
  const time = s.match(/(\d{1,2}):(\d{2})\s*$/);
  if (!time) return null;
  const [h, m] = [Number(time[1]), Number(time[2])];
  const at = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m));
  const daysAgo = (n: number) => at(new Date(now.getTime() - n * 864e5));

  if (s.startsWith("aujourd")) return daysAgo(0);
  if (s.startsWith("hier")) return daysAgo(1);
  const wd = WEEKDAYS.findIndex((w) => s.startsWith(w));
  if (wd >= 0) {
    const diff = (now.getUTCDay() - wd + 7) % 7 || 7; // a weekday name is never today
    return daysAgo(diff);
  }
  const dm = s.match(/^(\d{1,2})\.?\s*([a-z]+)/);
  const month = dm ? (MONTHS[dm[2].slice(0, 4)] ?? MONTHS[dm[2].slice(0, 3)]) : undefined;
  if (dm && month !== undefined) {
    let d = new Date(Date.UTC(now.getUTCFullYear(), month, Number(dm[1]), h, m));
    if (d.getTime() > now.getTime() + 864e5) d = new Date(Date.UTC(now.getUTCFullYear() - 1, month, Number(dm[1]), h, m));
    return d;
  }
  return null;
}

export function categoryToKind(slug: string): { transaction: Transaction; propertyType: string | null } {
  const transaction: Transaction = /-a-vendre$/.test(slug)
    ? "SALE"
    : /-a-louer$|meubles?$|colocation/.test(slug)
      ? "RENT"
      : "UNKNOWN";
  const type = slug.match(/^(appartements|maisons|terrains|chambres|proprietes-commerciales|bureaux|villas|immeubles)/)?.[1];
  const propertyType = type
    ? ({ appartements: "appartement", maisons: "maison", terrains: "terrain", chambres: "chambre", "proprietes-commerciales": "commercial", bureaux: "bureau", villas: "villa", immeubles: "immeuble" } as Record<string, string>)[type]
    : null;
  return { transaction, propertyType: slug.includes("meubles") ? `${propertyType ?? "logement"}-meuble` : propertyType };
}

function attr(block: string, name: string) {
  const m = block.match(new RegExp(`data-t-listing_${name}="([^"]*)"`));
  return m ? decodeEntities(m[1]) : null;
}

function text(block: string, re: RegExp) {
  const m = block.match(re);
  return m ? decodeEntities(m[1].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() || null : null;
}

export function parseExpatIndex(html: string, now = new Date()): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  for (const [block] of html.matchAll(/<article class="tw-sr-card[\s\S]*?<\/article>/g)) {
    const externalId = attr(block, "id");
    if (!externalId || out.has(externalId)) continue;
    const href = block.match(/href="(https:\/\/www\.expat-dakar\.com\/annonce\/[^"]+)"/)?.[1];
    const category = attr(block, "category_slug") ?? "";
    const { transaction, propertyType } = categoryToKind(category);

    const priceNum = Number(attr(block, "price") ?? "0");
    const currency = attr(block, "currency") ?? "XOF";
    // < 1 000 FCFA = placeholder ("1 FCFA", "prix sur demande") → unknown.
    const priceXof =
      priceNum >= 1000 ? BigInt(Math.round(currency === "EUR" ? priceNum * EUR_TO_XOF : priceNum)) : null;

    const chips = [...block.matchAll(/<li class="tw-sr-chip">([^<]*)<\/li>/g)].map((c) => decodeEntities(c[1]).trim());
    const surface = chips.map((c) => c.match(/^([\d\s.,]+)\s*m²/)?.[1]).find(Boolean);
    const beds = chips.map((c) => c.match(/^(\d+)\s*chambres?/i)?.[1]).find(Boolean);

    const locationRaw = text(block, /tw-sr-card__location">([\s\S]*?)<\/p>/) ?? attr(block, "location_title");
    const city = locationRaw?.includes(",") ? locationRaw.split(",").pop()!.trim() : null;
    const dateRaw = text(block, /tw-sr-card__date--list">([\s\S]*?)<\/p>/);

    out.set(externalId, {
      externalId,
      url: href ?? `${BASE}/annonce/${attr(block, "slug") ?? ""}-${externalId}`,
      title: attr(block, "title"),
      transaction,
      propertyType,
      priceXof,
      priceRaw: text(block, /tw-premium-price-value">([\s\S]*?)<\/span>/) ?? text(block, /tw-sr-card__price">([\s\S]*?)<\/div>/),
      surfaceM2: surface ? Number(surface.replace(/\s/g, "").replace(",", ".")) : null,
      bedrooms: beds ? Number(beds) : null,
      city,
      locationRaw,
      sellerName: text(block, /tw-sr-card__seller">[\s\S]*?<strong>([\s\S]*?)<\/strong>/),
      postedAt: dateRaw ? parseExpatDate(dateRaw, now) : null,
    });
  }
  return [...out.values()];
}

export const expatDakar: Connector = {
  slug: "expat-dakar",
  pageUrl: (page) => (page <= 1 ? `${BASE}/immobilier` : `${BASE}/immobilier?page=${page}`),
  parseIndex: parseExpatIndex,
};
