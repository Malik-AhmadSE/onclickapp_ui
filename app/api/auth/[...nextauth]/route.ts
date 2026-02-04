import NextAuth from "next-auth";
import { authConfig } from "@/module/(auth)/login/lib/auth";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
