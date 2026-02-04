export const loginConstants = {
    defaultCallbackUrl: "/chatbot",
    authProvider: "credentials",
    errorMessage: "Invalid email or password",
};

export const LOGIN_INITIAL_STATE = {
    email: "",
    password: "",
};

export const AUTH_ERRORS = {
    VALIDATION_FAILED: "Please check your inputs",
    INVALID_CREDENTIALS: "The email or password you entered is incorrect",
    SERVER_ERROR: "Something went wrong on our end. Please try again later",
    NETWORK_ERROR: "Please check your internet connection",
    UNKNOWN: "An unexpected error occurred",
};

export const AUTH_SUCCESS = {
    LOGIN_SUCCESS: "Successfully logged in",
    LOGIN_REDIRECT: "Redirecting to dashboard...",
};

export const LOGIN_REDIRECT_DELAY = 1000;
