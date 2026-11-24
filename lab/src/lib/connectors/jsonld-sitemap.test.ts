import { describe, expect, it } from "vitest";
import { guessTransaction, oroSira, parseJsonLdDetail, parseSitemapAds } from "@/lib/connectors/jsonld-sitemap";

const ld = (o: object) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const page =
  ld({ "@graph": [{ "@type": "Organization", name: "X" }] }) +
  ld({
    "@type": "RealEstateListing",
    name: "Terrain de 7,7 hectares - Thiès",
    description: "Belle parcelle",
    datePosted: "2026-11-18",
    address: { addressLocality: "Thiès", addressRegion: "Fandène" },
    geo: { latitude: 14.8, longitude: -16.86 },
    floorSize: { value: 77132 },
    image: ["a", "b"],
    offers: { price: "1735470000", priceCurrency: "XOF" },
    seller: { name: "Tterres", telephone: "+221785553030" },
  });

describe("jsonld-sitemap", () => {
  it("lists ads from the sitemap, dedup + path filter", () => {
    const xml = `<loc>https://immo.orosira.com/fr/property/f6d78933-cd48-4d07-9880-8adfe9e7e1e0</loc><loc>https://immo.orosira.com/fr/blog/x</loc>
<loc>https://immo.orosira.com/fr/property/f6d78933-cd48-4d07-9880-8adfe9e7e1e0</loc>`;
    const r = oroSira.parseIndex(xml);
    expect(r).toHaveLength(1);
    expect(r[0].externalId).toBe("f6d78933-cd48-4d07-9880-8adfe9e7e1e0");
    expect(parseSitemapAds("<loc>https://a.sn/bien/villa-a-louer-ngor/</loc>", /\/bien\/([a-z0-9-]+)\/?$/)[0]).toMatchObject({ transaction: "RENT", propertyType: "villa" });
  });
  it("reads the RealEstateListing JSON-LD (land defaults to sale)", () => {
    expect(parseJsonLdDetail(page)).toMatchObject({
      title: "Terrain de 7,7 hectares - Thiès",
      transaction: "SALE",
      propertyType: "terrain",
      priceXof: 1_735_470_000n,
      city: "Thiès",
      locationRaw: "Fandène, Thiès",
      lat: 14.8,
      lng: -16.86,
      surfaceM2: 77132,
      photoCount: 2,
      sellerPhone: "221785553030",
      sellerName: "Tterres",
      postedAt: new Date("2026-11-18T00:00:00Z"),
    });
  });
  it("guesses transaction", () => {
    expect(guessTransaction("Appartement F3 à louer")).toBe("RENT");
    expect(guessTransaction("Villa")).toBe("UNKNOWN");
  });
});
