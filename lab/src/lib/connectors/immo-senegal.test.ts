import { describe, expect, it } from "vitest";
import { immoSenegal, parseImmoSenegalIndex } from "@/lib/connectors/immo-senegal";

const html = `
<article class="c-carte c-carte--annonce card h-100" data-contrat="location">
  <h2 class="c-carte__titre"><a href="https://www.immo-senegal.com/immobilier/bien/319/location-villa-saly-imp-aw1zstey" title="x" class="c-carte__lien">
    Villa 4 chambres avec piscine
  </a></h2>
  <div class="c-carte__tags"><span class="c-carte__tag badge">Villa</span>
  <span class="c-carte__tag c-carte__tag--lieu badge"><i class="bi bi-geo-alt me-1"></i>Saly</span></div>
  <div class="c-carte__carac"><span class="c-carte__carac-item"><i class="bi bi-aspect-ratio me-1"></i>250 m²</span>
  <span class="c-carte__carac-item"><i class="bi bi-door-open me-1"></i>4 ch.</span></div>
  <p class="c-prix__montant">2 200 000 Fcfa 🇸🇳<span class="c-prix__periode"> / mois</span></p>
</article>
<article class="c-carte c-carte--annonce card h-100" data-contrat="vente">
  <h2><a href="https://www.immo-senegal.com/immobilier/bien/314/vente-saly" class="c-carte__lien">EXTENSION SALY JOSEPH</a></h2>
  <span class="c-carte__tag c-carte__tag--lieu badge">Saly</span>
  <a href="#demande" class="c-prix__consulter">Nous consulter</a>
</article>`;

describe("immo-senegal", () => {
  it("parses cards, price on request = null", () => {
    const [a, b] = parseImmoSenegalIndex(html);
    expect(a).toMatchObject({ externalId: "319", transaction: "RENT", propertyType: "villa", priceXof: 2_200_000n, priceRaw: "2 200 000 Fcfa / mois", surfaceM2: 250, bedrooms: 4, city: "Saly" });
    expect(b).toMatchObject({ externalId: "314", transaction: "SALE", priceXof: null, city: "Saly" });
  });
  it("pages", () => {
    expect(immoSenegal.pageUrl(1)).toBe("https://www.immo-senegal.com/immobilier");
    expect(immoSenegal.pageUrl(2)).toBe("https://www.immo-senegal.com/immobilier?page=2");
  });
});
