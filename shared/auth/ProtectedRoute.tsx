"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

// Enterprise-level protected route component
export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated" && requiredRole) {
      const userRole = session?.user?.role;
      const roleHierarchy: Record<string, number> = {
        user: 1,
        manager: 2,
        admin: 3,
        superadmin: 4,
      };

      const userLevel = roleHierarchy[userRole || "user"] || 0;
      const requiredLevel = roleHierarchy[requiredRole] || 0;

      if (userLevel < requiredLevel) {
        router.push("/unauthorized");
      }
    }
  }, [status, session, requiredRole, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return fallback || null;
  }

  if (status === "authenticated" && requiredRole) {
    const userRole = session?.user?.role;
    const roleHierarchy: Record<string, number> = {
      user: 1,
      manager: 2,
      admin: 3,
      superadmin: 4,
    };

    const userLevel = roleHierarchy[userRole || "user"] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    if (userLevel < requiredLevel) {
      return fallback || null;
    }
  }

  return <>{children}</>;
}
