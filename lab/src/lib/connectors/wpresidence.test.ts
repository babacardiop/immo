import { describe, expect, it } from "vitest";
import { parseWpResidenceDetail, parseWpResidenceIndex, twoSimmo, wpTransaction } from "@/lib/connectors/wpresidence";

const api = JSON.stringify([
  {
    id: 40525,
    date: "2026-11-20T17:29:25",
    link: "https://www.2simmobilier.com/biens/appartement-f3-cite-apix/",
    title: { rendered: "Appartement F3 &#224; louer &#224; la cit&#233; Apix" },
    _embedded: {
      "wp:term": [
        [{ taxonomy: "property_category", name: "Appartements meublés" }],
        [{ taxonomy: "property_action_category", name: "Locations" }],
        [{ taxonomy: "property_city", name: "DAKAR" }, { taxonomy: "property_area", name: "APIX TIVAOUNE PEULH" }],
      ],
    },
  },
  { id: 7, link: "https://snimmo.sn/properties/villa/", title: { rendered: "Villa R+2 à vendre" } },
]);

const ad = `<div class="price_area"> <div class="second_price_area"><span class="price_label"></span></div> 105 000CFA <span class="price_label">/Mois</span></div> <div class="property_categs">x</div>
<strong>Prix:</strong> 105 000CFA <strong>Pièces:</strong> 2 <strong>Chambres:</strong> 1 <strong>SDB:</strong> 2
<div class="wpestate_property_description property-panel"><h4>Description</h4><p>Studio  neuf</p></div>
<a href="https://wa.me/221778145360?text=x">WhatsApp</a>`;

describe("wpresidence", () => {
  it("parses the REST index with taxonomy terms", () => {
    const [a, b] = parseWpResidenceIndex(api);
    expect(a).toMatchObject({
      externalId: "40525", transaction: "RENT", propertyType: "appartement-meuble", city: "Dakar", locationRaw: "Apix Tivaoune Peulh, Dakar",
      title: "Appartement F3 à louer à la cité Apix", priceXof: null,
    });
    expect(a.postedAt?.toISOString()).toBe("2026-11-20T17:29:25.000Z");
    expect(b).toMatchObject({ externalId: "7", transaction: "SALE", propertyType: "villa", city: null });
    expect(parseWpResidenceIndex('{"code":"rest_post_invalid_page_number"}')).toEqual([]);
  });
  it("parses the ad page: price, rooms, agency phone", () => {
    expect(parseWpResidenceDetail(ad)).toMatchObject({
      priceXof: 105_000n, priceRaw: "105 000CFA /Mois", rooms: 2, bedrooms: 1, bathrooms: 2, sellerPhone: "221778145360", description: "Studio neuf",
    });
  });
  it("transaction + pages", () => {
    expect(wpTransaction("Ventes", null, null)).toBe("SALE");
    expect(twoSimmo.pageUrl(3)).toBe("https://www.2simmobilier.com/wp-json/wp/v2/estate_property?per_page=50&page=3&_embed=wp:term");
  });
});
