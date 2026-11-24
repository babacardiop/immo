import { describe, expect, it } from "vitest";
import { diwaan, diwaanTransaction, parseDiwaanDetail, parseDiwaanIndex } from "@/lib/connectors/diwaan";

const card = (slug: string, badge: string, price: string, unit: string, title: string, loc: string, feats: string) => `
<article class="card property-card" style="position: relative;">
  <a href="https://www.diwaan-immo.com/propriete/${slug}" style="display: block;">
    <div class="image-container"><span class="badge badge-x">
        ${badge}
    </span></div>
    <div class="content">
      <p class="price">
        ${price}
        ${unit ? `<span style="font-size: 0.75rem;">${unit}</span>` : ""}
      </p>
      <h3 class="title">${title}</h3>
      <p class="location"><i class="fas fa-map-marker-alt"></i> ${loc} </p>
      <div class="features">${feats}</div>
    </div>
  </a>
</article>`;

const index = card("villa-a-vendre-a-ngaparou-K1qnWv", "Vente", "170 000 000 CFA", "", "Villa avec piscine à vendre à Ngaparou", "Ngaparou, Mbour",
  '<span class="feature"><i class="fas fa-bed"></i> 5 ch. </span><span class="feature"><i></i> 300.00 m² </span>') +
  card("studio-meuble-almadies-gyQLnM", "Location Journée", "70 000 CFA", "/ jour", "Studio meublé à louer aux Almadies", "Almadies, Dakar",
    '<span class="feature"><i class="fas fa-bed"></i> 1 ch. </span>');

const detail = `<html><a href="tel:781950505">78 195 05 05</a>
<script type="application/ld+json">{"address": {"@type": "PostalAddress", "addressLocality": "Point E, Dakar"}}</script>
<img src="https://www.diwaan-immo.com/storage/properties/a.jpeg"><img src="https://www.diwaan-immo.com/storage/properties/b.jpeg">
<div><p style="font-weight: 700;">3</p>
<p style="font-size: 0.75rem;">Chambres</p></div>
<div><p style="font-weight: 700;">4</p>
<p style="font-size: 0.75rem;">Salles de bain</p></div>
<div style="color: var(--text-secondary); line-height: 1.8; white-space: pre-line;">Bel F4   au Point E
Résidence Jais</div>
<a href="https://wa.me/221784792287?text=Bonjour">WhatsApp</a>
<h2>Propriétés similaires</h2><img src="https://www.diwaan-immo.com/storage/properties/other.jpeg"></html>`;

describe("diwaan", () => {
  it("parses index cards", () => {
    const [a, b] = parseDiwaanIndex(index);
    expect(a).toMatchObject({ externalId: "K1qnWv", transaction: "SALE", propertyType: "villa", priceXof: 170_000_000n, surfaceM2: 300, bedrooms: 5, city: "Mbour", locationRaw: "Ngaparou, Mbour" });
    expect(b).toMatchObject({ externalId: "gyQLnM", transaction: "RENT", propertyType: "appartement-meuble", priceXof: 70_000n, bedrooms: 1, city: "Dakar" });
    expect(b.priceRaw).toContain("jour");
  });
  it("parses ad page, keeps agent phone, drops platform line and similar-ad photos", () => {
    expect(parseDiwaanDetail(detail)).toEqual({
      description: "Bel F4 au Point E\nRésidence Jais",
      rooms: null,
      bedrooms: 3,
      bathrooms: 4,
      surfaceM2: null,
      photoCount: 2,
      locationRaw: "Point E, Dakar",
      sellerPhone: "221784792287",
    });
    expect(parseDiwaanDetail(detail.replace("221784792287", "221781950505")).sellerPhone).toBeNull();
  });
  it("transaction fallback and pages", () => {
    expect(diwaanTransaction(null, "Terrain à vendre à Diass")).toBe("SALE");
    expect(diwaan.pageUrl(1)).toBe("https://www.diwaan-immo.com/proprietes");
    expect(diwaan.pageUrl(4)).toBe("https://www.diwaan-immo.com/proprietes?page=4");
  });
});
