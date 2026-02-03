import { RightBar } from "@/components/app-rightbar"
import { AppSidebar } from "@/components/app-sidebar"
import { MessageBubble } from "@/components/message-bubble"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"



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
            <SidebarInset className="bg-[#F8F8F8]">

                <SiteHeader />


                <div className="flex gap-4 text-black">

                    <MessageBubble />

                    <RightBar />
 
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}
