import RecentChats from "@/garbadge/recentChat";
import { Sidebar, SidebarContent, SidebarGroup } from "./ui/sidebar";


export function RightBar() {
    return (
        <aside className="h-full border-l border-[#E2E8F0] xl:w-[360px] lg:w-[260px] md:w-[200px] w-[160px]">
            <div className="2xl:h-[622px] xl:h-[350px] lg:h-[300px] md:h-[250px] h-[200px] border-b border-[#E2E8F0] flex flex-col">

                <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <h1 className="font-bold text-[18px]">Recent Chats</h1>
                    <img src="/recent-chat-arrow.svg" alt="" />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {RecentChats.map((chat, index) => (
                        <div key={index} className="flex items-center py-[16px] px-[24px] gap-4">
                            <p className="line-clamp-1 w-[246px] text-[15px]">
                                {chat.title}
                            </p>
                            <p className="text-[#94A3B8] text-[14px] tracking-wider">
                                {chat.time}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="border-b xl:h-[300px]">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="font-bold text-[18px]">All Files from the Chat</h1>
                    <img src="/recent-chat-arrow.svg" alt="" />
                </div>
                {
                    RecentChats.slice(0, 3).map((chat, index) => (
                        <div key={index} className="flex items-center py-[16px] px-[24px]  gap-4">
                            <p className=" line-clamp-1 w-[246px] text-[15px]">{chat.title}</p>
                            <p className="text-[#94A3B8] text-[14px] letter-spacing-[2px] ">{chat.time}</p>
                        </div>
                    ))
                }
            </div>

        </aside>
    )
}