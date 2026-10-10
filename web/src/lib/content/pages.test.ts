import { describe, expect, it } from "vitest";
import {
  getAgencePage,
  getGlossaire,
  getGuidePage,
  listGuidePages,
  resolveContentPage,
} from "./pages";

describe("content pages", () => {
  it("resolves agence page", () => {
    const page = resolveContentPage("agence");
    expect(page?.slug).toBe("agence");
    expect(page?.title).toMatch(/EverGreen/i);
    expect(page?.blocks.length).toBeGreaterThan(0);
  });

  it("lists guides with resolvable slugs", () => {
    const guides = listGuidePages();
    expect(guides.length).toBeGreaterThanOrEqual(2);
    for (const g of guides) {
      expect(getGuidePage(g.slug)?.title).toBe(g.title);
      expect(resolveContentPage("guide", g.slug)?.slug).toBe(g.slug);
    }
  });

  it("returns null for unknown guide", () => {
    expect(getGuidePage("inconnu-xyz")).toBeNull();
    expect(resolveContentPage("guide", "inconnu-xyz")).toBeNull();
  });

  it("exposes glossaire entries", () => {
    const entries = getGlossaire();
    expect(entries.some((e) => /titre foncier/i.test(e.term))).toBe(true);
  });

  it("matches getAgencePage helper", () => {
    expect(getAgencePage().description.length).toBeGreaterThan(20);
  });
});
