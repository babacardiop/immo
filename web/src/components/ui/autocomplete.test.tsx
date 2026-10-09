import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "@/components/ui/autocomplete";

describe("Autocomplete", () => {
  it("does not open a full list on empty focus", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete
        id="city"
        name="city"
        aria-label="Ville"
        value=""
        onChange={vi.fn()}
        options={[
          { value: "Dakar", label: "Dakar" },
          { value: "Thiès", label: "Thiès" },
        ]}
      />,
    );

    await user.click(screen.getByLabelText(/^ville$/i));
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    expect(screen.getByText(/au moins 2 lettres/i)).toBeInTheDocument();
  });

  it("picks an option into the input when query is ready", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSelectOption = vi.fn();
    const { rerender } = render(
      <Autocomplete
        id="city"
        name="city"
        aria-label="Ville"
        value="Da"
        onChange={onChange}
        onSelectOption={onSelectOption}
        options={[{ value: "Dakar", label: "Dakar" }]}
      />,
    );

    await user.click(screen.getByLabelText(/^ville$/i));
    await user.click(screen.getByRole("option", { name: /^dakar$/i }));
    expect(onChange).toHaveBeenCalledWith("Dakar");
    expect(onSelectOption).toHaveBeenCalledWith({
      value: "Dakar",
      label: "Dakar",
    });

    rerender(
      <Autocomplete
        id="city"
        name="city"
        aria-label="Ville"
        value="Dakar"
        onChange={onChange}
        options={[{ value: "Dakar", label: "Dakar" }]}
      />,
    );
    expect(screen.getByLabelText(/^ville$/i)).toHaveValue("Dakar");
  });

  it("shows quartier with city in option label", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete
        id="quartier"
        name="quartier"
        aria-label="Quartier"
        value="Al"
        onChange={vi.fn()}
        options={[{ value: "Almadies", label: "Almadies · Dakar" }]}
      />,
    );
    await user.click(screen.getByLabelText(/^quartier$/i));
    expect(
      screen.getByRole("option", { name: /almadies · dakar/i }),
    ).toBeInTheDocument();
  });
});
