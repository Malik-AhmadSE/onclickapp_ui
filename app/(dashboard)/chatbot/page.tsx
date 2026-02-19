import { RightBar } from "../../../module/(dashboard)/chatbot/component/app-rightbar"

import { MessageBubble } from "@/shared/message-bubble"




export default function Page() {
    return (
        <>
            <div className="flex-1 flex flex-col overflow-hidden">
                <MessageBubble />
            </div>

            <RightBar />
        </>
    )
}
