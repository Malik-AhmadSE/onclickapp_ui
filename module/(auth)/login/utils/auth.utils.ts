
import { AUTH_ERRORS } from "../constants/login.constants";

export function getLoginErrorTitle(status?: number): string {
    switch (status) {
        case 400: return "Bad Request";
        case 401: return "Unauthorized";
        case 403: return "Access Denied";
        case 404: return "Not Found";
        case 500: return "Server Error";
        default: return "Login Failed";
    }
}

export function getLoginErrorMessage(status?: number, message?: string): string {
    if (message) return message;

    switch (status) {
        case 400: return AUTH_ERRORS.VALIDATION_FAILED;
        case 401: return AUTH_ERRORS.INVALID_CREDENTIALS;
        case 500: return AUTH_ERRORS.SERVER_ERROR;
        default: return AUTH_ERRORS.UNKNOWN;
    }
}

export function getRedirectPath(role?: string): string {
    // Default redirect logic based on old code usage
    if (role === 'admin') return '/admin';
    return '/chatbot';
}
