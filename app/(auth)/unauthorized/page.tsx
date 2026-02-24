"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface RoleBasedProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

// Component that renders children only if user has allowed role
export function RoleBased({ children, allowedRoles, fallback }: RoleBasedProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return fallback || null;
  }

  return <>{children}</>;
}

// Unauthorized access page
export default function UnauthorizedPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page.
          </p>
          {session?.user?.role && (
            <p className="text-sm text-gray-500 mb-4">
              Your role: <span className="font-medium capitalize">{session.user.role}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-3">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Home
          </Link>
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in with different account
          </Link>
        </div>
      </div>
    </div>
  );
}
