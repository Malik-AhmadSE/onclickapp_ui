import { ImportPending } from "@/module/(dashboard)/imports/components/importPending";
import ImportHeader from "@/module/(dashboard)/imports/components/importHeader";
import { ImportHistory } from "@/module/(dashboard)/imports/components/importHistory";

export default function Page() {
  return (
   <div className="h-auto overflow-y-auto scrollbar-hide w-full p-10 ">
       <div className="mb-10">
         <ImportHeader/>
       </div>
      <ImportPending  />
      <ImportHistory />
    </div>
  )
}
