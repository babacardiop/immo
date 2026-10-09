import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders soft 404 with home CTA", () => {
    render(<NotFound />);
    expect(screen.getByText(/page introuvable/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /retour à l'accueil/i }),
    ).toHaveAttribute("href", "/");
  });
});
