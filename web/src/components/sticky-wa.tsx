"use client";

import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function StickyWa() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/espace")) return null;

  const href = buildWhatsAppLink({
    text: "Bonjour EverGreen, je souhaite être accompagné.",
  });
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-md bg-[var(--color-sage)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] shadow-md hover:opacity-90 sm:bottom-6 sm:right-6"
      aria-label="Contacter EverGreen sur WhatsApp"
    >
      WhatsApp
    </a>
  );
}
