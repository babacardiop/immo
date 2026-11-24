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
 * Loger Sénégal connector (logersenegal.com).
 * robots.txt: `User-agent: * Allow: /` (Cloudflare-managed; named AI crawlers
 * blocked, Content-Signal ai-train=no — we are not training, research only).
 * /cgu/ has no robots / extraction clause (checked 24/11/2026).
 *
 * Index: /annonces/?page=N (infinite scroll trigger `data-next-url="?page=N"`),
 * 12 `<article class="pc">` cards per page: tag (À louer / À vendre), price +
 * unit (FCFA / mois, FCFA / m² with "Total : …"), title, location, specs
 * (type, ch., sdb, m²), owner name, exact date in a title attr, photo count.
 * Ad page: RealEstateListing JSON-LD (geo, datePosted, offer), quick-facts
 * grid (Surface, Chambres, Toilettes, Étage, Salons), full description.
 *
 * Phones: every ad shows the platform's own WhatsApp line, not the owner's —
 * those are dropped so they don't merge all ads into one fake "owner".
 */

const BASE = "https://logersenegal.com";
/** Loger Sénégal's own contact line(s) — not a seller. */
export const PLATFORM_PHONES = new Set(["221764443313"]);

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null : null;
const toNum = (s: string | null | undefined) => {
  if (!s) return null;
  const n = Number(s.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};

export function sellerPhoneOrNull(raw: string | null | undefined) {
  const n = normalizePhone(raw);
  return n && !PLATFORM_PHONES.has(n) ? n : null;
}

/** "Appartement F3", "Studio séparé", "Chambre salle de bain interne" → vocabulary. */
export function logerType(raw: string | null, furnished: boolean): string | null {
  if (!raw) return null;
  const t = fold(raw);
  let type: string | null = null;
  if (/^(appartement|studio|duplex|penthouse|f\d)/.test(t)) type = "appartement";
  else if (/^villa/.test(t)) type = "villa";
  else if (/^(maison|immeuble r)/.test(t)) type = "maison";
  else if (/^terrain|^parcelle/.test(t)) type = "terrain";
  else if (/^chambre/.test(t)) type = "chambre";
  else if (/^immeuble/.test(t)) type = "immeuble";
  else if (/^bureau|^plateau/.test(t)) type = "bureau";
  else if (/^(magasin|boutique|local|entrepot|commerce|restaurant|hotel)/.test(t)) type = "commercial";
  else type = t.split(/\s+/)[0] || null;
  return furnished && type === "appartement" ? "appartement-meuble" : type;
}

/** "24/11/2026 à 00h53" (Dakar = UTC) → Date. */
export function parseLogerDate(raw: string | null | undefined): Date | null {
  const m = raw?.match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s*à\s*(\d{1,2})h(\d{2}))?/);
  if (!m) return null;
  return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0));
}

function transactionOf(tag: string | null, title: string | null, unit: string | null): Transaction {
  const t = fold(`${tag ?? ""} ${title ?? ""}`);
  if (/a vendre|vente/.test(t)) return "SALE";
  if (/a louer|location|meuble|sejour/.test(t) || /mois|nuit|jour|semaine/.test(fold(unit ?? ""))) return "RENT";
  return "UNKNOWN";
}

export function parseLogerIndex(html: string): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  for (const [block] of html.matchAll(/<article class="pc"[\s\S]*?<\/article>/g)) {
    const href = block.match(/href="(\/annonces\/[a-z0-9-]+-([0-9a-f]{8})\/)"/);
    if (!href) continue;
    const externalId = href[2];
    if (out.has(externalId)) continue;

    const tag = strip(block.match(/pc-tag pc-tag--\w+"[^>]*>([\s\S]*?)<\/span>/)?.[1]);
    const title = strip(block.match(/<h3 class="pc-title"[^>]*>([\s\S]*?)<\/h3>/)?.[1]);
    const priceBlock = block.match(/<div class="pc-price">([\s\S]*?)<\/div>/)?.[1] ?? "";
    const amount = toNum(priceBlock.match(/<strong>([\s\S]*?)<\/strong>/)?.[1]);
    const unit = strip(priceBlock.match(/<small>([\s\S]*?)<\/small>/)?.[1]);
    const total = toNum(priceBlock.match(/pc-total">[^<]*?:\s*([\d\s  .]+)/)?.[1]);

    const specs = [...(block.match(/<div class="pc-specs">([\s\S]*?)<\/div>/)?.[1] ?? "").matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)]
      .map((m) => strip(m[1]))
      .filter((s): s is string => !!s);
    const typeRaw = strip(block.match(/<span title="Type de bien">([\s\S]*?)<\/span>/)?.[1]);
    const surface = specs.map((s) => surfaceFromText(s)).find((n) => n != null) ?? null;
    const beds = specs.map((s) => s.match(/^(\d+)\s*ch\b/)?.[1]).find(Boolean);

    const furnished = /meubl/i.test(`${tag} ${title} ${typeRaw}`) || /nuit|jour/i.test(unit ?? "");
    const transaction = transactionOf(tag, title, unit);
    const perM2 = /m²|m2/i.test(unit ?? "");
    const price = perM2 ? (total ?? (amount && surface ? amount * surface : null)) : amount;

    const location = strip(block.match(/<div class="pc-loc">[\s\S]*?<span>([\s\S]*?)<\/span>/)?.[1]);
    out.set(externalId, {
      externalId,
      url: `${BASE}${href[1]}`,
      title,
      transaction,
      propertyType: logerType(typeRaw, furnished),
      priceXof: price && price >= 1000 ? BigInt(Math.round(price)) : null,
      priceRaw: amount ? `${amount.toLocaleString("fr-FR")} ${unit ?? "FCFA"}${total ? ` (total ${total.toLocaleString("fr-FR")})` : ""}` : null,
      surfaceM2: surface,
      bedrooms: beds ? Number(beds) : bedroomsFromText(title),
      city: location?.includes(",") ? location.split(",").pop()!.trim() : null,
      locationRaw: location,
      sellerName: strip(block.match(/pc-owner-txt">\s*<b>([\s\S]*?)<\/b>/)?.[1]),
      sellerPhone: sellerPhoneOrNull(block.match(/wa\.me\/(\d+)/)?.[1] ?? block.match(/href="tel:([^"]+)"/)?.[1]),
      postedAt: parseLogerDate(block.match(/pc-owner-txt">[\s\S]*?<small title="([^"]+)"/)?.[1]),
    });
  }
  return [...out.values()];
}

type JsonLdListing = {
  "@type"?: string;
  datePosted?: string;
  description?: string;
  geo?: { latitude?: number | string; longitude?: number | string };
  address?: { streetAddress?: string; addressLocality?: string };
  image?: string[] | string;
};

function listingJsonLd(html: string): JsonLdListing | null {
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]) as { "@graph"?: JsonLdListing[] } & JsonLdListing;
      const found = (j["@graph"] ?? [j]).find((x) => x["@type"] === "RealEstateListing");
      if (found) return found;
    } catch {
      /* ignore malformed blocks */
    }
  }
  return null;
}

/** Quick-facts grid: <div class="small text-muted">Label</div> <div class="fw-bold">Value</div>. */
function facts(html: string) {
  const map = new Map<string, string>();
  for (const m of html.matchAll(/<div class="small text-muted">([^<]+)<\/div>\s*<div class="fw-bold">([^<]*)<\/div>/g)) {
    map.set(fold(decodeEntities(m[1])), decodeEntities(m[2]).trim());
  }
  return map;
}

export function parseLogerDetail(html: string): ParsedDetail & { lat: number | null; lng: number | null } {
  const ld = listingJsonLd(html);
  const f = facts(html);
  const descHtml = html.match(/<div class="description-text"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  const description =
    htmlToText(
      descHtml
        ?.replace(/<a [^>]*__cf_email__[\s\S]*?<\/a>/g, "")
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16))),
    ) ??
    ld?.description ??
    null;
  const lat = Number(ld?.geo?.latitude);
  const lng = Number(ld?.geo?.longitude);
  const images = Array.isArray(ld?.image) ? ld!.image.length : ld?.image ? 1 : 0;
  const street = ld?.address?.streetAddress?.trim();
  const locality = ld?.address?.addressLocality?.trim();
  const posted = ld?.datePosted ? new Date(ld.datePosted) : null;

  return {
    description,
    rooms: null,
    bedrooms: toNum(f.get("chambres")) ?? bedroomsFromText(description),
    bathrooms: toNum(f.get("toilettes")) ?? toNum(f.get("salles de bain")),
    surfaceM2: surfaceFromText(f.get("surface")) ?? toNum(f.get("surface")) ?? surfaceFromText(description),
    photoCount: images || null,
    locationRaw: street ? [street, locality && locality.charAt(0) + locality.slice(1).toLowerCase()].filter(Boolean).join(", ") : null,
    sellerPhone: sellerPhoneOrNull(html.match(/href="tel:([^"]+)"/)?.[1] ?? html.match(/wa\.me\/(\d+)/)?.[1]),
    postedAt: posted && !Number.isNaN(posted.getTime()) ? posted : null,
    lat: Number.isFinite(lat) && lat !== 0 ? lat : null,
    lng: Number.isFinite(lng) && lng !== 0 ? lng : null,
  };
}

export const logerSenegal: Connector = {
  slug: "logersenegal",
  pageUrl: (page) => (page <= 1 ? `${BASE}/annonces/` : `${BASE}/annonces/?page=${page}`),
  parseIndex: (html) => parseLogerIndex(html),
  parseDetail: parseLogerDetail,
};
