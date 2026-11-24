import { describe, expect, it } from "vitest";
import {
  evAge,
  evLocation,
  evPrice,
  evPropertyType,
  evTransaction,
  parseEspaceVillaDetail,
  parseEspaceVillaIndex,
} from "@/lib/connectors/espacevilla";

// Synthetic Houzez-like markup (not copied content).
const card = (o: { id: string; title: string; status?: string; price: string; area?: string; unit?: string; type: string; addr: string; author?: string; date?: string; beds?: string }) => `
<div class="item-listing-wrap hz-item-gallery-js card" data-hz-id="hz-${o.id}"><div class="item-wrap">
<div class="item-body flex-grow-1"><div class="labels-wrap"><a href="https://x/statut/a-vendre/" class="label-status label">${o.status ?? " A vendre "}</a></div>
<h2 class="item-title"> <a target=_self href="https://immobilier.espacevilla.com/propriété/test-${o.id}/">${o.title}</a> </h2>
<ul class="item-price-wrap hide-on-list"><li class="item-price">${o.price}</li></ul>
<address class="item-address">${o.addr}</address>
<ul class="item-amenities ">${o.beds ? `<li class="h-beds"><i></i><span class="hz-figure">${o.beds}</span></li>` : ""}${o.area ? `<li class="h-area"><i></i><span class="hz-figure">${o.area}</span> <span class="hz-figure area_postfix">${o.unit ?? "m²"}</span></li>` : ""}<li class="h-type"><span>${o.type}</span></li></ul>
<div class="item-author"> <i></i> <a href="https://immobilier.espacevilla.com/author/someone/">${o.author ?? "Agent Test"}</a> </div>
<div class="item-date"> <i></i> ${o.date ?? "il y a2 jours"}</div></div></div></div>`;

const MAP = `<script>jQuery(document).bind("ready", function () { houzezOpenStreetMapElementor("houzez-osm-map-x", [{"title":"a","property_id":101,"lat":"14.7","lng":"-17.45"},{"title":"b \\"q\\" ]","property_id":102,"lat":"","lng":""}], {"zoom":12}); });</script>`;

const NOW = new Date("2026-11-24T12:00:00Z");

describe("parseEspaceVillaIndex", () => {
  it("parses cards, per-m² prices, coordinates and dedupes", () => {
    const html =
      MAP +
      card({ id: "101", title: "Terrain 300m2 à vendre à Ngaparou", price: "35,000FCFA/m2", area: "300", type: "Terrain à vendre", addr: "Ngaparou, Département de M'bour, Région de Thiès, Sénégal" }) +
      card({ id: "101", title: "dup", price: "1", type: "Terrain à vendre", addr: "x" }) +
      card({ id: "102", title: "Villa F5 Mermoz", price: " 320,000,000FCFA", area: "400", type: "Villa à vendre", addr: "Mermoz, Dakar, Région de Dakar, 22352, Sénégal", beds: "5", date: "il y a1 semaine" });
    const out = parseEspaceVillaIndex(html, NOW);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "101",
      url: "https://immobilier.espacevilla.com/propriété/test-101/",
      transaction: "SALE",
      propertyType: "terrain",
      priceXof: 10500000n,
      priceRaw: "35,000FCFA/m2",
      surfaceM2: 300,
      locationRaw: "Ngaparou, Thiès",
      city: "Thiès",
      sellerName: "Agent Test",
      lat: 14.7,
      lng: -17.45,
    });
    expect(out[0].postedAt?.toISOString()).toBe("2026-11-22T12:00:00.000Z");
    expect(out[1]).toMatchObject({ priceXof: 320000000n, propertyType: "villa", bedrooms: 5, locationRaw: "Mermoz, Dakar", lat: null, lng: null });
    expect(out[1].postedAt?.toISOString()).toBe("2026-11-17T12:00:00.000Z");
  });

  it("returns nothing past the last page (no cards)", () => {
    expect(parseEspaceVillaIndex("<html><body>Aucun résultat</body></html>")).toEqual([]);
  });
});

describe("helpers", () => {
  it("evPrice handles totals, per m², per hectare, EUR and placeholders", () => {
    expect(evPrice("650,000,000FCFA", null)).toBe(650000000n);
    expect(evPrice("1,000,000FCFA/m2", 459)).toBe(459000000n);
    expect(evPrice("35,000FCFA/m2", null)).toBeNull();
    expect(evPrice("60,000,000FCFA/Ha", 25000)).toBe(150000000n);
    expect(evPrice("16,000,000FCFA/terrain", 150)).toBe(16000000n);
    expect(evPrice("100,000€", null)).toBe(65595700n);
    expect(evPrice("1FCFA", null)).toBeNull();
    expect(evPrice(null, 100)).toBeNull();
  });

  it("evLocation keeps the neighbourhood and the region", () => {
    expect(evLocation("Rue de Fatick, Point E, Commune de Fann-Point E-Amitié, Arrondissement de Dakar-Plateau, Dakar, Région de Dakar, 10700, Sénégal")).toEqual({ locationRaw: "Point E, Dakar", city: "Dakar" });
    expect(evLocation("Arrondissement des Almadies, Dakar, Région de Dakar, Sénégal")).toEqual({ locationRaw: "Almadies, Dakar", city: "Dakar" });
    expect(evLocation("Commune de Diamniadio, Arrondissement de Diamniadio, Département de Rufisque, Région de Dakar, Sénégal")).toEqual({ locationRaw: "Diamniadio, Dakar", city: "Dakar" });
    expect(evLocation(null)).toEqual({ locationRaw: null, city: null });
  });

  it("type, transaction, age", () => {
    expect(evPropertyType("Terrain à vendre, Villa à vendre")).toBe("terrain");
    expect(evPropertyType("Hotel Resto Bar, Villa à vendre")).toBe("commercial");
    expect(evPropertyType("Immeuble à Vendre")).toBe("immeuble");
    expect(evTransaction("A vendre", "Villa à vendre", "1FCFA")).toBe("SALE");
    expect(evTransaction("A louer", null, null)).toBe("RENT");
    expect(evTransaction(null, null, "500,000FCFA/mois")).toBe("RENT");
    expect(evAge("il y a 5 heures", NOW)?.toISOString()).toBe("2026-11-24T07:00:00.000Z");
    expect(evAge("hier", NOW)).toBeNull();
  });
});

describe("parseEspaceVillaDetail", () => {
  const detail = (agentHref: string) => `
    <div class="property-overview-data"><ul><li class="property-overview-item"><strong>Villa à vendre</strong></li><li class="hz-meta-label property-overview-type">Type</li></ul>
    <ul><li class="property-overview-item"><i></i> <strong>300</strong></li><li class="hz-meta-label h-area">m²</li></ul>
    <ul><li class="property-overview-item"><i></i> <strong>2</strong></li><li class="hz-meta-label h-baths">SdB</li></ul></div>
    <div class="description-content"><p>Villa R+1 avec d'1chambre au RDC.</p><p>Titre foncier.</p></div>
    <ul class="list-2-cols"><li class="detail-city"><strong>Ville</strong> <span>Cité Test, Dakar</span></li><li class="detail-area"><strong>Zone</strong> <span>Dakar</span></li></ul>
    <ul class="list-3-cols"><li><a href="https://immobilier.espacevilla.com/caractéristique/4-chambres/">4 chambres</a></li></ul>
    <div id="property-gallery-js" class="houzez-photoswipe listing-slider"><div data-thumb="https://x/1.jpg"></div><div data-thumb="https://x/2.jpg"></div><div data-thumb="https://x/3.jpg"></div></div>
    <div class="agent-details"><ul class="agent-information"><li class="agent-name"><i></i> Agent Test</li><li class="agent-link"><a href="https://immobilier.espacevilla.com${agentHref}">Lien</a></li></ul></div>
    <a href="tel:+221770000009" data-property-id="1" class="btn hz-btn-call">Appelez</a>
    <script>var houzez_single_property_map = {"title":"t","lat":"14.74","lng":"-17.47"}; var houzez_map_options = {};</script>`;

  it("reads overview, features, description, address, photos, coordinates and phone", () => {
    expect(parseEspaceVillaDetail(detail("/author/someone/"))).toEqual({
      description: "Villa R+1 avec d'1chambre au RDC.\nTitre foncier.",
      rooms: null,
      bedrooms: 4,
      bathrooms: 2,
      surfaceM2: 300,
      photoCount: 3,
      locationRaw: "Cité Test, Dakar",
      sellerPhone: "221770000009",
      sellerName: "Agent Test",
      lat: 14.74,
      lng: -17.47,
    });
  });

  it("keeps the agency's own number (Espace Villa is the seller)", () => {
    expect(parseEspaceVillaDetail(detail("/author/agent_immo/")).sellerPhone).not.toBeNull();
  });
});
