import BaseInput from "@/shared/core/baseInput";
import type { LoginFormFieldsProps } from "../types/login.types";

export default function LoginFormFields({
    fields,
    formData,
    errors,
    onChange,
}: LoginFormFieldsProps) {
    return (
        <div className="flex flex-col gap-6">
            {fields.map(({ id, label, type, placeholder, autoComplete, required, name }) => (
                <BaseInput
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={onChange}
                    errorMessage={errors[name]}
                    required={required}
                    name={name}
                    autoComplete={autoComplete}
                    className="p-5"
                />
            ))}
        </div>
    );
}
