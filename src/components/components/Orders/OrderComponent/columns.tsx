import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID Order",
    cell: ({ row }) => <span className="font-medium">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>${row.getValue("total")}</span>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.getValue("paymentStatus") === "paid" ? "success" : "warning"}
        className="capitalize"
      >
        {row.getValue("paymentStatus")}
      </Badge>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <span>{row.getValue("items")} items</span>,
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => (
      <Badge 
        variant="outline" 
        className={`capitalize ${
          row.getValue("orderStatus") === "shipped" ? "text-blue-500" : ""
        }`}
      >
        {row.getValue("orderStatus")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
]