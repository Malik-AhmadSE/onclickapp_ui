import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function MassageBox(){
    return(
        
            <div className="rounded-2xl bg-white shadow-2xl w-[751px] h-[150px] p-4">
         <div>
             <Textarea
                placeholder="Type your message..."
                rows={1}
                className=" max-h-3  resize-none w-full border-none px-3 py-2 text-sm mb-2 "
              />
              <div className="flex items-center justify-end gap-2.5">
               
              <div className=" rounded-full w-[40px] h-[40px] flex justify-center items-center border border-[#CBD5E1]">
                <img src="/emoji.svg" alt="" />
              </div>
              <div className=" rounded-full w-[40px] h-[40px] flex justify-center items-center border border-[#CBD5E1]">
                <img src="/voice.svg" alt="" />
              </div>
               <Button className="bg-[#AEE485] rounded-3xl">
                Send
                <img src="/send-icon.svg" alt="" />
              </Button>
             
              </div>
   
       
        </div>
        </div>
    )
}