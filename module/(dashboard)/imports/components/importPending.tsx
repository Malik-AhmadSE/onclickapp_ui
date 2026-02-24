"use client"
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { Button } from "@/shared/ui/button"
import columns from "./columns"
import MainTable from "@/shared/mainTable"

import HistoryData from "@/garbadge/historyData"
import BaseInput from "@/shared/core/baseInput"



export function ImportPending() {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")

  
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
          <BaseInput
            id=""
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            leftIcon = {"./search-02.svg"}
          />
          <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center"
          >
            <img className="" src="refresh-12.svg" alt="" />
          </Button>
          <Button variant="outline"
          >See All</Button>
        </div>
      </div>

     <MainTable table={table}/>
    </div>
  )
}
