import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("renders legal placeholder links", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /mentions/i })).toHaveAttribute(
      "href",
      "/mentions-legales",
    );
    expect(
      screen.getByRole("link", { name: /confidentialité/i }),
    ).toHaveAttribute("href", "/confidentialite");
    expect(screen.getByRole("link", { name: /cgu/i })).toHaveAttribute(
      "href",
      "/cgu",
    );
  });
});
