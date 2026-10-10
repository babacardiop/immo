/**
 * Resolve CRM owner: listing agent if present, else fallback agent id (round-robin soft).
 */
export function resolveLeadAssignee(input: {
  listingAgentId?: string | null;
  fallbackAgentId?: string | null;
}): string | null {
  return input.listingAgentId ?? input.fallbackAgentId ?? null;
}
