import { describe, expect, it } from "vitest";
import { paSenegal, parsePaDate, parsePaIndex } from "@/lib/connectors/pa-senegal";

const card = (href: string, price: string, title: string, loc: string, date: string) => `
  <article class="sn-card">
    <a class="sn-card__link" href="${href}" aria-label="${title}"></a>
    <div class="sn-card__ph"><img src="/photos/abc.jpg" alt=""></div>
    <div class="sn-card__body">
      <div class="sn-card__price">${price}</div>
      <div class="sn-card__title">${title}</div>
      <div class="sn-card__meta"><span class="loc">📍 ${loc}</span><span class="cat">${date}</span></div>
    </div>
  </article>`;

const html = `<main>${card("/annonce/senegal/abc123/terrain-agricole.html", "41 000 000 FCFA", "Terrain agricole de 8478 m² vers Ndiaganiao", "Ndiaganiao", "11/12/2024")}
${card("/annonce/dakar/xyz789/appartement-louer.html", "350 000 FCFA /mois", "Appartement F3 meublé à louer", "Mermoz", "02/11/2026")}</main>`;

describe("pa-senegal", () => {
  it("parses cards", () => {
    const [a, b] = parsePaIndex(html);
    expect(a).toMatchObject({
      externalId: "abc123",
      url: "https://www.pa-senegal.com/annonce/senegal/abc123/terrain-agricole.html",
      transaction: "UNKNOWN",
      propertyType: "terrain",
      priceXof: 41_000_000n,
      surfaceM2: 8478,
      city: null,
      locationRaw: "Ndiaganiao",
    });
    expect(a.postedAt?.toISOString()).toBe("2024-12-11T00:00:00.000Z");
    expect(b).toMatchObject({ externalId: "xyz789", transaction: "RENT", propertyType: "appartement-meuble", city: "Dakar", priceXof: 350_000n });
    expect(b.sellerPhone).toBeUndefined();
  });
  it("dates and pages", () => {
    expect(parsePaDate("bad")).toBeNull();
    expect(paSenegal.pageUrl(1)).toBe("https://www.pa-senegal.com/immobilier/");
    expect(paSenegal.pageUrl(3)).toBe("https://www.pa-senegal.com/immobilier/?page=3");
    expect(paSenegal.minDelayMs).toBeGreaterThanOrEqual(10_000);
  });
});
