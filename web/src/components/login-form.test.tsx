import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/login-form";

vi.mock("@/app/actions/auth", () => ({
  loginAction: vi.fn(async () => ({
    error: "Email et mot de passe requis.",
  })),
}));

describe("LoginForm", () => {
  it("renders email, password and submit as required fields", () => {
    const { container } = render(<LoginForm />);
    const view = within(container);

    const email = view.getByLabelText(/email/i);
    const password = view.getByLabelText(/mot de passe/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email).toBeRequired();
    expect(password).toBeRequired();
    expect(
      view.getByRole("button", { name: /se connecter/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/agent@evergreen\.sn/i)).toBeTruthy();
  });
});
