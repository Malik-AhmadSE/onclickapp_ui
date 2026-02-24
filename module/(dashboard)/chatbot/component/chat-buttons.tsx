import ChatButtonsData from "@/data/chatButtons"

export function ChatButtons() {
    return (
        <div className="flex items-center gap-10 justify-center mx-6 ">
            {ChatButtonsData.map((button, index) => (
                <div key={index} className=" flex items-center gap-4 border border-[#CBD5E1] rounded-full px-4 py-2 bg-white">
                    <img src={button.icon} className="shrink-0" alt="" />
                    <p className=" font-medium  xl:text-[12px]  text-[8px]">{button.title}</p>
                </div>
            ))}
        </div>
    )
}