import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Order" />
    ),
    cell: ({ row }) => <span className="font-medium">#{row.getValue("orderId")}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      return <div className="font-medium">${amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      return (
        <Badge variant={status === "Paid" ? "success" : "warning"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => `${row.getValue("items")} items`,
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("orderStatus") as string;
      return (
        <Badge
          variant={
            status === "Delivered"
              ? "default"
              : status === "Shipped"
              ? "secondary"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];