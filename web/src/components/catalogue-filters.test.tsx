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
    cities: [
      { name: "Dakar", region: "Dakar" },
      { name: "Mbour", region: "Thiès" },
    ],
    quartiers: [
      {
        name: "Almadies",
        city: "Dakar",
        region: "Dakar",
      },
      {
        name: "Cité Djily Mbaye",
        city: "Dakar",
        region: "Dakar",
        aliases: ["djily"],
      },
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

  it("suggests city with region and quartier hierarchy after typing", async () => {
    const user = userEvent.setup();
    render(<CatalogueFilters channel="acheter" />);

    const city = screen.getByLabelText(/^ville$/i);
    await user.type(city, "Mb");
    expect(await screen.findByRole("listbox")).toHaveTextContent(
      /mbour · thiès/i,
    );

    // Clear partial city so quartier search is not scoped to "Mb".
    await user.clear(city);

    const quartier = screen.getByLabelText(/^quartier$/i);
    await user.clear(quartier);
    await user.type(quartier, "dj");
    expect(await screen.findByRole("listbox")).toHaveTextContent(
      /cité djily mbaye · dakar/i,
    );
  });

  it("resets filters", async () => {
    const user = userEvent.setup();
    render(<CatalogueFilters channel="louer" />);
    await user.click(screen.getByRole("button", { name: /réinitialiser/i }));
    expect(push).toHaveBeenCalledWith("/louer");
  });
});
