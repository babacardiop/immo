import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisitRequestForm } from "./visit-request-form";

vi.mock("@/app/actions/visits", () => ({
  submitVisitRequestAction: vi.fn(),
}));

describe("VisitRequestForm", () => {
  it("shows visit CTA without account promise", () => {
    render(<VisitRequestForm listingId="listing1" />);
    expect(
      screen.getByRole("button", { name: /demander une visite/i }),
    ).toBeTruthy();
    expect(screen.getByLabelText(/créneau/i)).toBeTruthy();
  });
});
