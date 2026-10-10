import { describe, expect, it } from "vitest";
import {
  getHomeFaq,
  getHomeSectionOrder,
  getHomeStats,
  getHomeTestimonials,
} from "./home";

describe("home content", () => {
  it("exposes stats FAQ testimonials", () => {
    expect(getHomeStats()).toHaveLength(4);
    expect(getHomeFaq().length).toBeGreaterThanOrEqual(4);
    expect(getHomeTestimonials().length).toBeGreaterThanOrEqual(1);
  });

  it("keeps mockup section order", () => {
    expect(getHomeSectionOrder()).toEqual([
      "hero",
      "story",
      "stats",
      "discover",
      "premier",
      "faq",
      "testimonials",
      "cta",
    ]);
  });
});
