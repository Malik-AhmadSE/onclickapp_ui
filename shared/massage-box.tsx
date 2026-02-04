import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function MassageBox() {
  return (
    <div className=" rounded-2xl bg-white shadow-xl  p-4 border border-[#E2E8F0] mb-6 mx-4">
      <div>
        
          <div className="flex gap-1 xl:max-w-[750px] lg:max-w-[600px] md:max-w-[300] mb-2">
            
            <div>
                <img src="/Paperclip.svg" alt=""  />
            </div>
            
            <Textarea
            placeholder="Message..."
            rows={5}
            className="  p-0 w-full min-w-0 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-[#475569] placeholder:text-[16px] "
          />
          </div>
       
        <div className="flex items-center justify-end gap-2.5">
          <div className=" rounded-full 2xl:h-[40px] xl:w-[35px] xl:h-[35px] w-[30px] h-[30px] flex justify-center items-center border border-[#CBD5E1]">
            <img src="/emoji.svg" alt="" />
          </div>
          <div className=" rounded-full 2xl:w-[40px] 2xl:h-[40px] xl:w-[35px] xl:h-[35px] w-[30px] h-[30px] flex justify-center items-center border border-[#CBD5E1]">
            <img src="/voice.svg" alt="" />
          </div>
          <Button className="bg-[#AEE485] rounded-3xl text-black hover:bg-[#85df41]">
            Send
            <img src="/send-icon.svg" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}
