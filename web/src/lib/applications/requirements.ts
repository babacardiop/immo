export type RequirementKind = "file" | "condition";

export type RequirementItem = {
  code: string;
  label: string;
  required: boolean;
  kind: RequirementKind;
};

/** Template Standard SN — pièces classiques location Dakar. */
export const TEMPLATE_STANDARD_SN: RequirementItem[] = [
  { code: "cni", label: "CNI / passeport", required: true, kind: "file" },
  {
    code: "pay_stubs_3",
    label: "3 derniers bulletins de salaire",
    required: true,
    kind: "file",
  },
  {
    code: "employer_attestation",
    label: "Attestation employeur",
    required: false,
    kind: "file",
  },
  {
    code: "guarantor_ok",
    label: "Garant identifié (si applicable)",
    required: false,
    kind: "condition",
  },
];

export const TEMPLATE_STUDIO: RequirementItem[] = [
  { code: "cni", label: "CNI / passeport", required: true, kind: "file" },
  {
    code: "pay_stubs_3",
    label: "3 derniers bulletins de salaire",
    required: true,
    kind: "file",
  },
];

export const TEMPLATE_STANDING: RequirementItem[] = [
  ...TEMPLATE_STANDARD_SN,
  {
    code: "bank_statement_3",
    label: "3 relevés bancaires",
    required: true,
    kind: "file",
  },
];

export const REQUIREMENT_TEMPLATES = {
  standard_sn: { name: "Standard SN", items: TEMPLATE_STANDARD_SN },
  studio: { name: "Studio", items: TEMPLATE_STUDIO },
  standing: { name: "Standing", items: TEMPLATE_STANDING },
} as const;

export type RequirementTemplateId = keyof typeof REQUIREMENT_TEMPLATES;

export function parseRequirementItems(json: string): RequirementItem[] {
  try {
    const raw = JSON.parse(json) as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (x): x is RequirementItem =>
        !!x &&
        typeof x === "object" &&
        typeof (x as RequirementItem).code === "string" &&
        typeof (x as RequirementItem).label === "string",
    );
  } catch {
    return [];
  }
}

export function serializeRequirementItems(items: RequirementItem[]): string {
  return JSON.stringify(items);
}

export function requiredFileCodes(items: RequirementItem[]): string[] {
  return items
    .filter((i) => i.required && i.kind === "file")
    .map((i) => i.code);
}

export function computeCompletenessPct(
  items: RequirementItem[],
  uploadedCodes: string[],
): number {
  const required = requiredFileCodes(items);
  if (required.length === 0) return 100;
  const have = new Set(uploadedCodes);
  const ok = required.filter((c) => have.has(c)).length;
  return Math.round((ok / required.length) * 100);
}
