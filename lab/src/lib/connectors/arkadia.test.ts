import { describe, expect, it } from "vitest";
import { arkadia, arkadiaTransaction, arkadiaType, parseArkadiaDetail, parseArkadiaIndex } from "@/lib/connectors/arkadia";

// Synthetic markup mirroring the site's microdata structure (not copied content).
const card = (o: { handle: string; id: string; type: string; price: string; cur?: string; features: string; locality: string; desc: string }) => `
<article id="9${o.id}" class="property" itemscope="itemscope" itemtype="http://schema.org/SingleFamilyResidence">
 <meta itemprop="additionalType" content="http://www.productontology.org/id/${o.type}" />
 <div class="img gallery"><a class="slideBox" href="https://en.arkadia.com/${o.handle}-t${o.id}/"></a>
 <a class="price" href="https://en.arkadia.com/${o.handle}-t${o.id}/"><span itemprop="price" content="${o.price}"> <span class='currency'>${o.cur ?? "XOF"}</span> x </span></a></div>
 <div class="description"><a itemprop="url" href="https://en.arkadia.com/${o.handle}-t${o.id}/"><div class="title"><span itemprop="description">${o.desc}</span></div></a>
 <div class="features overflowtip">${o.features}</div> </a>
 <div itemprop="address"><meta itemprop="addressCountry" content="SN" /><meta itemprop="addressLocality" content="${o.locality}" /></div></div>
</article>`;
const D = '<div class="divider"></div>';

describe("parseArkadiaIndex", () => {
  it("reads microdata, features and transaction from the page URL; dedupes", () => {
    const html =
      card({ handle: "agx", id: "101", type: "Apartment", price: "85000000.40", features: `${D}<b>2</b> bd ${D}<b>100</b> m² ${D}floor <b>5</b> ${D}Dakar `, locality: "Ouakam", desc: "Bel appartement lumineux. Proche plage." }) +
      card({ handle: "agx", id: "101", type: "Apartment", price: "85000000.40", features: "", locality: "Ouakam", desc: "dup" }) +
      card({ handle: "sel", id: "102", type: "Land_lot", price: "100000", cur: "EUR", features: `${D}lot <b>1,500</b> m² ${D}Senegal `, locality: "NGAPAROU", desc: "Please contact the sales representative." });
    const out = parseArkadiaIndex(html, new Date(), "https://en.arkadia.com/for-sale/senegal-g686/page2/");
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "101",
      url: "https://en.arkadia.com/agx-t101/",
      title: "Bel appartement lumineux.",
      transaction: "SALE",
      propertyType: "appartement",
      priceXof: 85000000n,
      surfaceM2: 100,
      bedrooms: 2,
      city: "Dakar",
      locationRaw: "Ouakam, Dakar",
      sellerName: "agx",
      sellerPhone: null,
    });
    expect(out[1]).toMatchObject({
      propertyType: "terrain",
      priceXof: 65595700n, // EUR → XOF
      surfaceM2: 1500, // land: lot size
      city: null, // "Senegal" placeholder dropped
      locationRaw: "NGAPAROU",
      title: "Land lot — NGAPAROU",
    });
  });

  it("marks rentals from the for-rent URL", () => {
    const html = card({ handle: "a", id: "7", type: "House", price: "800000", features: `${D}<b>3</b> bd `, locality: "SALY", desc: "Villa." });
    expect(parseArkadiaIndex(html, new Date(), "https://en.arkadia.com/for-rent/senegal-g686/")[0].transaction).toBe("RENT");
  });
});

describe("parseArkadiaDetail", () => {
  it("reads properties, rooms, size, description, member handle and photos", () => {
    const html = `
      <span itemprop="addressLocality">Ouakam</span>
      <div itemprop="additionalProperty"><span itemprop="name">Listing type:</span> <span itemprop="value">For rent</span></div>
      <div itemprop="additionalProperty"><span itemprop="name">Property type:</span> <span itemprop="value">Apartment &amp; Condo</span></div>
      <div itemprop="floorSize"><span>Property size:</span> <span itemprop="value" content="120"> 120 m²</span></div>
      <div><span>Rooms:</span> <span itemprop="numberOfRooms">4</span></div>
      <div itemprop="additionalProperty"><span itemprop="name">Bedrooms:</span> <span itemprop="value">3</span></div>
      <div itemprop="additionalProperty"><span itemprop="name">Bathrooms:</span> <span itemprop="value">2</span></div>
      <span itemprop="description" id="desc_expand" class="comment"> Grand F4.<br />Vue mer. </span>
      <img src="https://datafile5.arkadia.com/pictures/properties/w1024h1024/1-a.jpg"><img src="https://datafile5.arkadia.com/pictures/properties/fullsize/1-a.jpg">
      <img src="https://datafile5.arkadia.com/pictures/properties/w1024h1024/2-b.jpg">
      <a href="https://en.arkadia.com/members/agx/listings/" class="agency_country">Real estate professional</a>`;
    expect(parseArkadiaDetail(html)).toEqual({
      description: "Grand F4.\nVue mer.",
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      surfaceM2: 120,
      photoCount: 2,
      locationRaw: "Ouakam",
      sellerPhone: null,
      postedAt: null,
      sellerName: "agx",
      transaction: "RENT",
      propertyType: "appartement",
    });
  });
});

describe("helpers", () => {
  it("maps types and transactions", () => {
    expect(arkadiaType("Land lot")).toBe("terrain");
    expect(arkadiaType("House")).toBe("maison");
    expect(arkadiaType("Office")).toBe("bureau");
    expect(arkadiaTransaction("For sale")).toBe("SALE");
    expect(arkadiaTransaction("https://en.arkadia.com/for-rent/senegal-g686/")).toBe("RENT");
  });
  it("interleaves sale and rent pages", () => {
    expect([1, 2, 3, 4].map((p) => arkadia.pageUrl(p))).toEqual([
      "https://en.arkadia.com/for-sale/senegal-g686/",
      "https://en.arkadia.com/for-rent/senegal-g686/",
      "https://en.arkadia.com/for-sale/senegal-g686/page2/",
      "https://en.arkadia.com/for-rent/senegal-g686/page2/",
    ]);
  });
});
