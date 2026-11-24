import { describe, expect, it } from "vitest";
import {
  aisAge,
  aisPrice,
  aisPropertyType,
  aisTransaction,
  annoncesImmoSenegal,
  parseAisDetail,
  parseAisIndex,
} from "@/lib/connectors/annonces-immo-senegal";

// Synthetic markup mirroring the Essential Real Estate theme (not copied content).
const card = (o: {
  id: string;
  status: string;
  type: string;
  title: string;
  price: string;
  postfix?: string;
  area?: string;
  beds?: string;
  location?: string;
  date?: string;
}) => `
<div class="mg-bottom-30 ere-item-wrap"><div class="property-inner"><div class="property-image">
<a title="(4) Photos" data-property-id="${o.id}" class="property-view-gallery"></a>
<div class="ere__loop-property-badge ere__lpb-status"><span class="ere__loop-property-badge-item ere__term-status ${o.status}"><span class="ere__lpbi-inner"> X </span></span></div>
<a class="property-link" href="https://annonces-immobilieres-senegal.com/annonces-immobilieres/ad-${o.id}/" title="t"></a></div>
<div class="property-item-content"><div class="property-heading"><h2 class="property-title"><a href="https://annonces-immobilieres-senegal.com/annonces-immobilieres/ad-${o.id}/" title="t">${o.title}</a></h2>
<span class="property-price ere__loop-property-price"> ${o.price} ${o.postfix ? `<span class="property-price-postfix">${o.postfix}</span>` : ""} </span></div>
${o.location ? `<div class="property-location ere__loop-property-location" title="x"><i class="fa fa-map-marker"></i><a href="#"><span>${o.location}</span></a></div>` : ""}
<div class="property-element-inline"><div class="property-type-list"><a href="https://annonces-immobilieres-senegal.com/types/${o.type}/" rel="tag">T</a></div>
<div class="property-agent"><a href="#" title="Agence Test"><span>Agence Test</span></a></div>
<div class="property-date"><i class="fa fa-calendar"></i> ${o.date ?? "3 jours environ"}</div></div>
<div class="ere__loop-property-info property-info layout-1"><div class="property-info-inner">
${o.area ? `<div class="ere__loop-property-info-item property-area" title="Surface"><div class="ere__lpi-content"><span class="ere__lpi-value">${o.area} m<sup>2</sup></span></div></div>` : ""}
${o.beds ? `<div class="ere__loop-property-info-item property-bedrooms" title="Chambres"><div class="ere__lpi-content"><span class="ere__lpi-value">${o.beds}</span></div></div>` : ""}
</div></div></div></div></div>`;

const NOW = new Date("2026-11-24T12:00:00Z");

describe("parseAisIndex", () => {
  it("reads cards: status, type, price + postfix, surface, location, seller, date; dedupes", () => {
    const html =
      card({ id: "1", status: "a-vendre", type: "champ", title: "Champ 1 ha à vendre &#8211; Khombole, Thiès", price: "5.500.000 Fcfa", area: "10.000" }) +
      card({ id: "1", status: "a-vendre", type: "champ", title: "dup", price: "1 Fcfa" }) +
      card({ id: "2", status: "a-louer", type: "maison-villa", title: "Villa 4 chambres", price: "800.000 Fcfa", postfix: "/ mois", beds: "4", location: "Mermoz, Dakar", date: "2 semaines environ" }) +
      card({ id: "3", status: "a-louer", type: "studio", title: "Studio meublé", price: "35.000 Fcfa", postfix: "/ nuit", location: "Ngor, Dakar" });
    const out = parseAisIndex(html, NOW);
    expect(out).toHaveLength(3);
    expect(out[0]).toMatchObject({
      externalId: "1",
      url: "https://annonces-immobilieres-senegal.com/annonces-immobilieres/ad-1/",
      transaction: "SALE",
      propertyType: "terrain",
      priceXof: 5500000n,
      priceRaw: "5.500.000 Fcfa",
      surfaceM2: 10000,
      locationRaw: "Khombole, Thiès",
      city: "Thiès",
      sellerName: "Agence Test",
      sellerPhone: null,
    });
    expect(out[0].postedAt?.toISOString()).toBe("2026-11-21T12:00:00.000Z");
    expect(out[1]).toMatchObject({ transaction: "RENT", propertyType: "maison", priceXof: 800000n, bedrooms: 4, priceRaw: "800.000 Fcfa / mois" });
    expect(out[2]).toMatchObject({ transaction: "RENT", propertyType: "appartement-meuble", priceXof: 35000n });
  });
});

describe("parseAisDetail", () => {
  it("reads overview, description, phone, map sector, date, per-m² price", () => {
    const html = `
      <span class="property-price ere__loop-property-price ere__single-property-price"> 15.000 Fcfa <span class="property-price-postfix">/ m²</span> </span>
      <a title="(7) Photos" data-property-id="9"></a>
      <div class="single-property-element property-description ere__single-property-element ere__single-property-description">
        <div class="ere-heading-style2"><h2>Description</h2></div>
        <div class="ere-property-element"><p>Parcelle d&rsquo;angle, 3 chambres possibles.</p><p>Eau &amp; électricité.</p></div></div>
      <div class="single-property-element property-overview ere__single-property-element ere__single-property-overview"><div class="ere-property-element"><ul class="ere__list-2-col">
        <li> <strong>Référence</strong> <span>9</span> </li>
        <li> <strong>Surface</strong> <span class="ere__property-size">200 m<sup>2</sup></span> </li>
        <li> <strong>Salles de bain</strong> <span>2</span> </li>
      </ul></div></div>
      <div id="wphub-map" class="wphub-map" data-lat="14.70001" data-lng="-17.45002" data-radius="2500"></div>
      <p class="wphub-map-note">Secteur approximatif : <strong>Ouakam, Dakar</strong>.</p>
      <h4 class="ere__agent-name"><a href="#" title="Vendeur X">Vendeur X</a></h4>
      <div class="ere__mobile"> <i class="fa fa-phone"></i> <span>77 000 00 01</span> </div>
      <script type="application/ld+json">{"datePublished":"2026-11-15T07:57:11+00:00"}</script>`;
    expect(parseAisDetail(html)).toEqual({
      description: "Parcelle d’angle, 3 chambres possibles.\nEau & électricité.",
      rooms: null,
      bedrooms: 3,
      bathrooms: 2,
      surfaceM2: 200,
      photoCount: 7,
      locationRaw: "Ouakam, Dakar",
      sellerPhone: "221770000001",
      sellerName: "Vendeur X",
      postedAt: new Date("2026-11-15T07:57:11Z"),
      lat: 14.70001,
      lng: -17.45002,
      city: "Dakar",
      priceXof: 3000000n,
    });
  });
});

describe("helpers", () => {
  it("aisPrice handles placeholders, EUR, per-m²", () => {
    expect(aisPrice("1 Fcfa", null, null)).toBeNull();
    expect(aisPrice("100.000 €", null, null)).toBe(65595700n);
    expect(aisPrice("15.000 Fcfa", "/ m²", null)).toBeNull();
    expect(aisPrice("15.000 Fcfa", "/ m²", 100)).toBe(1500000n);
  });
  it("aisTransaction / aisPropertyType", () => {
    expect(aisTransaction(null, "Appartement à louer", null)).toBe("RENT");
    expect(aisTransaction(null, "Terrain", "/ mois")).toBe("RENT");
    expect(aisTransaction(null, "Villa à vendre Saly", null)).toBe("SALE");
    expect(aisPropertyType("propriete-agricole", null, null)).toBe("terrain");
    expect(aisPropertyType("local-commercial", null, null)).toBe("commercial");
    expect(aisPropertyType(null, "Parcelle 150 m2", null)).toBe("terrain");
  });
  it("aisAge", () => {
    expect(aisAge("1 mois environ", NOW)?.toISOString()).toBe("2026-10-25T12:00:00.000Z");
    expect(aisAge("n'importe quoi", NOW)).toBeNull();
  });
  it("pageUrl", () => {
    expect(annoncesImmoSenegal.pageUrl(1)).toBe("https://annonces-immobilieres-senegal.com/annonces-immobilieres/");
    expect(annoncesImmoSenegal.pageUrl(3)).toBe("https://annonces-immobilieres-senegal.com/annonces-immobilieres/page/3/");
  });
});
