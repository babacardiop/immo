import { LoginForm } from "./login-form";

export const metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <div className="rounded-3xl bg-[var(--color-surface)] p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">EverGreen</p>
        <h1 className="mb-1 text-2xl font-bold">Research Lab</h1>
        <p className="mb-6 text-sm text-[var(--color-muted)]">
          Mêmes identifiants que le hub. Accès réservé (ADMIN, RESEARCH_LAB ou accès Lab activé).
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
