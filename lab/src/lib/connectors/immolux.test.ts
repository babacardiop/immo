import { describe, expect, it } from "vitest";
import { immolux, parseImmoluxIndex } from "@/lib/connectors/immolux";

const card = (slug: string, badge: string, type: string, title: string, price: string, feats: string[], city: string) =>
  `<a class="group flex flex-col overflow-hidden" href="/annonces/${slug}"><div><span class="rounded-full px-2.5 bg-[#F97316]/90">${badge}</span></div>
<div><p class="mb-1 text-[11px] font-semibold uppercase tracking-wider">${type}</p><h3 class="line-clamp-2">${title}</h3>
<div><span class="font-display text-xl font-bold tabular-nums">${price}</span><span class="text-xs font-medium text-slate-400 tabular-nums">~<!-- -->335 388 €</span></div>
<div>${feats.map((f) => `<div><svg><path d="M2"></path></svg><span class="tabular-nums">${f}</span></div>`).join("")}</div>
<div><span class="inline-flex"><svg></svg><span class="truncate">${city}</span></span></div></div></a>`;

const html =
  card("villa-neuve-a-vendre-a-nguering-deuxia-73b9d2", "À vendre", "Villa", "Villa neuve 3 chambres", "220 000 000 FCFA", ["3<!-- --> ch.", "1 000<!-- --> <!-- -->m² hab."], "Mbour") +
  card("appartement-a-louer-a-saly-deuxia-d01e5c", "À louer", "Appartement", "Appartement en location saisonnière", "1 250 000 FCFA<!-- --> / mois", ["2<!-- --> ch."], "Saly") +
  card("appartement-a-louer-a-saly-deuxia-d01e5c", "À louer", "Appartement", "duplicate card", "1 FCFA", [], "Saly");

describe("immolux", () => {
  it("parses cards, dedups ids", () => {
    const r = parseImmoluxIndex(html);
    expect(r).toHaveLength(2);
    expect(r[0]).toMatchObject({ externalId: "73b9d2", transaction: "SALE", propertyType: "villa", priceXof: 220_000_000n, surfaceM2: 1000, bedrooms: 3, city: "Mbour" });
    expect(r[1]).toMatchObject({ externalId: "d01e5c", transaction: "RENT", propertyType: "appartement-meuble", priceXof: 1_250_000n, priceRaw: "1 250 000 FCFA / mois", surfaceM2: null });
  });
  it("pages", () => {
    expect(immolux.pageUrl(1)).toBe("https://immolux.sn/annonces");
    expect(immolux.pageUrl(3)).toBe("https://immolux.sn/annonces?page=3");
  });
});
