import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MandatePdfUpload } from "@/components/mandate-pdf-upload";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/listings", () => ({
  uploadMandatePdfAction: vi.fn(),
  deleteMandatePdfAction: vi.fn(),
}));

describe("MandatePdfUpload", () => {
  it("accepts pdf only", () => {
    render(<MandatePdfUpload listingId="1" docs={[]} />);
    const input = screen.getByLabelText(/pdf mandat/i);
    expect(input).toHaveAttribute("accept", "application/pdf");
  });
});
