import { describe, expect, it } from "vitest";
import { greenAcres, parseGreenAcresIndex } from "@/lib/connectors/green-acres";

const link = (path: string) => Buffer.from(`https://www.green-acres.fr${path}`).toString("base64");
const card = (id: string, path: string, title: string, price: string, loc: string, tags: string) =>
  `<div class="announce-card map obf-link obf-blank " tabindex="0" data-advertid="${id}" data-o="${link(path)}">
   <div class="announce-info" title="${title}"><strong class="info-price" data-probe-format="listing_price">${price}</strong>
   <div class="announce-localisation"> ${loc} </div><div class="characteristics">${tags}</div></div></div>`;

const html =
  card("Av9e5oyybk96s1w4", "/fr/properties/immobilier/somone/Av9e5oyybk96s1w4.htm", "Superbe Villa De 7 Chambres", "314&#xA0;304&#xA0;462 XOF", "Somone (Mbour)",
    '<div class="info-tag shown" title="Type de bien">Villa</div><div class="info-tag shown" title="Chambres">7 chambres</div><div class="info-tag shown" title="Surface habitable">2&#xA0;000 m&#xB2;</div>') +
  card("Amvzvk6jhllop6xw", "/fr/properties/terrain/gandigal/Amvzvk6jhllop6xw.htm", "Terrain", "Prix sur demande", "Gandigal (Mbour)", '<div class="info-tag shown" title="Type de bien">Terrain</div>') +
  card("Abad", "/elsewhere", "x", "1 XOF", "x", "");

describe("green-acres", () => {
  it("decodes base64 links and hex entities, skips foreign links", () => {
    const r = parseGreenAcresIndex(html);
    expect(r).toHaveLength(2);
    expect(r[0]).toMatchObject({
      externalId: "Av9e5oyybk96s1w4",
      url: "https://www.green-acres.fr/fr/properties/immobilier/somone/Av9e5oyybk96s1w4.htm",
      transaction: "SALE", propertyType: "villa", priceXof: 314_304_462n, surfaceM2: 2000, bedrooms: 7, city: "Mbour", locationRaw: "Somone (Mbour)",
    });
    expect(r[1]).toMatchObject({ propertyType: "terrain", priceXof: null, priceRaw: "Prix sur demande" });
  });
  it("walks the public sort orders", () => {
    expect(greenAcres.pageUrl(1)).toBe("https://www.green-acres.fr/maison-a-vendre?searchQuery=cn-sn&order=relevance");
    expect(greenAcres.pageUrl(2)).toContain("order=price_i");
    expect(greenAcres.pageUrl(8)).toContain("order=date_d");
  });
});
