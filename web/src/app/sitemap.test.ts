import { describe, expect, it } from "vitest";
import {
  listingSitemapEntries,
  staticSitemapPaths,
} from "@/lib/seo/sitemap-entries";

describe("sitemap entries", () => {
  it("includes fixed public paths", () => {
    expect(staticSitemapPaths()).toContain("/");
    expect(staticSitemapPaths()).toContain("/acheter");
    expect(staticSitemapPaths()).toContain("/louer");
  });

  it("includes published listings only", () => {
    const entries = listingSitemapEntries([
      {
        slug: "pub",
        status: "PUBLISHED",
        transaction: "SALE",
        updatedAt: new Date("2026-01-02"),
        publishedAt: new Date("2026-01-01"),
      },
      {
        slug: "draft",
        status: "DRAFT",
        transaction: "SALE",
        updatedAt: new Date(),
        publishedAt: null,
      },
      {
        slug: null,
        status: "PUBLISHED",
        transaction: "RENT",
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
    ]);

    expect(entries).toHaveLength(1);
    expect(entries[0]!.url).toContain("/acheter/pub");
  });

  it("routes rent to /louer", () => {
    const entries = listingSitemapEntries([
      {
        slug: "appart",
        status: "PUBLISHED",
        transaction: "RENT",
        updatedAt: new Date(),
        publishedAt: new Date(),
      },
    ]);
    expect(entries[0]!.url).toContain("/louer/appart");
  });
});
