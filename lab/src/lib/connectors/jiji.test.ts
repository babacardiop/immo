import { describe, expect, it } from "vitest";
import { jiji, jijiAge, jijiLocation, jijiPrice, jijiType, parseJijiDetail, parseJijiIndex } from "@/lib/connectors/jiji";

// Synthetic markup mirroring the site's structure (not copied content).
const card = (o: { loc: string; cat: string; id: string; title: string; price: string; period?: string; chips?: string[]; region?: string; desc?: string }) => `
<div class="masonry-item"><div class="b-adverts-gallery-listing__item js-advert-list-item">
<a href="/${o.loc}/${o.cat}/annonce-test-${o.id}.html?indexPosition=0" class="b-list-advert-base b-list-advert-base--gallery qa-advert-list-item">
<div class="b-list-advert__price-base"><div class="qa-advert-price">${o.price}</div>${o.period ? `<div class="b-list-advert__price__period">${o.period}</div>` : ""}</div>
<div class="b-advert-title-inner qa-advert-title b-advert-title-inner--div">${o.title}</div>
<div class="b-list-advert-base__description-text">${o.desc ?? "Texte"}</div>
<div class="b-list-advert-base__attrs"><div class="b-list-advert-base__item-attr__wrapper">${(o.chips ?? []).map((c) => `<div class="b-list-advert-base__item-attr">${c}</div>`).join("")}</div></div>
<span class="b-list-advert__region__text">${o.region ?? "Région de Dakar, Almadies"}</span>
</a></div></div>`;

describe("parseJijiIndex", () => {
  it("reads category from the URL path, price, chips and region; dedupes", () => {
    const html =
      card({ loc: "almadies", cat: "houses-apartments-for-rent", id: "AbCdEfGhIjKlMnOpQrStUvWx", title: "3chbre Appartement dans , Almadies à Louer", price: "CFA 650,000", period: "per month", chips: ['120 <span class="h-ml-5">sqm</span>', "3 chambres "] }) +
      card({ loc: "almadies", cat: "houses-apartments-for-rent", id: "AbCdEfGhIjKlMnOpQrStUvWx", title: "dup", price: "CFA 1" }) +
      card({ loc: "bambylor", cat: "land-and-plots-for-sale", id: "ZyXwVuTsRqPoNmLkJiHgFeDc", title: "Terrain à Bambilor", price: "CFA 15,000,000", period: "per Sqm", desc: "Terrain 161 m2 titre foncier", region: "Région de Dakar, Bambylor" }) +
      card({ loc: "dakar", cat: "mobile-phones", id: "QqQqQqQqQqQqQqQqQqQqQqQq", title: "iPhone", price: "CFA 200,000" });
    const out = parseJijiIndex(html);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "AbCdEfGhIjKlMnOpQrStUvWx",
      url: "https://jiji.sn/almadies/houses-apartments-for-rent/annonce-test-AbCdEfGhIjKlMnOpQrStUvWx.html",
      transaction: "RENT",
      propertyType: "appartement",
      priceXof: 650000n,
      priceRaw: "CFA 650,000 per month",
      surfaceM2: 120,
      bedrooms: 3,
      locationRaw: "Almadies, Dakar",
      city: "Dakar",
      sellerPhone: null,
    });
    expect(out[1]).toMatchObject({ transaction: "SALE", propertyType: "terrain", priceXof: 15000000n, surfaceM2: 161, locationRaw: "Bambylor, Dakar" });
  });

  it("flags short lets as furnished", () => {
    const [l] = parseJijiIndex(
      card({ loc: "ngor", cat: "temporary-and-vacation-rentals", id: "MmMmMmMmMmMmMmMmMmMmMmMm", title: "Studio vue mer", price: "CFA 35,000", period: "per day" }),
    );
    expect(l).toMatchObject({ transaction: "RENT", propertyType: "appartement-meuble", priceXof: 35000n });
  });
});

describe("parseJijiDetail", () => {
  it("reads attributes, description, photos, seller, age; never a phone", () => {
    const html = `
      <div class="b-carousel-counter"><div class="qa-carousel-counter">1/7</div></div>
      <div class="b-advert-info-statistics b-advert-info-statistics--region"> Région de Dakar, Mermoz, il y a 3 jours</div>
      <div class="b-advert-attribute"><div class="b-advert-attribute__value">180<span class="h-ml-5">sqm</span></div><div class="b-advert-attribute__key">Superficie</div></div>
      <div class="b-advert-attribute"><div class="b-advert-attribute__value">Appartement</div><div class="b-advert-attribute__key">Type de bien</div></div>
      <div class="b-advert-attribute"><div class="b-advert-attribute__value">Meublé</div><div class="b-advert-attribute__key">Ameublement</div></div>
      <div class="b-advert-attribute"><div class="b-advert-attribute__value">3</div><div class="b-advert-attribute__key">Chambres</div></div>
      <div class="b-advert-attribute"><div class="b-advert-attribute__value">2</div><div class="b-advert-attribute__key">Salles de bain</div></div>
      <div class="qa-advert-description"><span class="qa-description-text">Bel appartement.<br>Ascenseur.</span></div>
      <a class="qa-show-contact">Montrer contact</a>
      <div class="b-seller-block__name">Vendeur Test</div>`;
    expect(parseJijiDetail(html, new Date("2026-11-24T12:00:00Z"))).toEqual({
      description: "Bel appartement.\nAscenseur.",
      rooms: null,
      bedrooms: 3,
      bathrooms: 2,
      surfaceM2: 180,
      photoCount: 7,
      locationRaw: "Mermoz, Dakar",
      sellerPhone: null,
      postedAt: new Date("2026-11-21T12:00:00.000Z"),
      sellerName: "Vendeur Test",
      propertyType: "appartement-meuble",
    });
  });
});

describe("helpers", () => {
  it("jijiPrice handles per-sqm ambiguity, yearly rents and placeholders", () => {
    expect(jijiPrice(15_000_000, "per Sqm", 161)).toBe(15000000n);
    expect(jijiPrice(50_000, "per Sqm", 200)).toBe(10000000n);
    expect(jijiPrice(50_000, "per Sqm", null)).toBeNull();
    expect(jijiPrice(12_000_000, "per year", null)).toBe(1000000n);
    expect(jijiPrice(1, "per month", null)).toBeNull();
  });
  it("jijiType, jijiLocation, jijiAge", () => {
    expect(jijiType("6chbre Villa dans , Almadies à Louer")).toBe("villa");
    expect(jijiType("4chbre Maison de ville terrasse")).toBe("maison");
    expect(jijiLocation("Région de Thiès, Saly")).toEqual({ locationRaw: "Saly, Thiès", city: "Thiès" });
    expect(jijiAge("Région de Dakar, Yoff, il y a 2 semaines", new Date("2026-11-24T00:00:00Z"))?.toISOString()).toBe("2026-11-10T00:00:00.000Z");
    expect(jijiAge("pas de date")).toBeNull();
  });
  it("paginates with ?page=N", () => {
    expect(jiji.pageUrl(1)).toBe("https://jiji.sn/real-estate");
    expect(jiji.pageUrl(3)).toBe("https://jiji.sn/real-estate?page=3");
  });
});
