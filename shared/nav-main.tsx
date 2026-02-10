"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"

export function NavMain({
  items,
  onItemClick,
}: {
  items: {
    title: string
    url: string
    icon: string
    isActive?: boolean
  }[]
  onItemClick?: (title: string) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="">

        <SidebarMenu className="flex flex-col gap-2 z-50 2xl:w-[210px] w-[200px]">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="group/item">
              <SidebarMenuButton
                className={`h-11 pt-3 pb-3 pl-3 pr-2 rounded-[8px] gap-2.5 hover:text-black hover:bg-[#AEE485] ${item.isActive
                  ? 'bg-[#AEE485] text-black'
                  : 'text-white'
                  }`}
                tooltip={item.title}
                onClick={() => onItemClick?.(item.title)}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className={`transition-all duration-200 ${item.isActive
                    ? 'brightness-0'
                    : 'brightness-0 invert group-hover/item:brightness-0 group-hover/item:invert-0'
                    }`}
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
