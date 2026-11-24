import { describe, expect, it } from "vitest";
import { immooz, parseImmoozDetail, parseImmoozIndex, parseImmoozUrl } from "@/lib/connectors/immooz";

const card = (url: string, amount: string, t: string) => `
  <a href="${url}" class="group block rounded-lg" wire:key="annonce-x"><div class="py-4 px-1">
    <span class="text-xs font-bold text-neutral-900">${amount}</span>
    <span class="text-xs text-neutral-500">XOF</span><!--[if ENDBLOCK]><![endif]-->
    <h3 class="text-sm font-semibold">${t}</h3><p class="mt-1.5">Dakar, Sénégal</p></div></a>`;

const index =
  card("https://immooz.com/sn/louer/appartement-meuble-a-louer/dakar/mamelles/appartement-f4-meuble-a-louer-aux-mamelles-1473/", "700 000", "APPARTEMENT F4 MEUBLE") +
  card("https://immooz.com/sn/acheter/terrain-a-vendre/autres-villes-sn/verger-de-2-hectares-1453/", "16 399 998", "Verger de 2 hectares") +
  card("https://immooz.com/sn/louer/appartement-meuble-a-louer/dakar/mamelles/appartement-f4-meuble-a-louer-aux-mamelles-1473/", "1", "dup");

const detail = `<script type="application/ld+json">{"@type":"BreadcrumbList"}</script>
<script type="application/ld+json">{"@type":"RealEstateListing","description":"Bel F4","datePosted":"2026-07-09",
 "image":["a.jpg","b.jpg"],"address":{"streetAddress":"Mamelles","addressLocality":"Dakar"},"floorSize":{"value":150},"numberOfRooms":2}</script>
<a href="tel:+221 705946161">Appeler</a><a href="https://wa.me/18195762816?text=Bonjour">support</a>`;

describe("immooz", () => {
  it("reads transaction/type/place from the URL", () => {
    expect(parseImmoozUrl("https://immooz.com/sn/acheter/villa-a-vendre/dakar/autres-quartiers-dakar/villa-lac-rose-1469/")).toEqual({
      transaction: "SALE", typeSlug: "villa-a-vendre", region: "dakar", quartier: "autres-quartiers-dakar", id: "1469",
    });
  });
  it("parses cards, dedups", () => {
    const r = parseImmoozIndex(index);
    expect(r).toHaveLength(2);
    expect(r[0]).toMatchObject({ externalId: "1473", transaction: "RENT", propertyType: "appartement-meuble", priceXof: 700_000n, city: "Dakar", locationRaw: "Mamelles, Dakar" });
    expect(r[1]).toMatchObject({ externalId: "1453", transaction: "SALE", propertyType: "terrain", priceXof: 16_399_998n, city: null, locationRaw: null });
  });
  it("parses ad page JSON-LD + seller phone", () => {
    expect(parseImmoozDetail(detail)).toEqual({
      description: "Bel F4", rooms: 2, bedrooms: null, bathrooms: null, surfaceM2: 150, photoCount: 2,
      locationRaw: "Mamelles, Dakar", sellerPhone: "221705946161", postedAt: new Date("2026-07-09T00:00:00Z"),
    });
  });
  it("walks sale pages then rent pages", () => {
    expect(immooz.pageUrl(1)).toBe("https://immooz.com/sn/acheter/");
    expect(immooz.pageUrl(2)).toBe("https://immooz.com/sn/acheter/?page=2");
    expect(immooz.pageUrl(21)).toBe("https://immooz.com/sn/louer/");
    expect(immooz.pageUrl(41)).toContain("page=999");
  });
});
