import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LeadPipeline } from "@/components/lead-pipeline";

describe("LeadPipeline", () => {
  it("renders stages for leads", () => {
    render(
      <LeadPipeline
        leads={[
          {
            id: "1",
            name: "Fatou",
            phone: "+22177",
            email: null,
            stage: "NEW",
            intent: "buy",
            createdAt: new Date(),
            slaDueAt: new Date(Date.now() + 3600_000),
            firstTouchAt: null,
            sourceDetail: "form_contact",
            listing: null,
          },
          {
            id: "2",
            name: "Ousmane",
            phone: "+22178",
            email: null,
            stage: "CONTACTED",
            intent: "rent",
            createdAt: new Date(),
            slaDueAt: new Date(),
            firstTouchAt: new Date(),
            sourceDetail: "form_fiche",
            listing: null,
          },
        ]}
      />,
    );

    const stages = screen.getAllByTestId("lead-stage");
    expect(stages).toHaveLength(2);
    expect(stages[0]).toHaveTextContent(/nouveau/i);
    expect(stages[1]).toHaveTextContent(/contacté/i);
  });

  it("shows SLA badge when overdue", () => {
    render(
      <LeadPipeline
        leads={[
          {
            id: "1",
            name: "Late",
            phone: "+22177",
            email: null,
            stage: "NEW",
            intent: null,
            createdAt: new Date(Date.now() - 48 * 3600_000),
            slaDueAt: new Date(Date.now() - 3600_000),
            firstTouchAt: null,
            sourceDetail: null,
            listing: null,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("sla-overdue")).toBeInTheDocument();
  });
});
