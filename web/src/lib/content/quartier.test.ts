import { describe, expect, it } from "vitest";
import {
  getQuartierLanding,
  listQuartierLandings,
  quartierCatalogueHref,
} from "./quartiers";

describe("quartier landings", () => {
  it("seeds heart quartiers", () => {
    const slugs = listQuartierLandings().map((q) => q.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "mermoz",
        "almadies",
        "ngor",
        "sacre-coeur",
        "plateau",
      ]),
    );
  });

  it("resolves known slug case-insensitively", () => {
    expect(getQuartierLanding("Almadies")?.name).toBe("Almadies");
  });

  it("404s unknown slug", () => {
    expect(getQuartierLanding("quartier-inexistant")).toBeNull();
  });

  it("builds catalogue CTA with city + quartier filters", () => {
    const landing = getQuartierLanding("mermoz")!;
    const href = quartierCatalogueHref(landing, "acheter");
    expect(href).toContain("/acheter?");
    expect(href).toContain("city=Dakar");
    expect(href).toContain("quartier=Mermoz");
  });
});
