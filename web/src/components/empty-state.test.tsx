import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders soft FR copy", () => {
    render(
      <EmptyState
        title="Aucun bien pour ces critères"
        description="Élargissez les filtres ou contactez-nous — le stock évolue chaque semaine."
        resetHref="/acheter"
      />,
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(
      screen.getByText(/aucun bien pour ces critères/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/stock évolue/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /réinitialiser/i })).toHaveAttribute(
      "href",
      "/acheter",
    );
  });
});
