import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import type { Connector, ParsedListing } from "@/lib/connectors/types";

/**
 * Immo-Sénégal (immo-senegal.com) — aggregator of synced agency feeds (refs "IMP-…", "M13-…"),
 * ~157 ads (Nov 2026). Index /immobilier?page=N, 12 cards: data-contrat (vente|location),
 * type tag, place tag, "250 m²", "4 ch.", price "… Fcfa / mois".
 * Ad pages carry no phone (contact form only) → index only.
 * ToS: none published (probe 2026-11). robots.txt allows.
 */
const BASE = "https://www.immo-senegal.com";

const strip = (s: string) => decodeEntities(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

export function parseImmoSenegalIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const card of html.split('<article class="c-carte c-carte--annonce').slice(1)) {
    const m = card.match(/href="(https:\/\/www\.immo-senegal\.com\/immobilier\/bien\/(\d+)\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!m) continue;
    const contrat = card.match(/data-contrat="([a-z]+)"/)?.[1];
    const tags = [...card.matchAll(/class="c-carte__tag( c-carte__tag--lieu)? badge">([\s\S]*?)<\/span>/g)];
    const typeTag = tags.find((t) => !t[1])?.[2];
    const place = tags.find((t) => t[1])?.[2];
    const title = strip(m[3]) || null;
    const priceRaw = strip(card.match(/c-prix__montant">([\s\S]*?)<\/p>/)?.[1] ?? "").replace(/\s*🇸🇳/u, "") || null;
    const surface = card.match(/bi-aspect-ratio[^>]*><\/i>\s*([\d.,]+)\s*m²/)?.[1];
    const ch = card.match(/bi-door-open[^>]*><\/i>\s*(\d+)\s*ch\./)?.[1];
    const typeText = strip(typeTag ?? "") || title;
    let propertyType = immoType(typeText, title ?? "");
    if (propertyType === "appartement" && /meubl/i.test(`${typeText} ${title}`)) propertyType = "appartement-meuble";
    const city = place ? strip(place) : null;
    out.push({
      externalId: m[2],
      url: m[1],
      title,
      transaction: contrat === "vente" ? "SALE" : contrat === "location" ? "RENT" : "UNKNOWN",
      propertyType,
      priceXof: immoPrice(priceRaw),
      priceRaw,
      surfaceM2: surface ? Number(surface.replace(",", ".")) : null,
      bedrooms: ch ? Number(ch) : null,
      city,
      locationRaw: city,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

export const immoSenegal: Connector = {
  slug: "immo-senegal",
  pageUrl: (page) => (page <= 1 ? `${BASE}/immobilier` : `${BASE}/immobilier?page=${page}`),
  parseIndex: (html) => parseImmoSenegalIndex(html),
};
