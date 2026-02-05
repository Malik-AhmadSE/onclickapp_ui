import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

// Public routes that don't require authentication
const PUBLIC_PATHS = ["/login", "/register", "/api/auth", "/_next", "/favicon.ico", "/unauthorized"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

// Enterprise-level route protection middleware
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Allow public routes
    if (isPublicPath(path)) {
      return NextResponse.next();
    }

    // If no token, redirect to login (this handles the case when authorized callback allowed but no token)
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      loginUrl.searchParams.set("error", "SessionExpired");
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const userRole = (token.role as string) || "user";

    // Admin-only routes
    if (path.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Manager and above routes
    if (path.startsWith("/manager") && !["admin", "manager"].includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
    );

    return response;
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Allow public routes without token check
        if (isPublicPath(req.nextUrl.pathname)) {
          return true;
        }
        // Require token for protected routes
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

function isTokenExpired(token: any): boolean {
  if (!token.exp) return false;
  const expirationTime = token.exp * 1000;
  return Date.now() >= expirationTime;
}

// Match all routes except static files and common public assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
