import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/featured-listings", () => ({
  FeaturedListings: () => null,
}));

import Home from "@/app/page";

describe("Home", () => {
  it("renders brand and catalogue CTAs", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /evergreen/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^acheter$/i })).toHaveAttribute(
      "href",
      "/acheter",
    );
    expect(screen.getByRole("link", { name: /^louer$/i })).toHaveAttribute(
      "href",
      "/louer",
    );
  });
});
