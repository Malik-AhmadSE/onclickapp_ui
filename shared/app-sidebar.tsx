"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { NavMain } from "@/shared/nav-main"


import {
  Sidebar,
  SidebarContent,

} from "@/shared/ui/sidebar"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: "/Star.svg",
    },
    {
      title: "AI ChatBot",
      url: "/chatbot",
      icon: "/chat-icon.svg",
    },
    {
      title: "Import  & Integrate",
      url: "/integrate",
      icon: "/light.svg",
    },
    {
      title: "Drafts & Review",
      url: "/drafts",
      icon: "/document-icon.svg",
    },
    {
      title: "Mails",
      url: "/mails",
      icon: "/mail-icon.svg",
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: "/setting-icon.svg",
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState({})
  const router = useRouter()
  const pathname = usePathname();

  const handleItemClick = (title: string, url?: string) => {
   
    if (url && url !== "#") router.push(url)
  }

  // Map items with dynamic isActive based on state
  const navMainWithActive = data.navMain.map((item) => {
  const isRoot = item.url === "/"

  return {
    ...item,
    isActive: isRoot
      ? pathname === "/"
      : pathname.startsWith(item.url),
  }
})

  return (
    <Sidebar {...props} className="">


      <a href="#">
        <Image src="/logo.svg" alt="Logo" width={155} height={61.78} className="absolute top-[31px] left-[18px]" />
      </a>

      <SidebarContent className="relative w-[225px] h-[308px] top-[141px] left-[14px]">
        <NavMain items={navMainWithActive} onItemClick={handleItemClick} />
      </SidebarContent>

    </Sidebar>
  )
}
