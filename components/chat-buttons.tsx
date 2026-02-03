import ChatButtonsData from "@/data/chatButtons"

export function ChatButtons() {
    return (
        <div className="flex items-center justify-between mx-6 ">
            {ChatButtonsData.map((button, index) => (
                <div key={index} className=" flex items-center gap-4 border border-[#CBD5E1] rounded-full px-4 py-2">
                    <img src={button.icon} className="shrink-0" alt="" />
                    <p className=" flex-1 min-w-0 xl:text-[12px] 2xl:text-[14px] text-[8px]">{button.title}</p>
                </div>
            ))}
        </div>
    )
}