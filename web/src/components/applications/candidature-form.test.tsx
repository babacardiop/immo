import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CandidatureForm } from "./candidature-form";

vi.mock("@/app/actions/applications", () => ({
  submitApplicationAction: vi.fn(),
  uploadApplicationDocAction: vi.fn(),
}));

describe("CandidatureForm", () => {
  it("shows staff-only disclaimer and disables submit until privacy checked", () => {
    render(
      <CandidatureForm
        applicationId="app1"
        listingTitle="Appart Almadies"
        requirements={[
          { code: "cni", label: "CNI", required: true, kind: "file" },
        ]}
        uploadedCodes={[]}
        completenessPct={0}
      />,
    );
    expect(screen.getByText(/uniquement au personnel EverGreen/i)).toBeTruthy();
    const submit = screen.getByRole("button", {
      name: /envoyer mon dossier/i,
    }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
  });
});
