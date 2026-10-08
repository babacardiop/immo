import { auth } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default async function AgentHomePage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Espace agent</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Placeholder S00 — le back-office listings arrive en S01.
      </p>
      <dl className="mt-8 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="text-[var(--color-muted)]">Email</dt>
          <dd>{session?.user?.email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-[var(--color-muted)]">Rôle</dt>
          <dd>{session?.user?.role}</dd>
        </div>
      </dl>
      <form action={logoutAction} className="mt-8">
        <Button type="submit" variant="ghost">
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}
