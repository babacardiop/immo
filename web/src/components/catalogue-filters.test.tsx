import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CatalogueFilters } from "@/components/catalogue-filters";

const push = vi.fn();
const get = vi.fn((_key: string) => null as string | null);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get }),
}));

vi.mock("@/hooks/use-locations", () => ({
  useLocations: () => ({
    cities: ["Dakar", "Thiès"],
    quartiers: [
      { name: "Almadies", city: "Dakar" },
      { name: "Mermoz", city: "Dakar" },
    ],
  }),
}));

describe("CatalogueFilters", () => {
  beforeEach(() => {
    push.mockReset();
    get.mockReturnValue(null);
  });

  it("updates URL query on submit", async () => {
    const user = userEvent.setup();
    render(<CatalogueFilters channel="acheter" />);

    await user.type(screen.getByLabelText(/^ville$/i), "Dakar");
    await user.type(screen.getByLabelText(/^quartier$/i), "Almadies");
    await user.click(screen.getByRole("button", { name: /filtrer/i }));

    expect(push).toHaveBeenCalled();
    const href = String(push.mock.calls[0]![0]);
    expect(href).toContain("/acheter?");
    expect(href).toContain("city=Dakar");
    expect(href).toContain("quartier=Almadies");
  });

  it("suggests quartier with city label", async () => {
    const user = userEvent.setup();
    render(<CatalogueFilters channel="acheter" />);

    const quartier = screen.getByLabelText(/^quartier$/i);
    await user.click(quartier);
    await user.type(quartier, "Alma");
    expect(
      await screen.findByRole("option", { name: /almadies · dakar/i }),
    ).toBeInTheDocument();
  });

  it("resets filters", async () => {
    const user = userEvent.setup();
    render(<CatalogueFilters channel="louer" />);
    await user.click(screen.getByRole("button", { name: /réinitialiser/i }));
    expect(push).toHaveBeenCalledWith("/louer");
  });
});
