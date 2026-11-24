import { describe, expect, it } from "vitest";
import { coinAge, coinTransaction, parseCoinDetail, parseCoinIndex } from "@/lib/connectors/coinafrique";

// Synthetic markup mirroring the site's structure (not copied content).
const card = (id: string, title: string, cat: string, price: string, age = "") => `
<div class="card ad__card round small hoverable"><a class="card-image" href="/annonce/x/${id}">
<span class="btn-floating card-fav" data-post-id="${id}" data-ad-price="${price}" data-ad-title="${title}" data-ad-category="${cat}"></span>
${age}</a><div class="card-content"><p class="ad__card-location"><i class="material-icons">location_on</i><span>Mermoz-Sacré Coeur, Dakar, Sénégal</span></p>
<a class="pro-contact-card" href="/profil/abc" title="Visiter le profil de Soukey Group"></a></div></div>`;

const NOW = new Date("2026-11-24T12:00:00Z");

describe("parseCoinIndex", () => {
  it("reads card attributes, location, seller, age; dedupes top-ad repeats", () => {
    const html =
      card("11", "Location appartement 3 chambres salon - Liberté", "Appartements", "400000", '<span class="time">6</span><span>heures</span>') +
      card("11", "Location appartement 3 chambres salon - Liberté", "Appartements", "400000") +
      card("12", "Terrain 300m2 à Diamniadio", "Terrains", "1");
    const out = parseCoinIndex(html, NOW);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "11",
      url: "https://sn.coinafrique.com/annonce/x/11",
      transaction: "RENT",
      propertyType: "appartement",
      priceXof: 400000n,
      bedrooms: 3,
      locationRaw: "Mermoz-Sacré Coeur, Dakar",
      city: "Dakar",
      sellerName: "Soukey Group",
    });
    expect(out[0].postedAt?.toISOString()).toBe("2026-11-24T06:00:00.000Z");
    expect(out[1]).toMatchObject({ transaction: "SALE", propertyType: "terrain", priceXof: null, surfaceM2: 300 });
  });
});

describe("parseCoinDetail", () => {
  it("reads characteristics, description, photos and phone", () => {
    const html = `
      <input type="hidden" name="ad" id="report_ad_id" value="99">
      <img src="https://images.coinafrique.com/99_uploaded_image1_1.jpg"><img src="https://images.coinafrique.com/99_uploaded_image2_1.jpg">
      <img src="https://images.coinafrique.com/thumb_99_uploaded_image1_1.jpg">
      <span><img src="https://static.coinafrique.com/static/images/location_11_16.png"><span>Point E, Dakar, Sénégal</span></span>
      <div class="details-characteristics"><ul><li><img><span>Nbre de pièces</span><span class="qt">4</span></li><li><img><span>Nbre de salles de bain</span><span class="qt">3</span></li></ul></div>
      <div class="ad__info__box ad__info__box-descriptions"><p class="title">Détails du produit</p><p>F4 avec 3 chambres, 180 m2.\r\nAscenseur.</p></div>
      <a href="tel:+221780000000">appeler</a>`;
    expect(parseCoinDetail(html)).toEqual({
      description: "F4 avec 3 chambres, 180 m2.\nAscenseur.",
      rooms: 4,
      bedrooms: 3,
      bathrooms: 3,
      surfaceM2: 180,
      photoCount: 2,
      locationRaw: "Point E, Dakar",
      sellerPhone: "221780000000",
    });
  });
});

describe("helpers", () => {
  it("coinTransaction", () => {
    expect(coinTransaction("Vente villa R+1 à Saly", "villa")).toBe("SALE");
    expect(coinTransaction("Appartement meublé Almadies", "appartement-meuble")).toBe("RENT");
    expect(coinTransaction("Terrain Bambilor", "terrain")).toBe("SALE");
  });
  it("coinAge", () => {
    expect(coinAge(2, "jours", NOW)?.toISOString()).toBe("2026-11-22T12:00:00.000Z");
    expect(coinAge(1, "semaine", NOW)?.toISOString()).toBe("2026-11-17T12:00:00.000Z");
    expect(coinAge(3, "??", NOW)).toBeNull();
  });
});
