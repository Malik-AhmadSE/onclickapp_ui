import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/shared/app-sidebar"
import { SiteHeader } from "@/shared/site-header"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 65)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset className="bg-[#F8F8F8]  flex flex-col h-screen overflow-hidden">
        <SiteHeader />

        <main className="flex justify-between text-black flex-1 overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
