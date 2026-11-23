import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/connexion" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      if (request.nextUrl.pathname.startsWith("/connexion")) return true;
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
