import MassageBox  from "./massage-box";

export function MessageBubble() {
    return (
        <div className="2xl:w-[815px] xl:w-[745px] w-[515px] h-full flex justify-center items-end">
           <div className="2xl:w-[751px] xl:w-[600px] w-[475px] h-[230px] flex flex-col justify-between pb-6">
             <MassageBox/>
           </div>
        </div>
    )
}