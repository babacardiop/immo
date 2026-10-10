import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomeFaq } from "./home-faq";

describe("HomeFaq", () => {
  it("expands and collapses accordion items", async () => {
    const user = userEvent.setup();
    render(<HomeFaq />);
    const first = screen.getByRole("button", {
      name: /quels types de biens/i,
    });
    expect(first).toHaveAttribute("aria-expanded", "true");
    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
    const second = screen.getByRole("button", {
      name: /bon investissement/i,
    });
    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
