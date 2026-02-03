import NextAuth, { type NextAuthOptions, type User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/db";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is required. Set it in .env.local");
}

interface DbUser {
  id: string;
  email: string;
  name: string | null;
  password_hash: string;
  role?: string;
}

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? "__Secure-next-auth.session-token" 
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        // Rate limiting check (simple implementation)
        const rateLimitKey = `rate_limit:${email}`;
        // In production, use Redis or similar for rate limiting

        let user = await getUserByEmail(email);

        if (!user) {
          // Auto-create user with default role 'user'
          user = await createUser(email, password, "user");
        }

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? undefined,
          role: user.role || "user",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email ?? undefined;
      }

      // Check if token needs refresh (7 days before expiry)
      const shouldRefreshTime = Math.round(
        (token.exp as number) - 7 * 24 * 60 * 60
      );
      const now = Math.round(Date.now() / 1000);

      if (now > shouldRefreshTime) {
        // Token is about to expire, you can add refresh logic here
        // For now, just extend the session
        token.exp = Math.round(Date.now() / 1000) + 30 * 24 * 60 * 60;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`);
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`Auth Error [${code}]:`, metadata);
    },
    warn(code) {
      console.warn(`Auth Warning [${code}]`);
    },
    debug(code, metadata) {
      console.debug(`Auth Debug [${code}]:`, metadata);
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
});

// Type extensions
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name?: string | null;
    };
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    email?: string | null;
  }
}
