import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuartierCta } from "./quartier-cta";
import { getQuartierLanding } from "@/lib/content/quartiers";

describe("QuartierCta", () => {
  it("links to catalogue filtered by quartier", () => {
    const landing = getQuartierLanding("mermoz")!;
    render(<QuartierCta landing={landing} channel="acheter" />);
    const cta = screen.getByTestId("quartier-catalogue-cta");
    expect(cta).toHaveAttribute(
      "href",
      expect.stringContaining("/acheter?"),
    );
    expect(cta.getAttribute("href")).toContain("quartier=Mermoz");
    expect(cta.getAttribute("href")).toContain("city=Dakar");
  });
});
