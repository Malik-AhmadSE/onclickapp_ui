
export interface LoginFormField {
    id: string;
    label: string;
    name: keyof import("../schemas/schema").LoginValidator;
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
    fields: LoginFormField[];
    footerLinkText?: string;
}

export interface LoginError {
    status?: number;
    data?: {
        message?: string;
    };
}


export interface LoginFormFieldsProps {
    fields: LoginFormField[];
    formData: import("../schemas/schema").LoginValidator;
    errors: Partial<Record<keyof import("../schemas/schema").LoginValidator, string>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}