"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { TOKEN_CONSTANTS, shouldRefreshToken } from "@/shared/utils/token.utils";

export function useAuth(requiredRole?: string) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const lastRefreshRef = useRef<number>(0);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  const hasRole = useCallback(
    (role: string): boolean => {
      if (!session?.user?.role) return false;

      const roleHierarchy: Record<string, number> = {
        user: 1,
        manager: 2,
        admin: 3,
        superadmin: 4,
      };

      const userLevel = roleHierarchy[session.user.role] || 0;
      const requiredLevel = roleHierarchy[role] || 0;

      return userLevel >= requiredLevel;
    },
    [session?.user?.role]
  );

  // Debounced session refresh
  const refreshSession = useCallback(async () => {
    const now = Date.now();
    // Debounce: only refresh if at least 1 second since last refresh
    if (now - lastRefreshRef.current < TOKEN_CONSTANTS.FOCUS_DEBOUNCE_MS) {
      return;
    }

    lastRefreshRef.current = now;
    try {
      await update();
      console.log("[Auth] Session refreshed successfully");
    } catch (error) {
      console.error("[Auth] Failed to refresh session:", error);
      // On refresh failure, redirect to login
      router.push("/login");
    }
  }, [update, router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/login");
    }
  }, [isUnauthenticated, router]);

  // Redirect to unauthorized if role check fails
  useEffect(() => {
    if (isAuthenticated && requiredRole && !hasRole(requiredRole)) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, requiredRole, hasRole, router]);

  // Periodic session refresh (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshSession();
    }, TOKEN_CONSTANTS.REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshSession]);

  // Activity-based refresh: refresh on window focus
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleFocus = () => {
      // Refresh session when user returns to the app
      console.log("[Auth] Window focused, refreshing session...");
      refreshSession();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("[Auth] Tab visible, refreshing session...");
        refreshSession();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, refreshSession]);

  // Proactive refresh: check if token is expiring soon
  useEffect(() => {
    if (!isAuthenticated || !session) return;

    if (shouldRefreshToken(session)) {
      console.log("[Auth] Token expiring soon, refreshing proactively...");
      refreshSession();
    }
  }, [isAuthenticated, session, refreshSession]);

  return {
    user: session?.user,
    isLoading,
    isAuthenticated,
    isUnauthenticated,
    hasRole,
    signIn,
    signOut: () => signOut({ callbackUrl: "/login" }),
    refreshSession,
  };
}

// Hook for protected API calls with automatic token refresh
export function useProtectedApi() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (status !== "authenticated") {
        throw new Error("Not authenticated");
      }

      const headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });

      if (response.status === 401) {
        // Token expired, try to refresh first
        console.log("[Auth] 401 received, attempting session refresh...");
        try {
          await update();
          // Retry the request after refresh
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: "include",
          });
          if (retryResponse.status === 401) {
            // Still unauthorized after refresh, redirect to login
            router.push("/login");
            throw new Error("Session expired");
          }
          return retryResponse;
        } catch {
          router.push("/login");
          throw new Error("Session expired");
        }
      }

      if (response.status === 403) {
        throw new Error("Insufficient permissions");
      }

      return response;
    },
    [status, update, router]
  );

  return { fetchWithAuth };
}
