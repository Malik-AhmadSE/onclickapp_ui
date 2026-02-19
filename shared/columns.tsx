

import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Date & Time",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "file",
    header: "File/Subject",
  },
   {
    accessorKey: "items",
    header: "Items",
  },
   {
    accessorKey: "status",
    header: "Status",
  },
   {
    accessorKey: "action",
    header: "Action",
   
  },
]