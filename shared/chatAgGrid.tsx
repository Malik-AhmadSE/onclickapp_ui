"use client";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// ✅ REGISTER MODULES (THIS FIXES ERROR #272)
ModuleRegistry.registerModules([AllCommunityModule]);

import { ColDef } from "ag-grid-community";

type Props = {
  rowData: any[];
  columnDefs: ColDef[];
};

export default function ChatAgGrid({
  rowData,
  columnDefs,
  className,
}: Props & { className?: string }) {
  return (
    <div
      className={`${className || ""} ag-theme-alpine w-full h-full`}
      style={{ width: "100%", height: 400 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination
        paginationPageSize={10}
        animateRows
        defaultColDef={{
          floatingFilter: true,
          filter: true,
          resizable: true,
          sortable: true,
         
        }}
        suppressMenuHide={false} // optional, ensures menu is visible on hover
      />

    </div>
  );
}
