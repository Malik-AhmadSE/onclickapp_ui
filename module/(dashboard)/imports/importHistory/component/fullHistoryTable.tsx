"use client"
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import BaseInput from "@/shared/core/baseInput"
import { Button } from "@/shared/ui/button"
import MainTable from "@/shared/mainTable"
import HistoryData from "@/garbadge/historyData"
import columns from "../../components/columns"
import HistoryButtonData from "../data/historyButtons"
import FilterDropDown from "../../../../../shared/historyFilter"
import SelectDate from "./selectDate"
import { DropFilterData } from "../data/dropFilterData"

export function FullHistory() {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeDropFilter, setDropFilter] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // const filteredData = useMemo(() => {
  //   if (activeFilter === "All") return HistoryData
  //   return HistoryData.filter((item) => item.source === activeFilter)
  // }, [activeFilter])

  const filteredData = useMemo(() => {
    return HistoryData.filter((item) => {
      const matchesButton =
        activeFilter === "All" ? true : item.source === activeFilter
      const matchesDrop =
        activeDropFilter === "" ? true : item.status === activeDropFilter

      return matchesButton && matchesDrop
    })
  }, [activeFilter, activeDropFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      rowSelection,
      globalFilter,
      pagination
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  })

  return (
    <div className=" border bg-white p-4 space-y-4 mb-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {
            HistoryButtonData.map((item) => (
              <div key={item.id} >
                <Button
                  variant="outline"
                  onClick={() => setActiveFilter(item.title)}
                  className={`rounded-[100px] transition-all h-7 p-3 xl:text-[14px] text-[12px]  ${activeFilter === item.title
                    ? "bg-[#AEE485] text-black"
                    : "text-[#666D80]"
                    }`}
                >
                  {item.title}
                </Button>
              </div>
            ))
          }
        </div>
        <div className="flex gap-1 items-center">
          <BaseInput
            id=""
            className="xl:w-60 w-30 h-8"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            leftIcon={"../search-02.svg"}
          />
          <SelectDate />
          <div>
            <Button variant="outline" className="text-[#666D80] h-7 w-16 rounded-[4px]"
            >
              Today
            </Button>
          </div>
          <FilterDropDown setFilter={setDropFilter} data={DropFilterData} />
        </div>
      </div>
      <MainTable table={table} />
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}