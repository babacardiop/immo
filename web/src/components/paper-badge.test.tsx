import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PaperBadge } from "@/components/paper-badge";

describe("PaperBadge", () => {
  it("renders TF label", () => {
    render(<PaperBadge type="TF" />);
    expect(screen.getByText(/titre foncier/i)).toBeInTheDocument();
  });

  it("renders missing paper state", () => {
    render(<PaperBadge type={null} />);
    expect(screen.getByText(/papier manquant/i)).toBeInTheDocument();
  });
});
