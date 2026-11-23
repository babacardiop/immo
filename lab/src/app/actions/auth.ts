"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email et mot de passe requis." };
  try {
    await signIn("credentials", { email, password, redirectTo: "/sources" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Identifiants invalides ou accès Lab non autorisé." };
    }
    throw error;
  }
  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/connexion" });
}
