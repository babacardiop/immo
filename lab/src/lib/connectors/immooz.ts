import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoType } from "@/lib/connectors/immobilier-sn";
import { htmlToText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Immooz Sénégal (immooz.com/sn) — Laravel/Livewire portal (also CI, TZ), Nov 2026:
 * /sn/acheter/ ≈ 211 ads, /sn/louer/ smaller. 20 cards per ?page=N.
 * Ad URL encodes everything: /sn/{acheter|louer}/{type}-a-{vendre|louer}/{region}/{quartier}/{slug}-{id}/
 * Card: price "48 000 000" + "XOF", h3 title, "Ville, Sénégal".
 * Ad page: JSON-LD RealEstateListing (datePosted, floorSize, numberOfRooms, address) and the
 * seller's phone (tel:). The wa.me/1819… link is Immooz's own support line — ignored.
 * ToS (/sn/cgu, read 24/11/2026): no clause on automated access. robots.txt allows.
 */
const BASE = "https://immooz.com/sn";
/** Index pages walked per segment (acheter ≈ 11 pages; headroom). */
export const IMMOOZ_PAGES_PER_SEGMENT = 20;
const SEGMENTS = ["acheter", "louer"] as const;

const strip = (s: string) => decodeEntities(s.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const title = (s: string) => s.replace(/(^|[-\s])\p{L}/gu, (m) => m.toUpperCase()).replace(/-/g, " ");

export function parseImmoozUrl(url: string) {
  // Quartier segment is optional: /sn/acheter/terrain-a-vendre/thies/<slug>-1437/
  const m = url.match(/\/sn\/(acheter|louer)\/([a-z0-9-]+)\/([a-z0-9-]+)\/(?:([a-z0-9-]+)\/)?[a-z0-9-]*?-(\d+)\/?$/);
  if (!m) return null;
  return { transaction: m[1] === "acheter" ? ("SALE" as const) : ("RENT" as const), typeSlug: m[2], region: m[3], quartier: m[4] ?? null, id: m[5] };
}

export function parseImmoozIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  const seen = new Set<string>();
  for (const card of html.split(/<a href="(?=https:\/\/immooz\.com\/sn\/(?:acheter|louer)\/)/).slice(1)) {
    const url = card.match(/^([^"]+)"/)?.[1];
    const u = url && parseImmoozUrl(url);
    if (!url || !u || seen.has(u.id)) continue;
    seen.add(u.id);
    const body = card.split("</a>")[0];
    const amount = strip(body.match(/<span class="text-xs font-bold[^"]*">([\s\S]*?)<\/span>/)?.[1] ?? "");
    const currency = strip(body.match(/<span class="text-xs text-neutral-500">([\s\S]*?)<\/span>/)?.[1] ?? "");
    const t = strip(body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? "") || null;
    const n = Number(amount.replace(/\D/g, ""));
    let propertyType = immoType(u.typeSlug.replace(/-a-(vendre|louer)$/, ""), t ?? "");
    if (propertyType === "appartement" && /meubl/i.test(`${u.typeSlug} ${t}`)) propertyType = "appartement-meuble";
    const quartier = !u.quartier || u.quartier.startsWith("autres-quartiers") ? null : title(u.quartier);
    out.push({
      externalId: u.id,
      url,
      title: t,
      transaction: u.transaction,
      propertyType,
      priceXof: currency === "XOF" && n >= 1000 ? BigInt(n) : null,
      priceRaw: amount ? `${amount} ${currency}`.trim() : null,
      surfaceM2: null,
      bedrooms: null,
      city: u.region.startsWith("autres-villes") ? null : title(u.region),
      locationRaw: [quartier, u.region.startsWith("autres-villes") ? null : title(u.region)].filter(Boolean).join(", ") || null,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

export function parseImmoozDetail(html: string): ParsedDetail {
  let ld: Record<string, any> = {};
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      if (j["@type"] === "RealEstateListing") ld = j;
    } catch {
      /* ignore malformed blocks */
    }
  }
  const tel = html.match(/href="tel:([+\d ]+)"/)?.[1];
  const addr = ld.address ?? {};
  const posted = typeof ld.datePosted === "string" ? new Date(`${ld.datePosted}T00:00:00Z`) : null;
  return {
    description: htmlToText(ld.description ?? null),
    rooms: typeof ld.numberOfRooms === "number" ? ld.numberOfRooms : null,
    bedrooms: null,
    bathrooms: null,
    surfaceM2: typeof ld.floorSize?.value === "number" && ld.floorSize.value > 0 ? ld.floorSize.value : null,
    photoCount: Array.isArray(ld.image) ? ld.image.length : null,
    locationRaw: [addr.streetAddress, addr.addressLocality].filter((s: unknown) => typeof s === "string" && s && !/^autres quartiers/i.test(s)).join(", ") || null,
    sellerPhone: normalizePhone(tel?.replace(/\s/g, "")),
    postedAt: posted && !Number.isNaN(posted.getTime()) ? posted : undefined,
  };
}

export const immooz: Connector = {
  slug: "immooz-sn",
  pageUrl: (page) => {
    const i = Math.max(page, 1) - 1;
    const seg = SEGMENTS[Math.floor(i / IMMOOZ_PAGES_PER_SEGMENT)] ?? "louer";
    const p = Math.floor(i / IMMOOZ_PAGES_PER_SEGMENT) >= SEGMENTS.length ? 999 : (i % IMMOOZ_PAGES_PER_SEGMENT) + 1;
    return p === 1 ? `${BASE}/${seg}/` : `${BASE}/${seg}/?page=${p}`;
  },
  parseIndex: (html) => parseImmoozIndex(html),
  parseDetail: parseImmoozDetail,
  // Two segments (sale, rent): the end of sales must not stop the crawl. Crawl with --pages=40.
  continueOnEmpty: true,
};
