import { describe, expect, it } from "vitest";
import {
  parseSenewebDetail,
  parseSenewebIndex,
  senewebTransaction,
  senewebType,
  seneweb,
} from "@/lib/connectors/seneweb";

// Synthetic markup mirroring Seneweb's structure (not copied content).
const card = (o: { ref: string; label: string; title: string; loc: string; chips: string[]; price: string }) => `
<div class="autos-product-card"> <img src="x.jpg" alt="${o.title}">
 <div class="autos-product-card-content"> <span>${o.label}</span>
  <h5> ${o.title} <span>Neuf</span> </h5> <p class="svc-card-loc">📍 ${o.loc}</p>
  <div class="svc-card-chips"> ${o.chips.map((c) => `<span>${c}</span>`).join("")} </div>
  <h5 class="price">${o.price} CFA</h5> </div>
 <a href="/services/immo/annonce/${o.ref}/slug-${o.ref}" aria-label="${o.title}"></a>
 <button type="button" class="svc-fav svc-fav--card" data-ref="${o.ref}" data-price="${o.price.replace(/\s/g, "")}" data-source="grid"></button>
</div>`;

describe("parseSenewebIndex", () => {
  it("reads cards, chips and price; dedupes repeated refs", () => {
    const html =
      card({ ref: "AAA111", label: "Appartement", title: "F4 standing 3 chambres Point E", loc: "POINT E", chips: ["À louer", "4 pièces", "150 m²"], price: "900 000" }) +
      card({ ref: "AAA111", label: "Appartement", title: "F4 standing 3 chambres Point E", loc: "POINT E", chips: ["À louer"], price: "900 000" }) +
      card({ ref: "BBB222", label: "Terrain", title: "Terrain titré Lac Rose", loc: "Lac Rose", chips: ["À vendre", "0 pièces", "11 369 m²"], price: "1" });
    const out = parseSenewebIndex(html);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "AAA111",
      url: "https://seneweb.com/services/immo/annonce/AAA111/slug-AAA111",
      title: "F4 standing 3 chambres Point E",
      transaction: "RENT",
      propertyType: "appartement",
      priceXof: 900000n,
      priceRaw: "900 000 CFA",
      surfaceM2: 150,
      bedrooms: 3,
      locationRaw: "POINT E",
      sellerPhone: null,
    });
    expect(out[1]).toMatchObject({ transaction: "SALE", propertyType: "terrain", priceXof: null, surfaceM2: 11369 });
  });
});

describe("parseSenewebDetail", () => {
  it("reads technical data, description, gallery and phone", () => {
    const html = `
      <script> const images = ["https:\\/\\/x\\/1","https:\\/\\/x\\/2","https:\\/\\/x\\/3"]; </script>
      <div class="autos-post-description"> <h4>Description</h4> <p>Bel appartement.<br> 2 chambres, ascenseur.</p> </div>
      <ul class="technical-data-list"> <li> <h6>Type de bien</h6> <span>Appartement</span> </li>
        <li> <h6>Localisation</h6> <span>MERMOZ</span> </li> <li> <h6>Pièces</h6> <span>3</span> </li>
        <li> <h6>Surface</h6> <span>95</span> </li> </ul>
      <a class="svc-btn wa" href="https://wa.me/221770000001?text=x">WhatsApp</a>
      <a class="svc-btn call" href="tel:+221770000001">Appeler</a>
      <ul class="autos-post-meta"> <li> <i class="icon-date"></i> <span>3 févr. 2026</span> </li> </ul>
      <p class="svc-lead">Écrivez ou appelez directement Vendeur Test — mentionnez la référence</p>`;
    expect(parseSenewebDetail(html)).toEqual({
      description: "Bel appartement.\n2 chambres, ascenseur.",
      rooms: 3,
      bedrooms: 2,
      bathrooms: null,
      surfaceM2: 95,
      photoCount: 3,
      locationRaw: "MERMOZ",
      sellerPhone: "221770000001",
      postedAt: new Date("2026-02-03T00:00:00.000Z"),
      sellerName: "Vendeur Test",
    });
  });

  it("falls back to the WhatsApp link for the phone", () => {
    expect(parseSenewebDetail('<a href="https://wa.me/221780000002?text=x">wa</a>').sellerPhone).toBe("221780000002");
  });
});

describe("helpers", () => {
  it("maps type labels, including furnished and studio", () => {
    expect(senewebType("Studio", "Studio meublé Ngor")).toBe("appartement-meuble");
    expect(senewebType("Bureau", "Plateau de bureaux")).toBe("bureau");
    expect(senewebType("Villa", "Villa R+1")).toBe("villa");
  });
  it("maps transaction from chip, then title, then type", () => {
    expect(senewebTransaction("À vendre", "x", "villa")).toBe("SALE");
    expect(senewebTransaction(null, "Appartement à louer Mermoz", "appartement")).toBe("RENT");
    expect(senewebTransaction(null, "Parcelle", "terrain")).toBe("SALE");
    expect(senewebTransaction(null, "Bien", "maison")).toBe("UNKNOWN");
  });
  it("builds page URLs", () => {
    expect(seneweb.pageUrl(1)).toBe("https://seneweb.com/services/immo");
    expect(seneweb.pageUrl(3)).toBe("https://seneweb.com/services/immo?page=3");
  });
});
