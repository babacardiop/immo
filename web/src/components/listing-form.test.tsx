import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListingForm } from "@/components/listing-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/app/actions/listings", () => ({
  createListingAction: vi.fn(async () => ({ ok: false, error: "x" })),
  updateListingAction: vi.fn(async () => ({ ok: false, error: "x" })),
}));

afterEach(() => cleanup());

describe("ListingForm", () => {
  it("marks core fields as required", () => {
    const { container } = render(<ListingForm />);
    const view = within(container);
    expect(view.getByLabelText(/^titre$/i)).toBeRequired();
    expect(view.getByLabelText(/référence/i)).toBeRequired();
    expect(view.getByLabelText(/prix/i)).toBeRequired();
    expect(view.getByLabelText(/^ville$/i)).toBeRequired();
    expect(view.getByLabelText(/quartier/i)).toBeRequired();
    expect(view.getByLabelText(/description/i)).toBeRequired();
    expect(
      screen.getByRole("button", { name: /créer le brouillon/i }),
    ).toBeInTheDocument();
  });
});
