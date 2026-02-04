
import { toast } from "sonner";
import {
    CheckCircle,
    XCircle,
    Info,
    AlertTriangle,
} from "lucide-react";

const baseIconClass = "w-5 h-5";

export function showSuccessToast(title: string, description?: string) {
    toast.success(title, {
        description,
        icon: <CheckCircle className={`${baseIconClass} text-green-500 animate-pulse`} />,
        duration: 4000,
    });
}

export function showErrorToast(title: string, description?: string) {
    toast.error(title, {
        description,
        icon: <XCircle className={`${baseIconClass} text-red-500 animate-bounce`} />,
        duration: 5000,
    });
}

export function showInfoToast(title: string, description?: string) {
    toast.info(title, {
        description,
        icon: <Info className={`${baseIconClass} text-blue-500 animate-ping`} />,
        duration: 4000,
    });
}

export function showWarningToast(title: string, description?: string) {
    toast.warning(title, {
        description,
        icon: <AlertTriangle className={`${baseIconClass} text-yellow-500 animate-pulse`} />,
        duration: 5000,
    });
}
