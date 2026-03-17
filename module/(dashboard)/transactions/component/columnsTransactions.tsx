"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/shared/ui/checkbox"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { AlertDialogDelete } from "@/shared/alertDialog"


type History = {
    date: string,
    merchant: string,
    category: string,
    amount: string,
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
        accessorKey: "merchant",
        header: "Merchant",

    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.original.category

            return (
                <div className="flex items-center gap-2">
                    <img src="category-arrow.svg" alt="" />
                    {category}
                </div>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
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
            return (
                <AlertDialogDelete />
            )
        },
    },
]

export default columns