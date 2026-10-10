import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CatalogueViewToggle } from "@/components/catalogue-view-toggle";

vi.mock("next/navigation", () => ({
  usePathname: () => "/acheter",
  useSearchParams: () =>
    new URLSearchParams("city=Dakar&quartier=Mermoz"),
}));

describe("CatalogueViewToggle", () => {
  it("links preserve filters and set view", () => {
    render(<CatalogueViewToggle active="list" />);
    const list = screen.getByRole("link", { name: /^liste$/i });
    const map = screen.getByRole("link", { name: /^carte$/i });
    expect(list.getAttribute("href")).toContain("/acheter?");
    expect(list.getAttribute("href")).toContain("city=Dakar");
    expect(list.getAttribute("href")).not.toContain("view=");
    expect(map.getAttribute("href")).toContain("view=map");
    expect(map.getAttribute("href")).toContain("city=Dakar");
  });
});
