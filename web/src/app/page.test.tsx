import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders without crash", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /evergreen/i }),
    ).toBeInTheDocument();
  });
});
