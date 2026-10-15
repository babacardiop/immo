import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AssignationForm } from "./assignation-form";

vi.mock("@/app/actions/assignments", () => ({
  assignPropertyRoleAction: vi.fn(),
}));

describe("AssignationForm", () => {
  it("shows candidate helper copy", () => {
    render(
      <AssignationForm listingId="l1" defaultRole="CANDIDATE" />,
    );
    expect(screen.getByText(/personnel EverGreen uniquement/i)).toBeTruthy();
  });
});
