"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

// Enterprise-level auth hook with role checking
export function useAuth(requiredRole?: string) {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  // Check if user has required role
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

  // Refresh session periodically (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      update();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, update]);

  return {
    user: session?.user,
    isLoading,
    isAuthenticated,
    isUnauthenticated,
    hasRole,
    signIn,
    signOut: () => signOut({ callbackUrl: "/login" }),
    refreshSession: update,
  };
}

// Hook for protected API calls with automatic token refresh
export function useProtectedApi() {
  const { data: session, status } = useSession();

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
        // Token expired, redirect to login
        window.location.href = "/login";
        throw new Error("Session expired");
      }

      if (response.status === 403) {
        throw new Error("Insufficient permissions");
      }

      return response;
    },
    [status]
  );

  return { fetchWithAuth };
}
