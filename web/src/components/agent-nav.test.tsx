import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AgentNav } from "@/components/agent-nav";

vi.mock("@/app/actions/auth", () => ({
  logoutAction: vi.fn(),
}));

describe("AgentNav", () => {
  it("renders dashboard and annonces links", () => {
    render(<AgentNav email="agent@evergreen.sn" />);
    expect(
      screen.getByRole("link", { name: /tableau de bord/i }),
    ).toHaveAttribute("href", "/espace/agent");
    expect(screen.getByRole("link", { name: /annonces/i })).toHaveAttribute(
      "href",
      "/espace/agent/annonces",
    );
    expect(screen.getByText("agent@evergreen.sn")).toBeInTheDocument();
  });
});
