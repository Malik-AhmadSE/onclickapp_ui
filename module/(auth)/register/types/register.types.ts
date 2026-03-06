
export interface RegisterFormField {
    id: string;
    label: string;
    name: keyof import("../schemas/schema").RegisterValidator;
    type: string;
    placeholder: string;
    autoComplete: string;
    required: boolean;
    rightIcon?: string;
    leftIcon?: string;
}

export interface LoginFormConfig {
    icon: React.ReactNode;
    title: string;
    description: string;
    submitButtonText: string;
    fields: RegisterFormField[];
    footerLinkText?: string;
}

export interface LoginError {
    status?: number;
    data?: {
        message?: string;
    };
}


export interface LoginFormFieldsProps {
    fields: RegisterFormField[];
    formData: import("../schemas/schema").RegisterValidator;
    errors: Partial<Record<keyof import("../schemas/schema").RegisterValidator, string>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}