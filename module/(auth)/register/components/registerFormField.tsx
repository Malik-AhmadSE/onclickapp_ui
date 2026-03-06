import BaseInput from "@/shared/core/baseInput";
import type { LoginFormFieldsProps } from "../types/register.types";

export default function RegisterFormFields({
    fields,
}: LoginFormFieldsProps) {
    return (
        <div className="flex flex-col gap-3">
            {fields.map(({ id, label, type, placeholder, autoComplete, required, name ,rightIcon}) => (
                <BaseInput
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    name={name}
                    autoComplete={autoComplete}
                    className="p-3"
                    rightIcon={rightIcon}
                />
            ))}
        </div>
    );
}
