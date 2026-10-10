import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppCta({
  text,
  phoneE164,
  label = "WhatsApp",
  className = "",
}: {
  text: string;
  phoneE164?: string | null;
  label?: string;
  className?: string;
}) {
  const href = buildWhatsAppLink({ phoneE164, text });
  if (!href) {
    return (
      <span className="text-sm text-[var(--color-muted)]">
        WhatsApp bientôt disponible
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex rounded-[var(--radius-pill)] bg-[var(--color-sage)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:opacity-90 ${className}`}
    >
      {label}
    </a>
  );
}
