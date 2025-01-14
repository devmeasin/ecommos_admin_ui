import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import notfoundAnimationData from "@/assets/noorder.json";
import Lottie from "react-lottie-player";
import { PrimaryLoader } from "../Loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading: boolean
}

export function OrdersTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 dark:bg-gray-800">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className={`cursor-pointer transition-colors duration-150 ${rowIndex < table.getRowModel().rows.length - 1
                    ? "border-b border-dashed border-gray-300 dark:border-gray-600"
                    : ""
                    } hover:bg-gray-50 dark:hover:bg-gray-800`}
                  onClick={() => onRowClick?.(row.original as TData)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
                    >
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
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
                >

                  {isLoading ? (
                    <div className="h-[500px] flex items-center justify-center">
                      <PrimaryLoader />
                    </div>
                  ) : (
                    <div className="text-center my-20">
                      <Lottie
                        loop
                        animationData={notfoundAnimationData}
                        play
                        style={{ width: 250, height: 250, margin: "auto" }}
                      />
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-muted-foreground text-gray-900 dark:text-white sm:text-2xl">
                        🥚 No Data Found!.
                      </h3>

                      <div className="mt-10 flex items-center justify-center gap-x-6">

                      </div>
                    </div>
                  )

                  }


                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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
    </div>
  );
}
