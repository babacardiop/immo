import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { AgentNav } from "@/components/agent-nav";

export default function AgentSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p className="text-[var(--color-muted)]">Chargement…</p>}>
      <AgentShell>{children}</AgentShell>
    </Suspense>
  );
}

async function AgentShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div>
      <AgentNav email={session?.user?.email} role={session?.user?.role} />
      {children}
    </div>
  );
}
