/**
 * Phone normalisation so the same owner matches across sources and formats.
 * Numbers are stored in clear in the lab DB (product decision 24/11/2026,
 * CDP compliance pending) and must never be sent to the hub.
 */

/** Digits-only E.164 without "+". Senegal local numbers get the 221 prefix. */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let d: string;
  try {
    d = decodeURIComponent(raw);
  } catch {
    d = raw;
  }
  d = d.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("00")) d = d.slice(2);
  d = d.replace(/\D/g, "");
  if (/^[37]\d{8}$/.test(d)) d = `221${d}`; // 77 123 45 67 / 33 8xx xx xx
  if (d.length < 8 || d.length > 15) return null;
  return d;
}

/** "221771234567" → "+221 77 123 45 67" for display. */
export function formatPhone(n: string | null | undefined): string {
  if (!n) return "—";
  const m = n.match(/^221(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return m ? `+221 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${n}`;
}
