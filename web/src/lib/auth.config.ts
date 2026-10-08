import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/espace/connexion",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isProtected =
        pathname.startsWith("/espace") &&
        !pathname.startsWith("/espace/connexion");

      if (isProtected) return !!auth?.user;
      return true;
    },
  },
} satisfies NextAuthConfig;
