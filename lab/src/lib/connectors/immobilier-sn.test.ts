import { describe, expect, it } from "vitest";
import {
  immobilierSn,
  immoPrice,
  immoTransaction,
  immoType,
  parseImmoDetail,
  parseImmoFeed,
} from "@/lib/connectors/immobilier-sn";

// Synthetic RSS / HTML mirroring the site's WordPress + WP Residence structure (no real ad content).
const item = (slug: string, title: string, excerpt = "", creator = "vendeur1") => `
<item>
  <title>${title}</title>
  <link>https://immobilier.sn/estate_property/${slug}/</link>
  <dc:creator><![CDATA[${creator}]]></dc:creator>
  <pubDate>Sat, 07 Nov 2026 19:47:45 +0000</pubDate>
  <guid isPermaLink="false">https://immobilier.sn/estate_property/${slug}/</guid>
  <description><![CDATA[<p>${excerpt}</p>
<p>The post <a href="https://immobilier.sn/estate_property/${slug}/">${title}</a> first appeared on <a href="https://immobilier.sn">immobilier.sn</a>.</p>]]></description>
</item>`;

describe("parseImmoFeed", () => {
  it("reads title, url, slug id, date, creator; dedupes", () => {
    const xml = `<rss><channel>${
      item("terrain-300-m%c2%b2-a-vendre-a-test", "Terrain 300 m² à vendre à Test &#124; TF", "Terrain plat") +
      item("terrain-300-m%c2%b2-a-vendre-a-test", "Terrain 300 m² à vendre à Test &#124; TF") +
      item("appartement-meuble-a-louer-test", "Appartement meublé à louer", "F3 avec 2 chambres", "agence-x")
    }</channel></rss>`;
    const out = parseImmoFeed(xml);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({
      externalId: "terrain-300-m²-a-vendre-a-test",
      url: "https://immobilier.sn/estate_property/terrain-300-m%c2%b2-a-vendre-a-test/",
      title: "Terrain 300 m² à vendre à Test | TF",
      transaction: "SALE",
      propertyType: "terrain",
      priceXof: null,
      surfaceM2: 300,
      sellerName: "vendeur1",
    });
    expect(out[0].postedAt?.toISOString()).toBe("2026-11-07T19:47:45.000Z");
    expect(out[1]).toMatchObject({ transaction: "RENT", propertyType: "appartement-meuble", bedrooms: 2, sellerName: "agence-x" });
  });

  it("returns nothing for an empty feed (end of results)", () => {
    expect(parseImmoFeed("<rss><channel></channel></rss>")).toEqual([]);
  });

  it("paginates with paged=N", () => {
    expect(immobilierSn.pageUrl(1)).toBe("https://immobilier.sn/feed/?post_type=estate_property");
    expect(immobilierSn.pageUrl(3)).toBe("https://immobilier.sn/feed/?post_type=estate_property&paged=3");
  });
});

const detail = (o: { price: string; label?: string; cat: string; action: string; desc: string; tel?: string; slides?: number }) => `
<div class="header_phone"><a href="https://api.whatsapp.com/send?phone=33776805294">+33 776805294</a> <a href="tel:+33776805294">site</a></div>
<div class="carousel-inner owl-carousel owl-theme" id="property_slider_carousel">
${Array.from({ length: o.slides ?? 3 }, (_, i) => `<div class="item ${i === 0 ? "active" : ""}" data-number="${i + 1}"><a href="https://immobilier.sn/wp-content/uploads/2026/11/p${i}.jpeg"></a></div>`).join("")}
</div><ol class="carousel-indicators"><li></li></ol>
<h1 class="entry-title entry-prop">Villa test 4 chambres</h1>
<div class="price_area">${o.price} <span class="price_label">${o.label ?? ""}</span></div>
<a href="https://immobilier.sn/property_action_category/${o.action}/" rel="tag">x</a>
<a href="https://immobilier.sn/property_category/${o.cat}/" rel="tag">y</a>
<div class="wpestate_property_description" id="wpestate_property_description_section"><h4 class="panel-title"> Description</h4><p>${o.desc}</p></div>
<div class="listing_detail col-md-6"><strong>Ville:</strong> <a href="#">Ngor</a></div><div class="listing_detail col-md-6"><strong>Région:</strong> <a href="#">Dakar</a></div>
<div class="listing_detail col-md-6" id="propertyid_display"><strong>Id de l&#039;annonce :</strong> 123</div>
<div class="listing_detail col-md-6"><strong>Superficie:</strong> 265 m<sup>2</sup></div>
<div class="listing_detail col-md-6"><strong>Chambres:</strong> 4</div>
<div class="listing_detail col-md-6"><strong>Salles de bains:</strong> 3</div>
<div class="agent_sidebar_mobile"> <a href="tel:${o.tel ?? ""}"></a></div>`;

describe("parseImmoDetail", () => {
  it("reads price, type, action, address, details; phone from description, ignoring the site number", () => {
    const d = parseImmoDetail(
      detail({ price: "160 000 000 FCFA", cat: "villa", action: "en-vente-neuf", desc: "Belle villa.<br />Contact : 77 000 00 01" }),
    );
    expect(d).toMatchObject({
      priceXof: 160000000n,
      priceRaw: "160 000 000 FCFA",
      transaction: "SALE",
      propertyType: "villa",
      city: "Dakar",
      locationRaw: "Ngor, Dakar",
      surfaceM2: 265,
      bedrooms: 4,
      bathrooms: 3,
      photoCount: 3,
      sellerPhone: "221770000001",
      description: "Belle villa.\nContact : 77 000 00 01",
    });
  });

  it("drops junk city values and decodes hex entities in the description", () => {
    const html = detail({ price: "60 000 000 FCFA", cat: "maison", action: "vente", desc: "&#x1f4e2; Maison" }).replace(">Ngor<", ">all<");
    const d = parseImmoDetail(html);
    expect(d.locationRaw).toBe("Dakar");
    expect(d.description).toBe("📢 Maison");
  });

  it("prefers a filled agent tel: link, detects rent from price label and EUR prices", () => {
    const d = parseImmoDetail(
      detail({ price: "1 500 €", label: "/mois", cat: "appartement", action: "autre", desc: "Sans numéro", tel: "+221 78 000 00 02", slides: 1 }),
    );
    expect(d).toMatchObject({ transaction: "RENT", propertyType: "appartement", priceXof: 983936n, sellerPhone: "221780000002", photoCount: 1 });
  });
});

describe("helpers", () => {
  it("immoPrice", () => {
    expect(immoPrice("1 116 000 FCFA /mois")).toBe(1116000n);
    expect(immoPrice("1 FCFA")).toBeNull();
    expect(immoPrice("250 000 USD")).toBeNull();
    expect(immoPrice(null)).toBeNull();
  });
  it("immoTransaction / immoType", () => {
    expect(immoTransaction("location-vacances")).toBe("RENT");
    expect(immoTransaction(null, "Villa à vendre à Saly")).toBe("SALE");
    expect(immoType("terrain-agricole")).toBe("terrain");
    expect(immoType("verger")).toBe("terrain");
    expect(immoType("magasin")).toBe("commercial");
    expect(immoType("studio", "Studio meublé")).toBe("appartement-meuble");
  });
});
