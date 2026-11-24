import { describe, expect, it } from "vitest";
import { luxuryEstate, luxuryPrice, parseLuxuryIndex } from "@/lib/connectors/luxuryestate";

const icon = (n: string) => `<svg class="le-icon" > <use xlink:href="/sprite.svg#${n}"></use> </svg>`;
const card = (id: string, slug: string, title: string, price: string, specs: string, agency: string) => `
<li class="clearfix search-list__item collection" data-id="${id}" data-role="go-to-detail"><div class="details">
<a class="js_clickable style-button details_title" data-role="link-to-container" href="https://www.luxuryestate.com/p${id}-${slug}" target="_blank" > ${title} </a>
<div class="price style-title1"> ${price} </div><div class="specs style-body-small-strong"> ${specs} </div>
<div class="listed-by"><span class="by">Presented by</span> <span class="js_clickable" data-role="link-to-container"> ${agency} </span></div></div></li>`;

const html =
  card("133086062", "villa-for-sale-ngaparou", "Villa in Ngaparou, Région de Thiès", "€ 800,400", `${icon("size")} 1,450 m² ${icon("bath")} 4 ${icon("bed")} 5`, "Saly Immo Sénégal") +
  card("131731735", "penthouse-for-sale-dakar", "Penthouse in Dakar, Région de Dakar", "Price on Application", "", "Kalliste");

describe("luxuryestate", () => {
  it("parses cards (EUR → XOF, icon-labelled specs)", () => {
    const [a, b] = parseLuxuryIndex(html, "https://www.luxuryestate.com/senegal?pag=2");
    expect(a).toMatchObject({ externalId: "133086062", transaction: "SALE", propertyType: "villa", priceXof: 525_027_983n, surfaceM2: 1450, bedrooms: 5, city: "Ngaparou", sellerName: "Saly Immo Sénégal" });
    expect(b).toMatchObject({ propertyType: "appartement", priceXof: null, city: "Dakar" });
    expect(parseLuxuryIndex(html, "https://www.luxuryestate.com/rent/senegal")[0].transaction).toBe("RENT");
  });
  it("prices and pages", () => {
    expect(luxuryPrice("1 000 000 XOF")).toBe(1_000_000n);
    expect(luxuryEstate.pageUrl(1)).toBe("https://www.luxuryestate.com/senegal");
    expect(luxuryEstate.pageUrl(2)).toBe("https://www.luxuryestate.com/senegal?pag=2");
    expect(luxuryEstate.pageUrl(16)).toBe("https://www.luxuryestate.com/rent/senegal");
  });
});
