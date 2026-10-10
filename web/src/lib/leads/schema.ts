import { z } from "zod";

export const LEAD_INTENTS = [
  "buy",
  "rent",
  "sell",
  "manage",
  "diaspora",
  "other",
] as const;

export type LeadIntent = (typeof LEAD_INTENTS)[number];

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Téléphone trop court")
  .max(20)
  .regex(/^[+\d\s().-]{8,20}$/, "Téléphone invalide");

export const publicLeadFormSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    phone: phoneSchema,
    email: z
      .string()
      .trim()
      .email("Email invalide")
      .max(200)
      .optional()
      .or(z.literal("")),
    intent: z.enum(LEAD_INTENTS).default("other"),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    consentContact: z.coerce.boolean(),
    listingId: z.string().trim().max(40).optional().or(z.literal("")),
    sourceDetail: z.string().trim().max(80).optional().or(z.literal("")),
    /** Honeypot — must stay empty. */
    website: z.string().max(0).optional().or(z.literal("")),
    utmSource: z.string().trim().max(80).optional().or(z.literal("")),
    utmMedium: z.string().trim().max(80).optional().or(z.literal("")),
    utmCampaign: z.string().trim().max(80).optional().or(z.literal("")),
  })
  .superRefine((val, ctx) => {
    if (!val.consentContact) {
      ctx.addIssue({
        code: "custom",
        path: ["consentContact"],
        message: "Consentement requis pour vous recontacter",
      });
    }
  });

export type PublicLeadFormInput = z.infer<typeof publicLeadFormSchema>;

export const leadNoteSchema = z.object({
  body: z.string().trim().min(1).max(4000),
});

export const leadStageSchema = z.object({
  stage: z.enum([
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "VISIT",
    "OFFER",
    "WON",
    "LOST",
    "NURTURE",
  ]),
});
