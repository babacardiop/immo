/** Build wa.me deep link. Phone is E.164 without + (e.g. 22177…). */
export function buildWhatsAppLink(input: {
  phoneE164?: string | null;
  text: string;
}): string | null {
  const raw = (input.phoneE164 ?? process.env.NEXT_PUBLIC_WA_E164 ?? "").trim();
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  const q = new URLSearchParams({ text: input.text });
  return `https://wa.me/${digits}?${q.toString()}`;
}

export function listingInquiryText(input: {
  title: string;
  reference?: string | null;
  url?: string | null;
}): string {
  const parts = [
    `Bonjour EverGreen, je suis intéressé(e) par : ${input.title}`,
  ];
  if (input.reference) parts.push(`Réf. ${input.reference}`);
  if (input.url) parts.push(input.url);
  return parts.join("\n");
}
