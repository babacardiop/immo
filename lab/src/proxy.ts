import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Everything except the login page and Next internals needs a lab session.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
