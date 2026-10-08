import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";

export default async function ConnexionPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/espace/agent");
  }

  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <h1 className="text-3xl font-semibold tracking-tight">Connexion</h1>
      <p className="mt-2 mb-8 text-[var(--color-muted)]">
        Accès réservé aux agents, OD et admins.
      </p>
      <LoginForm />
    </div>
  );
}
