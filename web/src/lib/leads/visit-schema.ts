import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Téléphone trop court")
  .max(20)
  .regex(/^[+\d\s().-]{8,20}$/, "Téléphone invalide");

/** Public visit request on /louer/[slug] → Lead prospect. */
export const visitRequestSchema = z
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
    preferredSlot: z.string().trim().max(200).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    consentContact: z.coerce.boolean(),
    listingId: z.string().trim().min(1).max(40),
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((val, ctx) => {
    if (!val.consentContact) {
      ctx.addIssue({
        code: "custom",
        path: ["consentContact"],
        message: "Consentement requis",
      });
    }
  });

export type VisitRequestInput = z.infer<typeof visitRequestSchema>;
