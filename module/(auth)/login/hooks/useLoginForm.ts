import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema, type LoginValidator } from "../schemas/schema";
import {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
} from "@/shared/utils/toast.utils";
import {
    AUTH_ERRORS,
    AUTH_SUCCESS,
    LOGIN_REDIRECT_DELAY,
    loginConstants,
    LOGIN_INITIAL_STATE
} from "../constants/login.constants";
import {
    getRedirectPath,
    getLoginErrorTitle,
    getLoginErrorMessage,
} from "../utils/auth.utils";

/**
 * Custom hook for login form logic
 * Handles form state, validation, submission, and error handling
 */
export const useLoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || loginConstants.defaultCallbackUrl;

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<LoginValidator>(LOGIN_INITIAL_STATE);
    const [errors, setErrors] = useState<Partial<Record<keyof LoginValidator, string>>>({});

    /**
     * Handle input field changes with real-time validation
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate the single field
        const fieldSchema = loginSchema.shape[name as keyof LoginValidator];
        const result = fieldSchema.safeParse(value);

        setErrors((prev) => ({
            ...prev,
            [name]: result.success ? undefined : result.error.issues[0].message,
        }));
    };

    /**
     * Handle form submission with validation and error handling
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const validation = loginSchema.safeParse(formData);

        if (!validation.success) {
            const flatErrors = validation.error.flatten().fieldErrors;
            setErrors({
                email: flatErrors.email?.[0],
                password: flatErrors.password?.[0],
            });
            showWarningToast(AUTH_ERRORS.VALIDATION_FAILED);
            return;
        }

        setIsLoading(true);

        try {
            // Attempt login
            const res = await signIn(loginConstants.authProvider, {
                redirect: false,
                email: formData.email,
                password: formData.password,
                callbackUrl,
            });

            if (res?.ok) {
                // Show success message
                showSuccessToast(AUTH_SUCCESS.LOGIN_SUCCESS, AUTH_SUCCESS.LOGIN_REDIRECT);

                // Redirect after delay
                setTimeout(() => {
                    // Use callbackUrl if present, otherwise default logic
                    const finalRedirect = callbackUrl !== loginConstants.defaultCallbackUrl ? callbackUrl : getRedirectPath('user');
                    router.push(finalRedirect);
                    router.refresh();
                }, LOGIN_REDIRECT_DELAY);
            } else {
                // Handle NextAuth errors (res.error, res.status)
                // Map NextAuth error to status if possible, or use status directly
                const status = res?.status || 401;
                const message = res?.error || undefined;

                const errorTitle = getLoginErrorTitle(status);
                const errorMessage = getLoginErrorMessage(status, message);

                if (status === 400) {
                    showInfoToast(errorTitle, errorMessage);
                } else if (status === 401) {
                    showErrorToast(errorTitle, errorMessage);
                } else if (status === 500) {
                    showErrorToast(errorTitle, errorMessage);
                } else {
                    showErrorToast(errorTitle, errorMessage);
                }
                setIsLoading(false);
            }

        } catch (error: any) {
            // Unexpected errors
            console.error("Login Error:", error);
            showErrorToast(AUTH_ERRORS.UNKNOWN);
            setIsLoading(false);
        }
    };

    /**
     * Navigate to forgot password page
     */
    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    /**
     * Reset form to initial state
     */
    const resetForm = () => {
        setFormData(LOGIN_INITIAL_STATE);
        setErrors({});
    };

    return {
        // State
        formData,
        errors,
        isLoading,

        // Handlers
        handleChange,
        handleSubmit,
        handleForgotPassword,
        resetForm,

        // Computed
        hasErrors: Object.values(errors).some(e => !!e),
        isFormValid: formData.email.length > 0 && formData.password.length > 0,
    };
};
