import { describe, expect, it } from "vitest";
import { parseSenemarketDate, parseSenemarketIndex, senemarket } from "@/lib/connectors/senemarket";

const card = (id: number, title: string, subSlug: string, subName: string, loc: string, price: string, pro = true) => `
<div class="item-list"> <div class="row"> <div class="items-details"> <h5 class="add-title"> <a href="https://www.senemarket.sn/slug-${id}/${id}">${title} </a> </h5>
 <span class="info-row">${pro ? '<span class="add-type business-posts" title="Professionnel" > P </span>' : ""}
 <span class="date"><span data-bs-content="20 nov. 2026 à 11h09">il y a 4 jours</span></span>
 <span class="category"><a href="https://www.senemarket.sn/category/immobilier" class="info-link"> Immobilier </a>&raquo;
 <a href="https://www.senemarket.sn/category/immobilier/${subSlug}" class="info-link"> ${subName} </a></span>
 <span class="item-location"><i class="fas fa-map-marker-alt"></i>&nbsp; <a href="https://www.senemarket.sn/search?l=1&c=37" class="info-link"> ${loc} </a></span></span></div>
 <div class="price-box"><h2 class="item-price"> ${price} </h2></div></div></div>`;

const html =
  card(19797, "Villa à vendre à Ngaparou Sénégal", "land-and-plots-for-sale", "Terrains et parcelles à vendre", "Mbour", "61.840.000 FCFA") +
  card(19810, "Appartement F3 meublé", "apartments-for-rent", "Appartements à louer", "Dakar", "450.000 FCFA", false) +
  card(1, "Terrain 300 m²", "land-and-plots-for-sale", "Terrains", "Saly", "Prix à discuter");

describe("senemarket", () => {
  it("parses cards; title type beats a wrong sub-category", () => {
    const [a, b, c] = parseSenemarketIndex(html);
    expect(a).toMatchObject({ externalId: "19797", transaction: "SALE", propertyType: "villa", priceXof: 61_840_000n, city: "Mbour", sellerName: "Professionnel" });
    expect(a.postedAt?.toISOString()).toBe("2026-11-20T11:09:00.000Z");
    expect(b).toMatchObject({ externalId: "19810", transaction: "RENT", propertyType: "appartement-meuble", priceXof: 450_000n, sellerName: null });
    expect(c).toMatchObject({ propertyType: "terrain", priceXof: null, surfaceM2: 300 });
  });
  it("dates and pages", () => {
    expect(parseSenemarketDate("3 févr. 2025")?.toISOString()).toBe("2025-02-03T00:00:00.000Z");
    expect(parseSenemarketDate("demain")).toBeNull();
    expect(senemarket.pageUrl(2)).toBe("https://www.senemarket.sn/category/immobilier?page=2");
  });
});
