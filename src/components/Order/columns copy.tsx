import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeIndianRupee, Clipboard, FilePlus2, Headset, MapPin, MapPinHouse, MoreHorizontal, NotepadText, ShoppingBag, User } from "lucide-react";
import toast from "react-hot-toast";
import OrderStatus from "../custom/OrderStatus";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatDate } from "@/utils/formatDate";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  on_hold: "bg-orange-100 text-orange-700",
  approved: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700",
  shipped: "bg-teal-100 text-teal-700",
  in_transit: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  flagged: "bg-red-100 text-red-700",
  rto: "bg-red-300 text-red-800",
  returned: "bg-pink-100 text-pink-700",
  cancelled: "bg-red-200 text-red-700",
};


const deliveryStatus: Record<string, string> = {
  "SHIPPED" : "SHIPPED",
  "DELIVERED" : "DELIVERED",
  "RETURNED" : "RETURNED",
  "IN_TRANSIT" : "IN_TRANSIT",
  "RTO" : "RTO",
};


const handleCopyPhone = (e: React.MouseEvent, phone) => {
  e.stopPropagation()
  navigator.clipboard.writeText(phone)
  toast.success("Phone number copied!")
}

const handleCall = (e: React.MouseEvent, phone) => {
  e.stopPropagation()
  window.location.href = `tel:${phone}`
}

let gobalStatus: string;


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
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Source" />
    ),
    cell: ({ row }) => {

      const { source, metadata, internalId, dates } = row.original;

      return (
        <div>
          <span className="font-medium block"># {internalId || ''}</span>
          <span className="mt-1 text-xs text-muted-foreground font-medium block">{formatDate(dates.orderDate) || ''}</span>
          <span className="flex items-center gap-2">
            <div className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles['in_transit']} capitalize my-2`}>{source}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img src="https://app.nuport.io/img/woocommerce.svg" alt="Facebook" width={30} height={30} />
                </TooltipTrigger>
                <TooltipContent>{metadata?.sourceUrl || ''}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span className="text-xs font-medium cursor-pointer border-dotted border-b-2 border-blue-600 text-muted-foreground">View Products</span>
        </div>
      )
    }
  },


  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      // console.log(row.original)
      const { dates } = row.original
      return (
        <div>
          {/* <span className="font-medium">{dates.orderDate || ''}</span> */}
          <p className="text-sm text-muted-foreground font-medium">{formatDate(dates.orderDate) || ''}</p>
        </div>
      )
    }
  },


  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const { customer, customerPhone, shippingAddress } = row.original;

      return (
        <span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="w-full sm:w-auto">
                <span className="text-sm font-medium text-blue-500 flex items-center gap-2">
                  <User className="w-4 h-4" /> {customer?.name || 'N/A'}
                </span>
                <div className="flex items-center gap-2">
                  <p
                    className="text-sm truncate flex items-center gap-2"
                    onClick={(e) => handleCall(e, customerPhone || customer?.phone || '')}
                  >
                    <Headset className="w-4 h-4" /> {customerPhone || customer?.phone || 'N/A'}
                  </p>

                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => handleCopyPhone(e, customerPhone || customer?.phone || '')}
                          >
                            <Clipboard className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy number</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <p className="text-sm truncate text-muted-foreground flex items-center gap-2">
                  <MapPinHouse className="w-4 h-4" />
                  {shippingAddress?.address || 'No Address'}
                </p>

                <div className="w-full mt-2">
                  <Progress value={70} className="[&>*]:bg-green-600 bg-red-400" />
                </div>
              </div>
            </div>
          </div>
        </span>
      );
    }
  },
  {
    accessorKey: "ProductInfo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Info" />
    ),
    cell: ({ row }) => {
      const { product } = row.original;
      return (
        <div onClick={(e) => {
          e.stopPropagation()
        }}>
          <div>
            <p className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-muted-foreground font-medium">{product?.name || ''} .1</span>
            </p>

          </div>
          <p className="text-sm truncate text-muted-foreground ">
            <span className="font-bold flex items-center gap-2"><BadgeIndianRupee className="w-4 h-4" />BDT {product?.price || ''}</span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "DeliverPartners",
    header: ({ column }) => (
      gobalStatus === deliveryStatus[gobalStatus] && <DataTableColumnHeader column={column} title="Deliver Partners" />
    ),
    cell: ({ row }) => {

      const { deliveryConsignment, status } = row.original;

      gobalStatus = status
      return (
        <div>
          {
            status == deliveryStatus[status] && (
              <div>

                <span className="flex items-center gap-2">

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img src="https://app.nuport.io/img/pathao.svg" alt="Facebook" width={27} height={27} />
                      </TooltipTrigger>
                      <TooltipContent>www.fashionx.com</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="py-0.5 rounded-md text-muted-foreground font-medium ">Pathao</div>
                </span>
                <p className="text-sm  text-muted-foreground flex items-center gap-2" onClick={(e) => {
                  e.stopPropagation()
                }}>
                  <span className="font-bold">Status:</span>
                  <Badge className="px-2 py-1 cursor-pointer" variant="outline" >
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    Returned
                  </Badge>
                </p>
                <p className="text-sm truncate block text-muted-foreground">
                  <span className="font-bold">ID:</span> DF080624QL3SA8
                </p>
              </div>
            )
          }

        </div>
      );
    },
  },
  {
    accessorKey: "Notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      const { metadata } = row.original;
      return (
        <div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => {
            e.stopPropagation()
          }}>
            <span className="font-bold text-muted-foreground flex items-center gap-2">
              {/* {metadata.notes || 'No Notes'} */}
              {metadata.notes &&
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>

                      <NotepadText className="w-6 h-6" />

                    </TooltipTrigger>
                    <TooltipContent>{metadata.notes}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>}
              <FilePlus2 className="w-6 h-6" />
            </span>

          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column  }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const { status, _id } = row.original;
      return (
        <div >
          <OrderStatus status={status} orderId={_id} />

          <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles[status.toLowerCase()]} capitalize my-2`}
          >
            {status}
          </div>


        </div>
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