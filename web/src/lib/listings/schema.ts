import { z } from "zod";

export const listingFormSchema = z.object({
  title: z.string().trim().min(3).max(80),
  description: z.string().trim().min(10).max(20000),
  transaction: z.enum([
    "SALE",
    "RENT",
    "SHORT_TERM_RENT",
    "RENT_TO_OWN",
    "INSTALLMENT_SALE",
  ]),
  pricePeriod: z.enum(["MONTH", "NIGHT", "WEEK"]).optional(),
  propertyType: z.enum(["LAND", "HOUSE", "APARTMENT", "OFFICE"]),
  paperType: z
    .enum([
      "TF",
      "BAIL_EMPHYTEOTIQUE",
      "BAIL_ORDINAIRE",
      "DELIBERATION",
      "OTHER",
    ])
    .optional()
    .nullable(),
  paperVerifiedLevel: z
    .enum(["DECLARED", "DOCS_ON_FILE", "DILIGENCE_DONE"])
    .default("DECLARED"),
  deliberationDisclaimerAck: z.boolean().default(false),
  priceFcfa: z.coerce.number().int().positive(),
  areaM2: z.coerce.number().positive().optional().nullable(),
  city: z.string().trim().min(2).max(80),
  quartierLabel: z.string().trim().min(2).max(120),
  addressPublic: z.string().trim().max(200).optional().nullable(),
  reference: z.string().trim().min(3).max(40),
  mandateType: z.enum(["EXCLUSIVE", "SIMPLE"]).default("SIMPLE"),
  mandateReference: z.string().trim().max(80).optional().nullable(),
  mandateStatus: z.enum(["DRAFT", "ACTIVE", "ENDED"]).default("DRAFT"),
  nicad: z.string().trim().max(16).optional().nullable(),
  waPhone: z.string().trim().max(20).optional().nullable(),
  negotiable: z.boolean().default(false),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;
