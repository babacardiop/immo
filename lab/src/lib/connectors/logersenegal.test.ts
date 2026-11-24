import { describe, expect, it } from "vitest";
import {
  logerSenegal,
  logerType,
  parseLogerDate,
  parseLogerDetail,
  parseLogerIndex,
  sellerPhoneOrNull,
} from "@/lib/connectors/logersenegal";

// Synthetic markup mirroring the site's structure (not copied content).
const card = (o: {
  slug: string;
  tag: string;
  amount: string;
  unit: string;
  total?: string;
  title: string;
  type: string;
  specs?: string[];
  phone?: string;
  date?: string;
}) => `
<article class="pc" data-pc><div class="pc-media"><div class="pc-tags"><span class="pc-tag pc-tag--x"><i class="fa"></i> ${o.tag}</span></div>
<span class="pc-count" title="3 photos"><i></i> 3</span></div>
<div class="pc-body"><div class="pc-price"> <strong>${o.amount}</strong><small>${o.unit}</small>${o.total ? ` <span class="pc-total">Total : ${o.total} F</span>` : ""} </div>
<h3 class="pc-title" title="${o.title}">${o.title}</h3>
<div class="pc-loc"> <i class="fa"></i> <span>Mermoz, Dakar</span> </div>
<div class="pc-specs"> <span title="Type de bien"><i class="fa"></i> ${o.type}</span>${(o.specs ?? []).map((s) => ` <span><i class="fa"></i> ${s}</span>`).join("")} </div>
<div class="pc-foot"><div class="pc-owner"><span class="pc-avatar"> A </span><span class="pc-owner-txt"> <b>Agence Test</b> <small title="${o.date ?? "24/11/2026 à 00h53"}">il y a 1 heure</small></span></div>
<a href="https://wa.me/${o.phone ?? "221764443313"}?text=x" class="pc-wa"></a></div></div>
<a href="/annonces/${o.slug}/" class="stretched-link"></a></article>`;

describe("parseLogerIndex", () => {
  it("parses a monthly rental card", () => {
    const [l] = parseLogerIndex(
      card({ slug: "location-appartement-f3-mermoz-dakar-a1b2c3d4", tag: "À louer", amount: "450 000", unit: "FCFA / mois", title: "Appartement 2 chambres à louer", type: "Appartement F3", specs: ["2 ch.", "2 sdb"] }),
    );
    expect(l).toMatchObject({
      externalId: "a1b2c3d4",
      url: "https://logersenegal.com/annonces/location-appartement-f3-mermoz-dakar-a1b2c3d4/",
      transaction: "RENT",
      propertyType: "appartement",
      priceXof: 450000n,
      bedrooms: 2,
      locationRaw: "Mermoz, Dakar",
      city: "Dakar",
      sellerName: "Agence Test",
      sellerPhone: null, // platform line dropped
    });
    expect(l.postedAt?.toISOString()).toBe("2026-11-24T00:53:00.000Z");
  });

  it("uses the stated total for per-m² prices, else amount × surface", () => {
    const html =
      card({ slug: "vente-villa-x-11111111", tag: "À vendre", amount: "1 400 000", unit: "FCFA / m²", total: "1 400 000 000", title: "Villa à vendre", type: "Villa", specs: ["1 000 m²"] }) +
      card({ slug: "vente-terrain-y-22222222", tag: "À vendre", amount: "100 000", unit: "FCFA / m²", title: "Terrain à vendre", type: "Terrain", specs: ["300 m²"] }) +
      card({ slug: "vente-terrain-y-22222222", tag: "À vendre", amount: "100 000", unit: "FCFA / m²", title: "Terrain à vendre", type: "Terrain", specs: ["300 m²"] });
    const out = parseLogerIndex(html);
    expect(out).toHaveLength(2); // dedupe
    expect(out[0]).toMatchObject({ transaction: "SALE", propertyType: "villa", priceXof: 1400000000n, surfaceM2: 1000 });
    expect(out[1]).toMatchObject({ propertyType: "terrain", priceXof: 30000000n, surfaceM2: 300 });
  });

  it("keeps a real owner phone and marks furnished nightly rentals", () => {
    const [l] = parseLogerIndex(
      card({ slug: "sejour-studio-z-33333333", tag: "À louer", amount: "35 000", unit: "FCFA / nuit", title: "Studio meublé", type: "Studio", phone: "221771234567" }),
    );
    expect(l).toMatchObject({ sellerPhone: "221771234567", propertyType: "appartement-meuble", transaction: "RENT", priceXof: 35000n });
  });
});

describe("parseLogerDetail", () => {
  it("reads JSON-LD, quick facts and description", () => {
    const ld = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList" },
        {
          "@type": "RealEstateListing",
          datePosted: "2026-11-24T00:53:22+00:00",
          description: "tronquée …",
          address: { streetAddress: "Mermoz", addressLocality: "DAKAR" },
          geo: { latitude: 14.7, longitude: -17.47 },
          image: ["a.webp", "b.webp", "c.webp"],
        },
      ],
    };
    const html = `
      <script type="application/ld+json">${JSON.stringify(ld)}</script>
      <div class="small text-muted">Surface</div> <div class="fw-bold">120 m²</div>
      <div class="small text-muted">Chambres</div> <div class="fw-bold">3</div>
      <div class="small text-muted">Toilettes</div> <div class="fw-bold">2</div>
      <div class="description-text" style="white-space: pre-line;"> Bel appartement d&#x27;angle.
      Ascenseur. <a href="/cdn-cgi/l/email-protection" class="__cf_email__">[email protected]</a> </div>
      <a href="tel:221764443313">Appeler</a>`;
    expect(parseLogerDetail(html)).toEqual({
      description: "Bel appartement d'angle.\nAscenseur.",
      rooms: null,
      bedrooms: 3,
      bathrooms: 2,
      surfaceM2: 120,
      photoCount: 3,
      locationRaw: "Mermoz, Dakar",
      sellerPhone: null,
      postedAt: new Date("2026-11-24T00:53:22.000Z"),
      lat: 14.7,
      lng: -17.47,
    });
  });
});

describe("helpers", () => {
  it("logerType maps site labels to the lab vocabulary", () => {
    expect(logerType("Appartement F4", false)).toBe("appartement");
    expect(logerType("Studio séparé", true)).toBe("appartement-meuble");
    expect(logerType("Chambre salle de bain interne", false)).toBe("chambre");
    expect(logerType("Terrain", false)).toBe("terrain");
    expect(logerType("Magasin", false)).toBe("commercial");
  });
  it("parseLogerDate", () => {
    expect(parseLogerDate("23/11/2026 à 18h45")?.toISOString()).toBe("2026-11-23T18:45:00.000Z");
    expect(parseLogerDate("n/a")).toBeNull();
  });
  it("sellerPhoneOrNull drops the platform line", () => {
    expect(sellerPhoneOrNull("+221 76 444 33 13")).toBeNull();
    expect(sellerPhoneOrNull("77 123 45 67")).toBe("221771234567");
  });
  it("pageUrl", () => {
    expect(logerSenegal.pageUrl(1)).toBe("https://logersenegal.com/annonces/");
    expect(logerSenegal.pageUrl(3)).toBe("https://logersenegal.com/annonces/?page=3");
  });
});
