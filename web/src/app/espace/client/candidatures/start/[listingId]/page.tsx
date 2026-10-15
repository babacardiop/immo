import { redirect, notFound } from "next/navigation";
import { requireClient } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ensureDraftApplicationAction } from "@/app/actions/applications";

/** Creates draft application then redirects to edit page. */
export default async function StartCandidaturePage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const user = await requireClient();
  const { listingId } = await params;

  const assignment = await prisma.propertyAssignment.findFirst({
    where: {
      listingId,
      userId: user.id,
      role: "CANDIDATE",
      status: "ACTIVE",
    },
  });
  if (!assignment) notFound();

  const res = await ensureDraftApplicationAction(listingId);
  if (!res.ok || !res.id) {
    redirect("/espace/client/candidatures");
  }
  redirect(`/espace/client/candidatures/${res.id}`);
}
