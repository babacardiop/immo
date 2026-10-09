import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WhatsAppCta } from "@/components/wa-cta";

describe("WhatsAppCta", () => {
  const prev = process.env.NEXT_PUBLIC_WA_E164;

  afterEach(() => {
    process.env.NEXT_PUBLIC_WA_E164 = prev;
  });

  it("href contains phone and text", () => {
    render(
      <WhatsAppCta
        phoneE164="221770000000"
        text="Bonjour EverGreen, je suis intéressé"
        label="Contacter sur WhatsApp"
      />,
    );
    const link = screen.getByRole("link", { name: /contacter sur whatsapp/i });
    const href = link.getAttribute("href")!;
    expect(href).toContain("https://wa.me/221770000000");
    expect(new URL(href).searchParams.get("text")).toBe(
      "Bonjour EverGreen, je suis intéressé",
    );
  });

  it("shows fallback without phone", () => {
    delete process.env.NEXT_PUBLIC_WA_E164;
    render(<WhatsAppCta text="x" phoneE164={null} />);
    expect(screen.getByText(/whatsapp bientôt disponible/i)).toBeInTheDocument();
  });
});
