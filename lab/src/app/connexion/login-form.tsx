"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const input =
  "rounded-lg border border-[var(--color-steel)]/50 bg-[var(--color-bg)] px-3 py-2";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input name="email" type="email" required autoComplete="username" className={input} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Mot de passe
        <input name="password" type="password" required autoComplete="current-password" className={input} />
      </label>
      {state.error ? (
        <p role="alert" className="text-sm text-[var(--color-danger)]">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--color-leaf)] px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
