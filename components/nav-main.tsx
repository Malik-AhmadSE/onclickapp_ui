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
     
        <SidebarMenu className="flex flex-col gap-2 2xl:w-[225px] w-[200px]">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className=" h-11 pt-3 pb-3 pl-3 pr-2 rounded-[8px] gap-2.5 text-white  hover:text-black hover:bg-[#AEE485]  " tooltip={item.title}>
                <img
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className=" brightness-0 invert "
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
