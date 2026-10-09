import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PublishControls } from "@/components/publish-controls";
import { publishListingAction } from "@/app/actions/listings";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/listings", () => ({
  publishListingAction: vi.fn(),
  archiveListingAction: vi.fn(),
}));

afterEach(() => cleanup());

describe("PublishControls", () => {
  it("disables publish when paper is invalid for sale", () => {
    render(
      <PublishControls
        listingId="1"
        status="DRAFT"
        transaction="SALE"
        paperType="OTHER"
        mandateStatus="DRAFT"
        photoCount={0}
      />,
    );
    expect(screen.getByRole("button", { name: /publier/i })).toBeDisabled();
    expect(screen.getByText(/publication désactivée/i)).toBeInTheDocument();
  });

  it("enables publish when TF and draft", () => {
    render(
      <PublishControls
        listingId="1"
        status="DRAFT"
        transaction="SALE"
        paperType="TF"
        mandateStatus="ACTIVE"
        photoCount={3}
      />,
    );
    expect(screen.getByRole("button", { name: /publier/i })).toBeEnabled();
  });

  it("shows error alert when publish action fails", async () => {
    const user = userEvent.setup();
    vi.mocked(publishListingAction).mockResolvedValue({
      ok: false,
      error: "Au moins 3 photos sont requises pour publier (0 actuelle(s)).",
      code: "PHOTOS",
    });

    render(
      <PublishControls
        listingId="1"
        status="DRAFT"
        transaction="SALE"
        paperType="TF"
        mandateStatus="ACTIVE"
        photoCount={0}
      />,
    );

    await user.click(screen.getByRole("button", { name: /publier/i }));
    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(/3 photos/i);
  });
});
