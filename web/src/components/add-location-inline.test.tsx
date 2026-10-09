import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  AddLocationPanel,
  AddLocationTrigger,
} from "@/components/add-location-inline";

vi.mock("@/app/actions/locations", () => ({
  createQuartierOnTheFlyAction: vi.fn(async () => ({
    ok: true,
    city: "Dakar",
    quartier: "Cité Test",
    region: "Dakar",
  })),
}));

describe("AddLocationInline", () => {
  it("renders + trigger", () => {
    render(<AddLocationTrigger onClick={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /ajouter un quartier/i }),
    ).toBeInTheDocument();
  });

  it("submits quartier city region and calls onCreated", async () => {
    const user = userEvent.setup();
    const onCreated = vi.fn();
    const onClose = vi.fn();
    render(
      <AddLocationPanel
        initialCity="Dakar"
        initialQuartier=""
        onCreated={onCreated}
        onClose={onClose}
      />,
    );

    await user.clear(screen.getByLabelText(/^quartier$/i));
    await user.type(screen.getByLabelText(/^quartier$/i), "Cité Test");
    await user.click(screen.getByRole("button", { name: /enregistrer/i }));

    expect(onCreated).toHaveBeenCalledWith({
      city: "Dakar",
      quartier: "Cité Test",
      region: "Dakar",
    });
    expect(onClose).toHaveBeenCalled();
  });
});
