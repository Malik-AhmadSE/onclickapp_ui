import { Toaster } from "sonner";

export default function AppToaster() {
    return (
        <Toaster
            position="bottom-right"
            richColors
            duration={1000}
            expand={true}
        />
    );
}
