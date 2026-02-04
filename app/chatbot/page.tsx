import { RightBar } from "@/shared/app-rightbar"
import { AppSidebar } from "@/shared/app-sidebar"
import { MessageBubble } from "@/shared/message-bubble"
import { SiteHeader } from "@/shared/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/shared/ui/sidebar"



export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset className="bg-[#F8F8F8] @container min-h-screen">

                <SiteHeader />


                <div className="flex justify-between  text-black  flex-1">

                    <div className="flex-1">
                        <MessageBubble />
                    </div>

                    <RightBar />

                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}
