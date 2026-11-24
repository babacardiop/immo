import { describe, expect, it } from "vitest";
import { categoryToKind, parseExpatDate, parseExpatIndex } from "@/lib/connectors/expat-dakar";

// Synthetic card mirroring the site's markup (not copied content).
const card = (o: { id: string; cat: string; price: string; cur?: string; chips?: string[]; date?: string }) => `
<article class="tw-sr-card tw-sr-card--default"><a href="https://www.expat-dakar.com/annonce/test-${o.id}" class="tw-sr-card__media"
 data-t-listing_id="${o.id}" data-t-listing_title="Villa test &amp; jardin" data-t-listing_category_slug="${o.cat}"
 data-t-listing_slug="test" data-t-listing_price="${o.price}" data-t-listing_currency="${o.cur ?? "XOF"}" data-t-listing_location_title="Ngor"></a>
<div class="tw-sr-card__body"><p class="tw-sr-card__location"><span>Ngor, Dakar</span></p>
<p class="tw-sr-card__date tw-sr-card__date--list">${o.date ?? "Hier, 23:00"}</p>
<ul class="tw-sr-card__chips">${(o.chips ?? []).map((c) => `<li class="tw-sr-chip">${c}</li>`).join("")}</ul>
<div class="tw-sr-card__price"><div><span class="tw-premium-price-value"> 126 000 000 F Cfa </span></div></div>
<p class="tw-sr-card__seller"><span> par <strong>AGENCE X</strong></span></p></div>
<div class="tw-sr-card__actions"><a href="whatsapp://send?phone=%2B221770000000">wa</a></div></article>`;

const NOW = new Date("2026-11-24T10:00:00Z"); // a Tuesday

describe("parseExpatIndex", () => {
  it("extracts fields from data attributes and chips", () => {
    const [l] = parseExpatIndex(card({ id: "42", cat: "appartements-a-vendre", price: "126000000.00", chips: ["2 chambre", "140 m²"] }), NOW);
    expect(l).toMatchObject({
      externalId: "42",
      url: "https://www.expat-dakar.com/annonce/test-42",
      title: "Villa test & jardin",
      transaction: "SALE",
      propertyType: "appartement",
      priceXof: 126000000n,
      surfaceM2: 140,
      bedrooms: 2,
      city: "Dakar",
      locationRaw: "Ngor, Dakar",
      sellerName: "AGENCE X",
    });
    expect(l.postedAt?.toISOString()).toBe("2026-11-23T23:00:00.000Z");
  });

  it("never captures phone numbers", () => {
    const [l] = parseExpatIndex(card({ id: "1", cat: "maisons-a-louer", price: "0" }), NOW);
    expect(JSON.stringify(l, (_, v) => (typeof v === "bigint" ? v.toString() : v))).not.toMatch(/221770000000/);
  });

  it("treats 0 price as unknown, converts EUR, dedupes featured repeats", () => {
    const html =
      card({ id: "7", cat: "terrains-a-vendre", price: "1.00" }) +
      card({ id: "8", cat: "maisons-a-vendre", price: "100000.00", cur: "EUR" }) +
      card({ id: "8", cat: "maisons-a-vendre", price: "100000.00", cur: "EUR" });
    const out = parseExpatIndex(html, NOW);
    expect(out).toHaveLength(2);
    expect(out[0].priceXof).toBeNull();
    expect(out[1].priceXof).toBe(65595700n);
  });
});

describe("parseExpatDate", () => {
  it("handles today, yesterday, weekdays and day-month", () => {
    expect(parseExpatDate("Aujourd&#039;hui, 00:14", NOW)?.toISOString()).toBe("2026-11-24T00:14:00.000Z");
    expect(parseExpatDate("jeudi, 15:47", NOW)?.toISOString()).toBe("2026-11-19T15:47:00.000Z");
    expect(parseExpatDate("mardi, 09:00", NOW)?.toISOString()).toBe("2026-11-17T09:00:00.000Z");
    expect(parseExpatDate("4. nov., 10:06", NOW)?.toISOString()).toBe("2026-11-04T10:06:00.000Z");
    expect(parseExpatDate("27. sept., 15:04", NOW)?.toISOString()).toBe("2026-09-27T15:04:00.000Z");
    expect(parseExpatDate("28. déc., 08:00", NOW)?.toISOString()).toBe("2025-12-28T08:00:00.000Z");
    expect(parseExpatDate("n'importe quoi", NOW)).toBeNull();
  });
});

describe("categoryToKind", () => {
  it("maps sale / rent / furnished", () => {
    expect(categoryToKind("terrains-a-vendre")).toEqual({ transaction: "SALE", propertyType: "terrain" });
    expect(categoryToKind("chambres-a-louer")).toEqual({ transaction: "RENT", propertyType: "chambre" });
    expect(categoryToKind("appartements-meubles")).toEqual({ transaction: "RENT", propertyType: "appartement-meuble" });
    expect(categoryToKind("proprietes-commerciales-a-louer").propertyType).toBe("commercial");
  });
});
