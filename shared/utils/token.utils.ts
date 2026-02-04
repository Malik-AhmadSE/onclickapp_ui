
export const TOKEN_CONSTANTS = {

    REFRESH_THRESHOLD_MS: 7 * 24 * 60 * 60 * 1000,
    REFRESH_INTERVAL_MS: 5 * 60 * 1000,
    FOCUS_DEBOUNCE_MS: 1000,
};

export function isTokenExpiringSoon(
    expiresAt: number | undefined,
    thresholdMs: number = TOKEN_CONSTANTS.REFRESH_THRESHOLD_MS
): boolean {
    if (!expiresAt) return false;

    const expiresAtMs = expiresAt * 1000; // Convert to milliseconds if in seconds
    const now = Date.now();

    return expiresAtMs - now <= thresholdMs;
}

/**
 * Check if we should trigger a token refresh
 */
export function shouldRefreshToken(session: {
    expires?: string | number;
}): boolean {
    if (!session.expires) return false;

    const expiresAt = typeof session.expires === 'string'
        ? new Date(session.expires).getTime() / 1000
        : session.expires;

    return isTokenExpiringSoon(expiresAt);
}

/**
 * Get time until token expires (in milliseconds)
 */
export function getTimeUntilExpiry(expiresAt: number | undefined): number {
    if (!expiresAt) return Infinity;

    const expiresAtMs = expiresAt * 1000;
    return Math.max(0, expiresAtMs - Date.now());
}

/**
 * Format expiry time for display
 */
export function formatExpiryTime(expiresAt: number | undefined): string {
    if (!expiresAt) return 'Unknown';

    const msUntilExpiry = getTimeUntilExpiry(expiresAt);
    const days = Math.floor(msUntilExpiry / (24 * 60 * 60 * 1000));
    const hours = Math.floor((msUntilExpiry % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Less than 1 hour';
}
