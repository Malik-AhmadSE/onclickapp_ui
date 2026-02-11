"use client";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { ColumnMenuModule } from "ag-grid-enterprise";

// REQUIRED for 3-dot menu in v31+
ModuleRegistry.registerModules([
  AllCommunityModule,
  ColumnMenuModule,
]);

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
        columnMenu="new"   //  shows ⋮ menu
        
        defaultColDef={{
          floatingFilter: true,
          filter: true,
          resizable: true,
          sortable: true,
        }}
      />
    </div>
  );
}
