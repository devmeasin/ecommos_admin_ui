import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/http/api";
import { getStatusVariant } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import React from "react";
import { OrderQueryParams, OrdersResponse } from "../OrderD2/types";
import { OrderTableSkeleton } from "./OrderTableSkeleton";

const ORDER_STATUSES = [
  "ALL",
  "PENDING",
  "APPROVED",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
  "RETURNED",
  "CANCELLED",
] as const;

interface Order {
  id: string;
  status: string;
  amount: string;
  updatedAt: string;
  selected?: boolean;
}

const fetchOrders = async (params: OrderQueryParams): Promise<OrdersResponse> => {
  try {
    const { data } = await getAllOrders({
      page: params.page || 1,
      limit: params.limit || 20,
      status: params.status || "",
      search: params.search || "",
      from: params.from || "",
      to: params.to || "",
      sortBy: params.sortBy || "",
      sortOrder: params.sortOrder || "",
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch orders", error);
    throw error;
  }
};

const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleOrderClick(row.getValue("id"))}
      >
        <span className="font-medium">#{row.getValue("id")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex w-full items-center">
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ row }) => (
      <div className="flex w-[150px] items-center">
        {new Date(row.getValue("updatedAt")).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="font-medium">${amount.toFixed(2)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function OrderTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [viewState, setViewState] = React.useState({
    page: 1,
    statusFilter: "ALL",
  });

  const { data: ordersData, isLoading } = useQuery<OrdersResponse>({
    queryKey: ["orders", viewState.page, viewState.statusFilter],
    queryFn: () =>
      fetchOrders({
        page: viewState.page,
        limit: 20,
        status: viewState.statusFilter === "ALL" ? "" : viewState.statusFilter,
      }),
  });

  const table = useReactTable({
    data: ordersData?.data ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <OrderTableSkeleton />;

  return (
    <div>
      <DataTableToolbar table={table} />
      <ScrollArea>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
}


export default OrderTable