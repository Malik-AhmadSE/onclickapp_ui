import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import Link from "next/link";
import { RegisterPageContent } from "../data/registerData";

interface LoginFormFooterProps {
    isLoading?: boolean;
    handleForgotPassword?: () => void;
}

export default function RegisterFormFooter() {
    const { form } = RegisterPageContent;

    return (
        <>   
            <Field>
                <Button type="submit" className="bg-[#AEE485] hover:bg-[#baee92] text-black" >
                    {
                        form.signIn
                    }
                </Button>
            </Field>
            <div className="text-center  text-sm text-muted-foreground">
                {form.noAccount}{" "}
                <Link href="/login" className="underline underline-offset-4">{form.signUp}</Link>
            </div>
        </>
    );
}
