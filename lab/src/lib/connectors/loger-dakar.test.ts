import { describe, expect, it } from "vitest";
import {
  logerDakar,
  logerTransaction,
  parseLogerDetail,
  parseLogerIndex,
  parseLogerPrice,
} from "@/lib/connectors/loger-dakar";

// Synthetic markup mirroring the G5 ERE theme structure (not copied content).
const card = (o: {
  id: string;
  title: string;
  type: string;
  status: string;
  price: string;
  postfix?: string;
  beds?: string;
  size?: string;
  lat?: string;
  lng?: string;
}) => `
<article class="g5core__gutter-item g5ere__property-item post-${o.id} property type-property property-type-${o.type} property-status-${o.status} property-city-dakar property-neighborhood-test" data-id="${o.id}" data-location="{&quot;id&quot;:${o.id},&quot;title&quot;:&quot;${o.title}&quot;,&quot;position&quot;:{&quot;lat&quot;:&quot;${o.lat ?? "14.7"}&quot;,&quot;lng&quot;:&quot;${o.lng ?? "-17.5"}&quot;},&quot;url&quot;:&quot;https:\\/\\/www.loger-dakar.com\\/Bien\\/test-${o.id}\\/&quot;,&quot;address&quot;:&quot;Quartier Test&quot;}">
 <div class="g5ere__property-content"><h3 class="g5ere__loop-property-title"> <a href="https://www.loger-dakar.com/Bien/test-${o.id}/">${o.title}</a> </h3>
 <div class="g5ere__loop-property-address"> <a href="//maps.google.com/?q=x">Quartier Test</a> </div>
 <ul class="g5ere__loop-property-meta">${o.beds ? `<li class="bedrooms" data-toggle="tooltip" title="Chambres"> <span class="g5ere__property-bedrooms">${o.beds}</span> </li>` : ""}
 ${o.size ? `<li class="size" data-toggle="tooltip" title="Taille"> <span class="g5ere__loop-property-size">${o.size}</span> </li>` : ""}</ul>
 <span class="g5ere__loop-property-price"> <span class="g5ere__lpp-price">${o.price}</span>${o.postfix ? ` <span class="g5ere__lpp-postfix">${o.postfix}</span>` : ""} </span>
 </div></article>`;

describe("parseLogerIndex", () => {
  it("reads data-location JSON, taxonomy classes, meta and price; dedupes", () => {
    const html =
      card({ id: "1", title: "Appartement meublé F3 à louer", type: "appartement", status: "a-louer", price: "800 000 Mille F.CFA", postfix: "/ Mois", beds: "2 Ch", lat: "14.744186", lng: "-17.517525" }) +
      card({ id: "1", title: "Appartement meublé F3 à louer", type: "appartement", status: "a-louer", price: "800 000 F.CFA" }) +
      card({ id: "2", title: "Villa R+1 à vendre", type: "maison-villa", status: "a-vendre", price: "€ 150 000", size: "300 m²", lat: "-33.86", lng: "151.19" });
    const out = parseLogerIndex(html);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "1",
      url: "https://www.loger-dakar.com/Bien/test-1/",
      title: "Appartement meublé F3 à louer",
      transaction: "RENT",
      propertyType: "appartement-meuble",
      priceXof: 800000n,
      priceRaw: "800 000 F.CFA / Mois",
      bedrooms: 2,
      city: "Dakar",
      locationRaw: "Quartier Test, Dakar",
      lat: 14.744186,
      lng: -17.517525,
    });
    expect(out[1]).toMatchObject({
      transaction: "SALE",
      propertyType: "villa",
      priceXof: 98393550n,
      surfaceM2: 300,
      lat: null, // theme default coords outside Senegal are dropped
      lng: null,
    });
  });

  it("trusts an unambiguous title over a wrong status and drops bedrooms on land", () => {
    const [l] = parseLogerIndex(
      card({ id: "3", title: "Terrain 5585 m² TF à vendre", type: "terrain", status: "a-louer", price: "7 000 000 000 F.CFA", beds: "1 Ch" }),
    );
    expect(l).toMatchObject({ transaction: "SALE", propertyType: "terrain", bedrooms: null, surfaceM2: 5585 });
  });
});

describe("parseLogerDetail", () => {
  it("reads details list, description, gallery, agent phone and publish date", () => {
    const html = `
      <meta property="og:article:published_time" content="2026-11-18 17:23:32"/>
      <div class="g5ere__single-property-galleries"><img src="https://www.loger-dakar.com/wp-content/uploads/2026/11/a.jpg">
        <img src="https://www.loger-dakar.com/wp-content/uploads/2026/11/a-150x150.jpg"><img src="https://www.loger-dakar.com/wp-content/uploads/2026/11/b.jpeg"></div>
      <div class="g5ere__property-title-price"><div class="g5ere__property-address"> <a href="#"><i></i> Mamelles</a> </div></div>
      <div class="g5ere__property-block-description card"><div class="card-header"><h2>Description</h2></div>
        <div class="card-body"><p>Duplex F6.<br /> 5 chambres, terrasse.</p> <div class="sharedaddy">share</div></div></div>
      <ul class="g5ere__property-details-list">
        <li><strong>Chambres</strong> <span class="g5ere__property-bedrooms">05</span></li>
        <li><strong>Les salles de bains</strong> <span class="g5ere__property-bathrooms">04</span></li>
        <li><strong>Taille</strong> <span class="g5ere__property-size">100 m<sup>2</sup></span></li>
      </ul>
      <h3 class="g5ere__loop-agent-title"> <a href="/agent/x/">AGENCE TEST</a> </h3>
      <span class="g5ere__lam-content"> <a href="tel:770000002">770000002</a> </span>
      <div class="g5ere__similar-properties"><a href="tel:+221700000099">autre</a></div>`;
    expect(parseLogerDetail(html)).toEqual({
      description: "Duplex F6.\n5 chambres, terrasse.",
      rooms: null,
      bedrooms: 5,
      bathrooms: 4,
      surfaceM2: 100,
      photoCount: 2,
      locationRaw: "Mamelles",
      sellerPhone: "221770000002",
      postedAt: new Date("2026-11-18T17:23:32Z"),
      sellerName: "AGENCE TEST",
    });
  });
});

describe("helpers", () => {
  it("parseLogerPrice ignores the 'Mille' label and converts EUR", () => {
    expect(parseLogerPrice("1 100 000 Mille F.CFA").xof).toBe(1100000n);
    expect(parseLogerPrice("€ 100 000").xof).toBe(65595700n);
    expect(parseLogerPrice("Prix sur demande").xof).toBeNull();
  });
  it("logerTransaction falls back to status", () => {
    expect(logerTransaction("a-vendre", "Villa Saly")).toBe("SALE");
    expect(logerTransaction(null, "Studio à louer")).toBe("RENT");
    expect(logerTransaction(null, "Villa à louer ou à vendre")).toBe("UNKNOWN");
  });
  it("pageUrl uses the /Bien/ archive", () => {
    expect(logerDakar.pageUrl(1)).toBe("https://www.loger-dakar.com/Bien/");
    expect(logerDakar.pageUrl(7)).toBe("https://www.loger-dakar.com/Bien/page/7/");
  });
});
