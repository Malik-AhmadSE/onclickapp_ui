'use client';

import { useState } from "react";

import RecentChats from "@/garbadge/recentChat";
import ChatFiles from "@/garbadge/chatfiles";



export function RightBar() {
    const [isOpen, setIsOpen] = useState(false);
     const [isOpenChatFile, setIsOpenChatFile] = useState(false);
    return (
        <aside className="flex flex-col border-l border-[#E2E8F0] w-full h-full
    max-w-[280px]
    ">
            <div className="flex-1 border-b border-[#E2E8F0] flex flex-col min-h-0">

                <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <h1 className="font-bold 2xl:text-[18px] xl:text-[14px]">
                        Recent Chats
                    </h1>
                    <div className={`cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'
                        }`} onClick={() => setIsOpen(!isOpen)}>
                        <img src="/recent-chat-arrow.svg" alt="" />
                    </div>
                </div>

                {isOpen && (
                    <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
                        {RecentChats.map((chat, index) => (
                            <div key={index} className="py-4 px-3">
                                <div className="flex items-center gap-4 min-w-0">
                                    <p className="flex-1 min-w-0 line-clamp-1 text-[10px] xl:text-[13px] 2xl:text-[15px]">
                                        {chat.title}
                                    </p>
                                    <p className="shrink-0 text-[#94A3B8] text-[12px] tracking-wider">
                                        {chat.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className="flex-1 border-b border-[#E2E8F0] flex flex-col min-h-0">

                <div className="flex items-center justify-between px-6 py-4 shrink-0">
                    <h1 className="font-bold 2xl:text-[18px] xl:text-[14px]">All Files from the Chat</h1>
                    <div className={`cursor-pointer transform transition-transform duration-300 ${isOpenChatFile ? 'rotate-0' : 'rotate-180'
                        }`} onClick={() => setIsOpenChatFile(!isOpenChatFile)}>
                        <img src="/recent-chat-arrow.svg" alt="" />
                    </div>
                </div>

               {
                isOpenChatFile && (
                     <div className="flex-1 overflow-y-auto w-full flex flex-col scrollbar-hide">
                    {ChatFiles.map((chat, index) => (

                        <div key={index} className="flex items-center py-[16px] px-3 gap-8">
                            <img src="/documentcode.svg" alt="" />
                            <div>
                                <p className="flex-1 min-w-0 line-clamp-1 text-[10px] xl:text-[13px] 2xl:text-[15px] ">
                                    {chat.title}
                                </p>
                                <p className="text-[#94A3B8]  2xl:text-[14px] text-[12px] tracking-wider">
                                    {chat.size}
                                </p>
                            </div>
                            <img src="/iconsax.svg" alt="" />

                        </div>
                    ))}
                </div>
                )
               }

            </div>

        </aside>
    )
}