import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field } from "@/shared/ui/field";
import { Loader2 } from "lucide-react";
import { loginPageContent } from "../data/login.data";
import Link from "next/link";

interface LoginFormFooterProps {
    isLoading?: boolean;
    handleForgotPassword?: () => void;
}

export default function LoginFormFooter({ isLoading, handleForgotPassword }: LoginFormFooterProps) {
    const { form } = loginPageContent;

    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Checkbox />
                    <p className="ml-2 inline-block text-sm text-[#3D3D3D]">{form.rememberMe}</p>
                </div>
                <a className="text-sm text-[#3D3D3D] hover:underline" href="#" onClick={(e) => {
                    if (handleForgotPassword) {
                        e.preventDefault();
                        handleForgotPassword();
                    }
                }}>
                    {form.forgotPassword}
                </a>
            </div>

            <Field>
                <Button type="submit" className="bg-[#AEE485] hover:bg-[#baee92] text-black" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            {form.signingIn}
                        </>
                    ) : (
                        form.signIn
                    )}
                </Button>

                <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3">
                        <path
                            fill="#4285F4"
                            d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.1h146.9c-6.3 33.9-25 62.6-53.4 81.6v67h86.4c50.5-46.5 81.6-115.1 81.6-193.6z"
                        />
                        <path
                            fill="#34A853"
                            d="M272 544.3c72.6 0 133.6-24.1 178.1-65.3l-86.4-67c-24 16.1-54.6 25.5-91.7 25.5-70.5 0-130.3-47.6-151.6-111.4H32.4v69.9C76.9 475.6 168.4 544.3 272 544.3z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M120.4 326.1c-10.4-31.4-10.4-65.5 0-96.9v-69.9H32.4c-36.4 72.7-36.4 159 0 231.7l88-64.9z"
                        />
                        <path
                            fill="#EA4335"
                            d="M272 107.7c39.5-.6 77.3 14 106.1 40.6l79.1-79.1C405.6 26.6 344.7 0 272 0 168.4 0 76.9 68.7 32.4 159.3l88 69.9C141.7 155.3 201.5 107.7 272 107.7z"
                        />
                    </svg>
                    {form.signInGoogle}
                </Button>
            </Field>
            <div className="text-center mt-8 text-sm text-muted-foreground">
                {form.noAccount}{" "}
                <Link href="/register" className="underline underline-offset-4">{form.signUp}</Link>
            </div>
        </>
    );
}
