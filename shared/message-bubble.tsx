import { ChatButtons } from "./chat-buttons";
import MassageBox from "./massage-box";
import UserData from "@/data/userData";

export function MessageBubble() {
  return (
    <div className="max-w-full h-full flex flex-col items-center justify-center ">
      <div className="flex-1 p-6 w-full overflow-y-auto flex flex-col gap-4 ">
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 rounded-full bg-[#AEE485] flex items-center justify-center text-white font-bold">AI</div>
            <div className="bg-white rounded-full border border-[#E2E8F0] p-2 ">
              <p className="text-[14px]">Hello! I’m your personal AI Assistant.</p>
            </div>
          </div>
          <div className="flex justify-end-safe gap-2 mt-4 ">
            <div className="bg-[#084F49] rounded-xl p-4 text-white max-w-103 w-full ">
              <div className="bg-[#074641] flex border border-[#075F58] p-2 rounded-lg justify-between">
                <div>
                  <p className="text-[white]">External Link Title </p>
                  <p className="text-[12px] text-[#FFFFFFA3]">External link description</p>
                </div>
                <img src="/LinkSimple.svg" alt="" />
              </div>
             <div className="mt-2 flex justify-between items-center">
               <h1 className="text-[14px]">https://www.externallink.com</h1>
               <p className="text-[10px]">01:25</p>
             </div>
            </div>
            <div>
              {
                UserData.map((user,index)=>(
                  <div key={index}>
                    <img src={user.image} alt="" />
                  </div>
                ))
              }
            </div>
            
          </div>
      </div>
      <div className=" mb-10 min-w-0 ">
        <MassageBox  />
        <ChatButtons />
      </div>
      

    </div>
  )
} 