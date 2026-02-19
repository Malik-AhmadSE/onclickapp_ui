import { DataTable } from "@/shared/data-table";
import {  columns } from "@/shared/columns";

import ImportHeader from "@/shared/importHeader";
import { ImportHistory } from "@/shared/importHistory";
import HistoryData from "../../../garbadge/historyData";


export default function Page() {
  return (
   <div className="h-auto overflow-y-auto scrollbar-hide w-full p-10 ">
       <div className="mb-10">
         <ImportHeader/>
       </div>
      <DataTable  data={HistoryData} />
      <ImportHistory columns={columns} data={HistoryData}/>
    </div>
  )
}
