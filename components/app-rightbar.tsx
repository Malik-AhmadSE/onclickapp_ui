import RecentChats from "@/garbadge/recentChat";
import { Sidebar, SidebarContent, SidebarGroup } from "./ui/sidebar";


export function RightBar() {
    return (
        <aside className="h-full border-l border-[#E2E8F0] 2xl:w-[360px] xl:w-[300px] lg:w-[200px] w-[160px] mr-2">
            <div className="2xl:h-[622px] xl:h-[320px] lg:h-[300px] md:h-[250px] h-[200px] border-b border-[#E2E8F0] flex flex-col">

                <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <h1 className="font-bold 2xl:text-[18px] xl:text-[14px]">Recent Chats</h1>
                    <img src="/recent-chat-arrow.svg" alt="" />
                </div>

                <div className="flex-1 overflow-y-auto w-full">
                    {RecentChats.map((chat, index) => (
                        <div key={index} className="py-[16px] px-3 ">
                           <div className="2xl:w-[312px] w-[280px] flex items-center gap-4">
                             <p className="line-clamp-1 w-[200px] 2xl:text-[15px] xl:text-[13px] text-[10px]">
                                {chat.title}
                            </p>
                            <p className="text-[#94A3B8] 2xl:text-[14px] text-[12px] tracking-wider">
                                {chat.time}
                            </p>
                           </div>
                        </div>
                    ))}
                </div>

            </div>
             <div className="2xl:h-[622px] xl:h-[200px]  h-[180px] flex flex-col">

                <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <h1 className="font-bold 2xl:text-[18px] xl:text-[14px]">Recent Chats</h1>
                    <img src="/recent-chat-arrow.svg" alt="" />
                </div>

                <div className="flex-1 overflow-y-auto w-full">
                    {RecentChats.map((chat, index) => (
                        <div key={index} className="flex items-center py-[16px] px-3 gap-4">
                            <p className="line-clamp-1  2xl:text-[15px] xl:text-[13px] text-[10px]">
                                {chat.title}
                            </p>
                            <p className="text-[#94A3B8] 2xl:text-[14px] text-[12px] tracking-wider">
                                {chat.time}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

        </aside>
    )
}