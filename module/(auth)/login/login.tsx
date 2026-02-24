'use client'

import { cn } from "@/shared/lib/utils";
import {
    FieldGroup,
} from "@/shared/ui/field";
import { useLoginForm } from "@/module/(auth)/login/hooks/useLoginForm";
import { loginPageContent } from "@/module/(auth)/login/data/login.data";
import { loginFormConfig } from "@/module/(auth)/login/data/login.data";
import LoginFormFields from "@/module/(auth)/login/components/loginFormField";
import LoginFormFooter from "@/module/(auth)/login/components/loginFormFooter";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const { formData, errors, isLoading, handleChange, handleSubmit, handleForgotPassword } =
        useLoginForm();
    const { form } = loginPageContent;

    return (
        <form onSubmit={handleSubmit} className={cn(" lg:w-132 sm:w-120 w-xs", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-3 text-center ">
                    <h1 className="text-5xl ">{form.welcomeTitle}</h1>
                    <p className="text-muted-foreground text-sm">
                        {form.welcomeDescription}
                    </p>
                </div>

                <LoginFormFields
                    fields={loginFormConfig.fields}
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                <LoginFormFooter
                    isLoading={isLoading}
                    handleForgotPassword={handleForgotPassword}
                />
            </FieldGroup>
        </form>
    );
}
