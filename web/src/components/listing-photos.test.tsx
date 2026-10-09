import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListingPhotos } from "@/components/listing-photos";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/listings", () => ({
  uploadListingPhotosAction: vi.fn(async () => ({ ok: true, id: "1" })),
  deleteListingPhotoAction: vi.fn(async () => ({ ok: true })),
}));

afterEach(() => cleanup());

describe("ListingPhotos", () => {
  it("shows local preview after file select", async () => {
    const user = userEvent.setup();
    render(<ListingPhotos listingId="1" photos={[]} />);

    const file = new File(["fake"], "house.jpg", { type: "image/jpeg" });
    const input = screen.getByLabelText(/photos/i);
    await user.upload(input, file);

    expect(await screen.findByAltText("")).toHaveAttribute("src", "blob:mock");
    expect(screen.getByText(/0 photo/i)).toBeInTheDocument();
  });
});
