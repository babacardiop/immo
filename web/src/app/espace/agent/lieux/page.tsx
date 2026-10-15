import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isModeratorOrAbove } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import { LieuxAdmin } from "@/components/lieux-admin";

export const metadata = {
  title: "Lieux | EverGreen",
};

export default async function LieuxPage() {
  const session = await auth();
  if (!session?.user?.role || !isModeratorOrAbove(session.user.role)) {
    redirect("/espace/agent");
  }

  const [cities, communes, quartiers] = await Promise.all([
    prisma.city.findMany({
      orderBy: [{ name: "asc" }],
      include: { _count: { select: { communes: true } } },
    }),
    prisma.commune.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        city: { select: { id: true, name: true, region: true } },
        _count: { select: { quartiers: true } },
      },
    }),
    prisma.quartier.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        commune: {
          select: {
            id: true,
            name: true,
            city: { select: { id: true, name: true, region: true } },
          },
        },
      },
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Lieux</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
        Thesaurus hiérarchique région → ville → commune → quartier. Affichage
        type « Cité Djily Mbaye · Yoff · Dakar ».
      </p>
      <div className="mt-8">
        <LieuxAdmin
          cities={cities}
          communes={communes}
          quartiers={quartiers}
        />
      </div>
    </div>
  );
}
