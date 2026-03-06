'use client'

import { cn } from "@/shared/lib/utils";
import {
    FieldGroup,
} from "@/shared/ui/field";
import { useLoginForm } from "@/module/(auth)/login/hooks/useLoginForm";
import { RegisterFormConfig, RegisterPageContent } from "./data/registerData";
import { loginFormConfig } from "@/module/(auth)/login/data/login.data";
import LoginFormFields from "@/module/(auth)/login/components/loginFormField";
import RegisterFormFields from "./components/registerFormField";
import LoginFormFooter from "@/module/(auth)/login/components/loginFormFooter";
import RegisterFormFooter from "./components/registerFooter";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
   
    const { form } = RegisterPageContent;

    return (
        <form  className={cn(" lg:w-132 sm:w-120 w-xs", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center ">
                    <h1 className="text-5xl ">{form.welcomeTitle}</h1>
                    <p className="text-muted-foreground text-sm">
                        {form.welcomeDescription}
                    </p>
                </div>
                <RegisterFormFields
                    fields={RegisterFormConfig.fields}
                />
                <RegisterFormFooter/>

               
            </FieldGroup>
        </form>
    );
}
