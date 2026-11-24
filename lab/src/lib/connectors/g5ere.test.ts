import { describe, expect, it } from "vitest";
import { immoStar, parseG5Detail, parseG5Sitemap } from "@/lib/connectors/g5ere";

const sitemap = `<urlset><url><loc>https://3h-immobilier.com/property/</loc></url>
<url><loc>https://3h-immobilier.com/property/dakar-plateau-appartement-de-3-chambres-a-louer-3/</loc></url>
<url><loc>https://3h-immobilier.com/property/terrain-a-vendre-point-e/</loc></url></urlset>`;

const ad = (status: string, labels: [string, string][]) => `
<div class="g5ere__property-title-address"><h1 class="g5ere__property-title"> Maison de charme &#8211; Dakar Plateau</h1></div>
<span class="g5ere__property-price"> <span class="g5ere__lpp-price">350 000 000 FCFA</span> </span>
<span class="g5ere__property-status"><a href="x" rel="tag">${status}</a></span>
${labels.map(([l, v]) => `<div class="media-body"><span>${l}</span> <strong><span>${v}</span></strong></div>`).join("")}
<meta property="og:description" content="Belle maison" />
<a href="tel:+221778112064">Appeler</a>`;

describe("g5ere", () => {
  it("reads ad URLs from the property sitemap, skips the archive", () => {
    const r = parseG5Sitemap(sitemap);
    expect(r.map((x) => [x.externalId, x.transaction, x.propertyType])).toEqual([
      ["dakar-plateau-appartement-de-3-chambres-a-louer-3", "RENT", "appartement"],
      ["terrain-a-vendre-point-e", "SALE", "terrain"],
    ]);
  });
  it("parses an ad page with English labels", () => {
    expect(parseG5Detail(ad("Vente", [["Type", "Villa / Maison"], ["Bedrooms", "4"], ["Bathrooms", "3"], ["Size", "1 250 m<sup>2</sup>"]]))).toMatchObject({
      title: "Maison de charme – Dakar Plateau", transaction: "SALE", propertyType: "villa", priceXof: 350_000_000n,
      bedrooms: 4, bathrooms: 3, surfaceM2: 1250, description: "Belle maison", sellerPhone: "221778112064",
    });
  });
  it("parses French labels and the rent status", () => {
    expect(parseG5Detail(ad("Location", [["Type de biens", "Appartement"], ["Chambres", "3"], ["Superficie", "256 m2"]]))).toMatchObject({
      transaction: "RENT", propertyType: "appartement", bedrooms: 3, surfaceM2: 256,
    });
  });
  it("pages", () => {
    expect(immoStar.pageUrl(1)).toBe("https://www.agence-immobiliere-dakar.com/property-sitemap.xml");
  });
});
