import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/home/home-premier", () => ({
  HomePremier: () => <div data-testid="premier">premier</div>,
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={typeof props.src === "string" ? props.src : ""} />
  ),
}));

import Home from "@/app/page";

describe("Home", () => {
  it("renders mockup section landmarks", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: /construisez votre avenir/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /questions fréquentes/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /prêt à concrétiser/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("premier")).toBeInTheDocument();
  });
});
