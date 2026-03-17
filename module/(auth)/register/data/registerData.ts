import { RegisterFormField } from "../types/register.types";


export const RegisterFormConfig: { fields: RegisterFormField[] } = {
    fields: [
        {
            id: "username",
            label: "User Name",
            name: "User",
            type: "text",
            placeholder: "Enter your username",
            autoComplete: "username",
            required: true,
        },
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
            rightIcon: "/eye.svg",

        },
        {
            id: "confirmedpassword",
            label: "Confirmed Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password again",
            autoComplete: "current-password",
            required: true,
            rightIcon: "/eye.svg",

        },
        


    ],}

    export const RegisterPageContent = {
    hero: {
        title: "Get Started with Us",
        description: "Effortless bookkeeping through smart automation.",
        imageAlt: "Login Logo",
    },
    form: {
        welcomeTitle: "Create Account",
        welcomeDescription: "Enter your username , email and password to create your account",
        rememberMe: "Remember me",
        forgotPassword: "Forget password?",
        signIn: "Sign Up",
        signingIn: "Signing in...",
        signInGoogle: "Sign in with Google",
        noAccount: "Already have an account?",
        signUp: "Sign In",
    }
};