import type { LoginFormField } from "@/module/(auth)/login/types/login.types";

export const loginFormConfig: { fields: LoginFormField[] } = {
    fields: [
        {
            id: "email",
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            autoComplete: "email",
            required: true,
        },
        {
            id: "password",
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            autoComplete: "current-password",
            required: true,

        },


    ],
};

export const loginPageContent = {
    hero: {
        title: "Get Started with Us",
        description: "Effortless bookkeeping through smart automation.",
        imageAlt: "Login Logo",
    },
    form: {
        welcomeTitle: "Welcome",
        welcomeDescription: "Enter your email and password to access your account",
        rememberMe: "Remember me",
        forgotPassword: "Forget password?",
        signIn: "Sign In",
        signingIn: "Signing in...",
        signInGoogle: "Sign in with Google",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
    }
};
