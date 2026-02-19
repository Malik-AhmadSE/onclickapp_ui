"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"

import HistoryData from "@/garbadge/historyData"

type History = {
  date: string
  source: string
  file: string
  items: string
  status: string
}

export function DataTable() {
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

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
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.source}
        </Badge>
      ),
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
              status === "Pending Reviews"
                ? "bg-yellow-100 text-yellow-700"
                : status === "Completed"
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
          <Button
            variant="outline"
            size="sm"

          >
            Review Doc
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: HistoryData,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  })

  return (
    <div className="rounded-xl border bg-white p-4 space-y-4 mb-8">

      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Pending Draft</h1>
        <div className="flex gap-1 items-center">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center"
          >
            <img className="" src="refresh-12.svg" alt="" />
          </Button>
          <Button variant="outline"
          >See All</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-6"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
