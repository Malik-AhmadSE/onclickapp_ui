"use client"

import * as React from "react"
import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,

} from "@tabler/icons-react"

import { NavMain } from "@/shared/nav-main"


import {
  Sidebar,
  SidebarContent,

} from "@/shared/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: "/Star.svg",
    },
    {
      title: "AI ChatBot",
      url: "#",
      icon: "/chat-icon.svg",
    },
    {
      title: "Import  & Integrate",
      url: "#",
      icon: "/light.svg",
    },
    {
      title: "Drafts & Review",
      url: "#",
      icon: "/document-icon.svg",
    },
    {
      title: "Mails",
      url: "#",
      icon: "/mail-icon.svg",
    },
    {
      title: "Integrations",
      url: "#",
      icon: "/setting-icon.svg",
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="">


      <a href="#">
        <Image src="/logo.svg" alt="Logo" width={155} height={61.78} className="absolute top-[31px] left-[18px]" />
      </a>

      <SidebarContent className="relative w-[225px] h-[308px] top-[141px] left-[14px]">
        <NavMain items={data.navMain} />
      </SidebarContent>

    </Sidebar>
  )
}
