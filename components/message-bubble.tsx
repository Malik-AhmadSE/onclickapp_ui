import { ChatButtons } from "./chat-buttons";
import MassageBox from "./massage-box";

export function MessageBubble() {
  return (
    <div className="max-w-full h-full flex flex-col justify-center items-center">
      <div className="flex-1 ">

      </div>
      <div className="w-full mb-10  ">
        <MassageBox />
        <ChatButtons />
      </div>


    </div>
  )
} 