import * as React from "react";
import { cn } from "@/shared/lib/utils";

import { Input } from "@/shared/ui/input";

interface BaseInputProps extends React.ComponentProps<typeof Input> {
    label?: string;
    description?: string;
    errorMessage?: string | null;
    id: string;
}

export default function BaseInput({
    label,
    description,
    errorMessage,
    id,
    className,
    ...props
}: BaseInputProps) {
    const errorId = errorMessage ? `${id}-error` : undefined;
    const descId = description ? `${id}-desc` : undefined;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            )}
            <Input
                id={id}
                aria-describedby={[descId, errorId].filter(Boolean).join(" ") || undefined}
                aria-invalid={!!errorMessage}
                className={cn(className, errorMessage && "border-destructive")}
                {...props}
            />
            {description && !errorMessage && (
                <p
                    id={descId}
                    className="mt-1 text-xs text-muted-foreground"
                >
                    {description}
                </p>
            )}
            {errorMessage && (
                <p
                    id={errorId}
                    className="mt-1 text-xs text-destructive"
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
