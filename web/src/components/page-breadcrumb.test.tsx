import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageBreadcrumb } from "./page-breadcrumb";

describe("PageBreadcrumb", () => {
  it("renders trail with current page", () => {
    render(
      <PageBreadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: "/guides", label: "Guides" },
          { label: "Glossaire" },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: /fil d’ariane/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^accueil$/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Glossaire")).toHaveAttribute("aria-current", "page");
  });
});
