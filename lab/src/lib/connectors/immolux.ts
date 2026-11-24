import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import type { Connector, ParsedListing } from "@/lib/connectors/types";

/**
 * Immolux (immolux.sn) — Next.js portal, ~173 ads, mostly Petite Côte agencies (Nov 2026).
 * Index /annonces?page=N, 24 cards rendered in HTML: badge (À vendre / À louer), type,
 * title, "220 000 000 FCFA" (+ " / mois"), "3 ch.", "4 sdb.", "190 m² hab.", city, land doc.
 * Ad pages only show the platform's own phone (+221 77 542 24 20) → index only.
 * ToS (/conditions, Nov 2026): no clause on automated access. robots.txt allows.
 */
const BASE = "https://immolux.sn";

const strip = (s: string) =>
  decodeEntities(s.replace(/<!-- -->/g, "").replace(/<[^>]*>/g, " "))
    .replace(/[  ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function parseImmoluxIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  const seen = new Set<string>();
  for (const raw of html.split('<a class="group flex flex-col').slice(1)) {
    const card = raw.replace(/<svg[\s\S]*?<\/svg>/g, "");
    const slug = card.match(/^[^>]*href="\/annonces\/([a-z0-9-]+)"/)?.[1];
    // Slug ends with a 6-hex id ("…-deuxia-73b9d2").
    const id = slug?.match(/-([0-9a-f]{6})$/)?.[1];
    if (!slug || !id || seen.has(id)) continue;
    seen.add(id);
    const badge = strip(card.match(/<span class="rounded-full[^"]*">([\s\S]*?)<\/span>/)?.[1] ?? "");
    const typeLabel = strip(card.match(/<p class="mb-1 [^"]*uppercase[^"]*">([\s\S]*?)<\/p>/)?.[1] ?? "") || null;
    const title = strip(card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? "") || null;
    const priceBlock = card.match(/<span class="font-display text-xl[^"]*">([\s\S]*?)<\/span>(?:<span class="text-xs font-medium[^"]*">\s*\/\s*([a-z]+)\s*<\/span>)?/);
    const priceText = strip(priceBlock?.[1] ?? "");
    const unit = priceBlock?.[2] ?? card.match(/>\s*\/\s*(mois|jour|nuit|semaine|an)\s*</)?.[1];
    const priceRaw = priceText ? (unit && !priceText.includes("/") ? `${priceText} / ${unit}` : priceText) : null;
    const nums = [...card.matchAll(/<span class="tabular-nums">([\s\S]*?)<\/span>/g)].map((m) => strip(m[1]));
    const ch = nums.find((t) => /ch\.$/.test(t))?.match(/(\d+)/)?.[1];
    const m2 = nums.find((t) => /m² hab\.$/.test(t))?.match(/(\d[\d .,]*)/)?.[1]?.replace(/ /g, "").trim();
    const city = strip(card.match(/<span class="truncate">([\s\S]*?)<\/span>/)?.[1] ?? "") || null;
    let propertyType = immoType(typeLabel ?? title, title ?? "");
    if (propertyType === "appartement" && /meubl|saisonn/i.test(title ?? "")) propertyType = "appartement-meuble";
    const b = badge.toLowerCase();
    out.push({
      externalId: id,
      url: `${BASE}/annonces/${slug}`,
      title,
      transaction: /vendre|vente/.test(b) ? "SALE" : /louer|location/.test(b) ? "RENT" : "UNKNOWN",
      propertyType,
      priceXof: immoPrice(priceText),
      priceRaw,
      surfaceM2: m2 ? Number(m2.replace(",", ".")) || null : null,
      bedrooms: ch ? Number(ch) : null,
      city,
      locationRaw: city,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

export const immolux: Connector = {
  slug: "immolux-sn",
  pageUrl: (page) => (page <= 1 ? `${BASE}/annonces` : `${BASE}/annonces?page=${page}`),
  parseIndex: (html) => parseImmoluxIndex(html),
};
