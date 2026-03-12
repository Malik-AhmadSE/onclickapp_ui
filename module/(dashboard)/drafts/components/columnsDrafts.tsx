"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/shared/ui/checkbox"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useRouter } from "next/navigation"



type History = {
  date: string
  source: string
  file: string
  items: string
  status: string
}
const columns: ColumnDef<History>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllRowsSelected(!!value)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: "Date & Time",
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) =>{
        const source = row.original.source
        if(source==="Upload"){
          return(
            <div className="flex gap-2">
              <img src="/upload-2.svg" alt="" />
              <p>{source}</p>
            </div>
          )
        }
        else if(source==="QuickBook"){
          return(
            <div className="flex gap-2">
              <img src="/quick-2.svg" alt="" />
              <p>{source}</p>
            </div>
          )
        }
      },
    },
    {
      accessorKey: "file",
      header: "File",
    },
    {
      accessorKey: "items",
      header: "Items",
    },
    {
      accessorKey: "status",
      header: "Confidence",
      cell: ({ row }) => {
        const status = row.original.status

        return (
          <Badge
            className={
              status === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : status === "High"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions", // important: use id instead of accessorKey
      header: "Action",
      cell: ({ row }) => {
        const router = useRouter()
const handelRoute = () =>{
   router.push("/drafts/transactions")
    
}
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handelRoute}
          >
           <div className="text-[#999999] text-[12px]">
             Review Doc
           </div>
          </Button>
        )
      },
    },
  ]

  export default columns