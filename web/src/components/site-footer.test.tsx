import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={props.src} />
  ),
}));

describe("SiteFooter", () => {
  it("renders contact and legal links", () => {
    render(
      <ThemeProvider>
        <SiteFooter />
      </ThemeProvider>,
    );
    expect(
      screen.getByRole("link", { name: /evergreen immobilier — accueil/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /^agence$/i })).toHaveAttribute(
      "href",
      "/agence",
    );
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      "/contact",
    );
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
