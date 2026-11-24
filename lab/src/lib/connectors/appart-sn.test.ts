import { describe, expect, it } from "vitest";
import { appartSn, parseAppartIndex } from "@/lib/connectors/appart-sn";

const item = (id: string, name: string, price: number, loc: string) => ({
  "@type": "ListItem",
  url: `https://www.appart.sn/${id}/annonce-x.html`,
  name,
  offers: { "@type": "Offer", price, priceCurrency: "XOF" },
  item: { "@type": "Residence", name, address: { "@type": "PostalAddress", addressLocality: loc, addressCountry: "SN" } },
});
const ld = (items: object[]) =>
  `<script type="application/ld+json">{"@type":"BreadcrumbList"}</script><script type="application/ld+json">${JSON.stringify({ "@type": "ItemList", itemListElement: items })}</script>`;

const a = "64a538f05dec85e0d95f1d11c33d91f7";
const b = "88cd9a32aaaaaaaaaaaaaaaaaaaaaaaa";
const c = "0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f";

describe("appart-sn", () => {
  it("parses the JSON-LD ItemList, dedups", () => {
    const r = parseAppartIndex(ld([item(a, "Studio meublé à Ngor", 20000, "Ngor • Dakar"), item(a, "dup", 1, "x")]), "https://www.appart.sn/location.html");
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ externalId: a, transaction: "RENT", propertyType: "appartement-meuble", priceXof: 20_000n, city: "Dakar", locationRaw: "Ngor, Dakar" });
  });
  it("vente segment: title and low price override the segment", () => {
    const r = parseAppartIndex(
      ld([item(a, "APPARTEMENT F3 À LOUER MERMOZ", 550000, "Mermoz • Dakar"), item(b, "VILLA LUXUEUSE NEUVE", 130000, "Ngaparou • Mbour"), item(c, "Villa 5 chambres", 150_000_000, "Saly • Mbour")]),
      "https://www.appart.sn/vente.html?page=2",
    );
    expect(r.map((x) => x.transaction)).toEqual(["RENT", "RENT", "SALE"]);
  });
  it("walks rent pages then sale pages", () => {
    expect(appartSn.pageUrl(1)).toBe("https://www.appart.sn/location.html");
    expect(appartSn.pageUrl(2)).toBe("https://www.appart.sn/location.html?page=2");
    expect(appartSn.pageUrl(31)).toBe("https://www.appart.sn/vente.html");
    expect(appartSn.pageUrl(61)).toContain("page=999");
  });
});
