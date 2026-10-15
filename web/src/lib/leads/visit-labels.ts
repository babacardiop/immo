import type { VisitSource, VisitStatus } from "@prisma/client";

export const VISIT_SOURCE_LABELS: Record<VisitSource, string> = {
  ONLINE_REQUEST: "Demande site",
  OFFLINE: "Offline",
  PHONE: "Téléphone",
  WALK_IN: "Sur place",
  WHATSAPP: "WhatsApp",
};

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  SCHEDULED: "Prévue",
  COMPLETED: "Clôturée",
  CANCELLED: "Annulée",
};
