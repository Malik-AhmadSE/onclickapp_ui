"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="">
     
        <SidebarMenu className="flex flex-col gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="w-[217px] h-[44px] pt-[12px] pb-[12px] pl-[12px] pr-[8px] rounded-[8px] gap-2.5 hover:bg-[#AEE485] hover:text-black" tooltip={item.title}>
                <img
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                />
                <h1 className="text-[16px] font-medium ">{item.title}</h1>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
