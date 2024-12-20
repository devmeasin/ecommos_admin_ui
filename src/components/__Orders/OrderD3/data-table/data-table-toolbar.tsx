"use client"

import * as React from "react"
import type { DataTableFilterField } from "@/types"
import type { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  /**
   * An array of filter field configurations for the data table.
   * When options are provided, a faceted filter is rendered.
   * Otherwise, a search filter is rendered.
   *
   * @example
   * const filterFields = [
   *   {
   *     id: 'name',
   *     label: 'Name',
   *     placeholder: 'Filter by name...'
   *   },
   *   {
   *     id: 'status',
   *     label: 'Status',
   *     options: [
   *       { label: 'Active', value: 'active', icon: ActiveIcon, count: 10 },
   *       { label: 'Inactive', value: 'inactive', icon: InactiveIcon, count: 5 }
   *     ]
   *   }
   * ]
   */
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-wrap items-center gap-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-[250px]"
        />
        
        <div className="flex flex-wrap gap-2">
          {filterFields.map((field) => (
            <DataTableFacetedFilter
              key={String(field.id)}
              column={table.getColumn(String(field.id))}
              title={field.label}
              options={field.options ?? []}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}