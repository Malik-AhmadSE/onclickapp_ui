import { auth } from "@/module/(auth)/login/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Enterprise-level API route protection
export async function requireAuth(
  req: NextRequest,
  allowedRoles?: string[]
): Promise<{ user: any; response?: NextResponse }> {
  const session = await auth();

  if (!session?.user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 }
      ),
    };
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = session.user.role;
    if (!allowedRoles.includes(userRole)) {
      return {
        user: null,
        response: NextResponse.json(
          { error: "Forbidden", message: "Insufficient permissions" },
          { status: 403 }
        ),
      };
    }
  }

  return { user: session.user };
}

// Helper to check specific permissions
export function hasPermission(
  userRole: string,
  requiredRole: string
): boolean {
  const roleHierarchy: Record<string, number> = {
    user: 1,
    manager: 2,
    admin: 3,
    superadmin: 4,
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

// Validate CSRF token for state-changing operations
export function validateCSRF(
  req: NextRequest,
  expectedToken: string
): boolean {
  const csrfToken = req.headers.get("x-csrf-token");
  return csrfToken === expectedToken;
}

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

// Audit logging helper
export function auditLog(
  action: string,
  userId: string,
  details: Record<string, any>
): void {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT] ${timestamp} | User: ${userId} | Action: ${action}`, details);
  // In production, send to logging service (e.g., Datadog, Splunk, ELK)
}
