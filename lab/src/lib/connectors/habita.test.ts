import { describe, expect, it } from "vitest";
import {
  habita,
  habitaDetailTransaction,
  habitaPropertyType,
  habitaTransaction,
  parseHabitaDetail,
  parseHabitaIndex,
  toXof,
} from "@/lib/connectors/habita";

// Synthetic JSON mirroring the results endpoint (not real ads).
const item = (o: Record<string, unknown>) => ({
  id: 1,
  area: "120 m²",
  area3: "Ngor",
  district: null,
  country: "Senegal",
  latitude: 14.75,
  longitude: -17.51,
  price: 100000000,
  convertedPrice: 152449.02,
  convertedCurrency: "€",
  currency: "CFA",
  type: "Villa",
  title: "Test villa 4 chambres",
  images: [],
  ...o,
});
const page = (...results: object[]) => JSON.stringify({ results, numResults: results.length, totalPages: 1 });
const SALE_URL = "https://www.habita.com/propertysearch/results/en/1/200/full?type=ResidenceSale&countries=34&sort=newest";
const RENT_URL = "https://www.habita.com/propertysearch/results/en/1/200/full?type=ResidenceRent&countries=34&sort=newest";

describe("parseHabitaIndex", () => {
  it("maps fields, coordinates and dedupes repeats", () => {
    const out = parseHabitaIndex(page(item({ id: 10 }), item({ id: 10 }), item({ id: 11, type: "Semi-detached house" })), undefined, SALE_URL);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "10",
      url: "https://www.habita.com/property/10",
      title: "Test villa 4 chambres",
      transaction: "SALE",
      propertyType: "villa",
      priceXof: 100000000n,
      surfaceM2: 120,
      bedrooms: 4,
      locationRaw: "Ngor",
      lat: 14.75,
      lng: -17.51,
    });
    expect(out[1].propertyType).toBe("maison");
  });

  it("takes sale vs rent from the request URL, falls back to the title", () => {
    expect(parseHabitaIndex(page(item({})), undefined, RENT_URL)[0].transaction).toBe("RENT");
    expect(parseHabitaIndex(page(item({ title: "Apartment for rent in Mermoz" })))[0].transaction).toBe("RENT");
    expect(parseHabitaIndex(page(item({ title: "Nice villa" })))[0].transaction).toBe("UNKNOWN");
  });

  it("converts currencies and drops placeholders", () => {
    const [eur] = parseHabitaIndex(page(item({ price: 100000, currency: "€" })), undefined, SALE_URL);
    expect(eur.priceXof).toBe(65595700n);
    const [usd] = parseHabitaIndex(page(item({ price: 1000, currency: "USD" })), undefined, SALE_URL);
    expect(usd.priceXof).toBe(600000n);
    const [zero] = parseHabitaIndex(page(item({ price: 1, convertedPrice: null })), undefined, SALE_URL);
    expect(zero.priceXof).toBeNull();
  });

  it("ignores other countries and bad JSON", () => {
    expect(parseHabitaIndex(page(item({ country: "Finland" })))).toEqual([]);
    expect(parseHabitaIndex("<html>error</html>")).toEqual([]);
  });
});

describe("parseHabitaDetail", () => {
  const html = `
    <div id="descriptions" > <h1>Villa, Mamelles</h1> <h4>12 300 Ouakam</h4>
      <div id="promotion-text"><p>Belle villa test.</p><p>Piscine.</p></div></div>
    <img src="https://x.cloudfront.net/promotion_image/55/aaa111.jpeg"><img src="https://x.cloudfront.net/promotion_image/55/bbb222.jpeg">
    <img src="https://x.cloudfront.net/propertyList/55/aaa111.jpeg">
    <div class="representative brief"><div class="information"><h3> <a href="#"> AGENCE TEST </a> </h3>
      <div class="title">Agent</div><div class="contact"><a href="tel:+221 77 000 00 00">+221 77 000 00 00</a></div></div></div>
    <table class="details"><tr> <th>Listing number</th> <td>55</td> </tr><tr> <th>Selling price</th> <td> F CFA 1 </td> </tr>
      <tr> <th>Rooms</th> <td>5</td> </tr><tr> <th>Bedrooms</th> <td>4</td> </tr><tr> <th>Bathrooms</th> <td>3</td> </tr>
      <tr> <th>Living area</th> <td>210 m²</td> </tr></table>`;

  it("reads table, description, location, photos and agent", () => {
    expect(parseHabitaDetail(html)).toEqual({
      description: "Belle villa test.\nPiscine.",
      rooms: 5,
      bedrooms: 4,
      bathrooms: 3,
      surfaceM2: 210,
      photoCount: 2,
      locationRaw: "Mamelles, Ouakam",
      sellerPhone: "221770000000",
      sellerName: "AGENCE TEST",
    });
    expect(habitaDetailTransaction(html)).toBe("SALE");
  });
});

describe("helpers", () => {
  it("property types", () => {
    expect(habitaPropertyType("Apartment")).toBe("appartement");
    expect(habitaPropertyType("Plot")).toBe("terrain");
    expect(habitaPropertyType("Office")).toBe("bureau");
    expect(habitaPropertyType("Commercial premises")).toBe("commercial");
  });
  it("transaction + currency helpers", () => {
    expect(habitaTransaction(undefined, "Terrain à vendre")).toBe("SALE");
    expect(toXof(500, "CFA")).toBeNull();
    expect(toXof(10, "GBP")).toBeNull();
  });
  it("pageUrl walks the search types, then ends", () => {
    expect(habita.pageUrl(1)).toContain("/en/1/100/full?type=ResidenceSale&countries=34");
    expect(habita.pageUrl(2)).toContain("/en/2/100/full?type=ResidenceSale");
    expect(habita.pageUrl(4)).toContain("/en/1/100/full?type=ResidenceRent");
    expect(habita.pageUrl(18)).toContain("/en/3/100/full?type=LotRent");
    expect(habita.pageUrl(19)).toContain("/99/");
  });
});
