import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadForm } from "@/components/lead-form";

vi.mock("@/app/actions/leads", () => ({
  submitLeadAction: vi.fn(async () => ({ ok: true, id: "lead-1" })),
}));

describe("LeadForm", () => {
  it("validates required phone/email fields present", () => {
    render(<LeadForm />);
    expect(screen.getByLabelText(/téléphone/i)).toBeRequired();
    expect(screen.getByLabelText(/^email/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/^nom/i)).toBeRequired();
  });

  it("honeypot field present but hidden", () => {
    render(<LeadForm />);
    const pot = screen.getByLabelText(/site web/i);
    expect(pot).toBeInTheDocument();
    expect(pot.closest("[aria-hidden='true']")).toBeTruthy();
  });

  it("shows success message after submit (mock)", async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await user.type(screen.getByLabelText(/^nom/i), "Fatou Diop");
    await user.type(screen.getByLabelText(/téléphone/i), "+221770000000");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(
      await screen.findByRole("status"),
    ).toHaveTextContent(/24\s*h/i);
  });
});
