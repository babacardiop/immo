import { z } from "zod";
import { RENTAL_AMENITIES } from "@/lib/listings/amenities";

const amenityIds = RENTAL_AMENITIES.map((a) => a.id) as [
  string,
  ...string[],
];

export const listingFormSchema = z
  .object({
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
    communeLabel: z.string().trim().min(2).max(120).optional().nullable(),
    quartierLabel: z.string().trim().min(2).max(120),
    addressPublic: z.string().trim().max(200).optional().nullable(),
    reference: z.string().trim().min(3).max(40),
    mandateType: z.enum(["EXCLUSIVE", "SIMPLE"]).default("SIMPLE"),
    mandateReference: z.string().trim().max(80).optional().nullable(),
    mandateStatus: z.enum(["DRAFT", "ACTIVE", "ENDED"]).default("DRAFT"),
    nicad: z.string().trim().max(16).optional().nullable(),
    waPhone: z.string().trim().max(20).optional().nullable(),
    negotiable: z.boolean().default(false),
    alsoShortTerm: z.boolean().default(false),
    shortTermPriceFcfa: z.coerce.number().int().positive().optional().nullable(),
    shortTermPricePeriod: z.enum(["MONTH", "NIGHT", "WEEK"]).optional().nullable(),
    minStayDays: z.coerce.number().int().positive().optional().nullable(),
    furnished: z.boolean().optional().nullable(),
    amenities: z.array(z.enum(amenityIds)).default([]),
  })
  .superRefine((data, ctx) => {
    const isShortOnly = data.transaction === "SHORT_TERM_RENT";
    const isDual = data.transaction === "RENT" && data.alsoShortTerm;
    const needsShort = isShortOnly || isDual;

    if (needsShort) {
      if (data.minStayDays == null || data.minStayDays < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["minStayDays"],
          message: "Séjour minimum requis pour la courte durée.",
        });
      }
      if (data.furnished == null) {
        ctx.addIssue({
          code: "custom",
          path: ["furnished"],
          message: "Indiquez si le bien est meublé.",
        });
      }
      if (data.furnished === true && data.amenities.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["amenities"],
          message: "Sélectionnez au moins une commodité.",
        });
      }
    }

    if (isDual) {
      if (data.shortTermPriceFcfa == null) {
        ctx.addIssue({
          code: "custom",
          path: ["shortTermPriceFcfa"],
          message: "Prix courte durée requis.",
        });
      }
      if (!data.shortTermPricePeriod) {
        ctx.addIssue({
          code: "custom",
          path: ["shortTermPricePeriod"],
          message: "Période courte durée requise.",
        });
      }
    }

    if (isShortOnly && !data.pricePeriod) {
      ctx.addIssue({
        code: "custom",
        path: ["pricePeriod"],
        message: "Période de tarif requise.",
      });
    }
  });

export type ListingFormValues = z.infer<typeof listingFormSchema>;
