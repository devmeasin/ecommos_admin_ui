import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { LazyLoadImage } from "react-lazy-load-image-component";
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

const orderSource: Record<string, string> = {
  "WOOCOMMERCE": "WOOCOMMERCE",
  "MAGENTO": "MAGENTO",
  "SHOPIFY": "SHOPIFY",
  "BIGCOMMERCE": "BIGCOMMERCE",
  "OPENCART": "OPENCART",
  "WOOVUE": "WOOVUE",
}

const deliveryStatus: Record<string, string> = {
  "SHIPPED": "SHIPPED",
  "DELIVERED": "DELIVERED",
  "RETURNED": "RETURNED",
  "IN_TRANSIT": "IN_TRANSIT",
  "RTO": "RTO",
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

      const { source, metadata, internalId, dates, createdAt } = row.original;

      return (
        <div>
          <span className="font-medium block"># {internalId || ''}</span>
          <span className="mt-1 text-xs text-muted-foreground font-medium block">{formatDate(createdAt) || ''}</span>
          <span className="flex items-center gap-2">
            {/* <div className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles['in_transit']} capitalize my-2`}>
              {orderSource[source] ? 'WEBSITE' : source}
            </div> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LazyLoadImage
                    src="https://app.nuport.io/img/woocommerce.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                    effect="blur"
                  />
                </TooltipTrigger>
                <TooltipContent>{metadata?.sourceUrl || ''}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground capitalize my-2`}>
              {orderSource[source] ? 'website' : source.toLocaleLowerCase()}
            </div>
          </span>
          {/* <span className="text-xs font-medium cursor-pointer border-dotted border-b-2 border-blue-600 text-muted-foreground">
            View Products
          </span> */}
        </div>
      )
    }
  },


  // {
  //   accessorKey: "date",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Order Date" />
  //   ),
  //   cell: ({ row }) => {
  //     // console.log(row.original)
  //     const { dates, createdAt } = row.original
  //     return (
  //       <div>
  //         {/* <span className="font-medium">{dates.orderDate || ''}</span> */}
  //         <p className="text-sm text-muted-foreground font-medium">{formatDate(createdAt) || ''}</p>
  //       </div>
  //     )
  //   }
  // },


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
                <div className="flex items-center gap-2">
                  <MapPinHouse className="w-4 h-4" />
                  <span className="text-sm truncate text-muted-foreground max-w-[20ch]">
                    {shippingAddress?.address || 'N/A Address'}
                  </span>
                </div>
                <div className="w-full">
                  {/* <Progress value={70} className="[&>*]:bg-green-600 bg-red-400" /> */}
                  <div
                    className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles['delivered']} capitalize my-2`}
                  >
                    <span className="text-gray-500">RTO Rick: </span> LOW
                  </div>
                </div>

              </div>
            </div>
          </div>
        </span>
      );
    }
  },
  {
    accessorKey: "ProductDetails",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Details" />
    ),
    cell: ({ row }) => {
      const { products } = row.original;
      return (
        <div onClick={(e) => {
          e.stopPropagation()
        }}>
          <div>
            <p className="flex items-center gap-2">
              {/* <ShoppingBag className="w-4 h-4" /> */}
              <span
                className="text-muted-foreground font-medium max-w-[9rem] truncate"
              >
                {products[0]?.product?.name || ' '}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">QTY: {products[0]?.quantity || ''}</span>
            </p>
            {/* <p className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">{products[0]?.name || ''}</span>
            </p> */}
          </div>
          {/* <p className="text-sm truncate text-muted-foreground ">
            <span className="font-bold flex items-center gap-2"><BadgeIndianRupee className="w-4 h-4" />BDT {products[0]?.name || ''}</span>
          </p> */}

          {products?.length > 0 && (
            <span className="text-xs font-medium cursor-pointer border-dotted border-b-2 border-blue-600 text-muted-foreground">
              {products?.length === 1 ? "View Products" : `+${products?.length - 1} Products`}
            </span>
          )}

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
                        <LazyLoadImage
                          src="https://app.nuport.io/img/pathao.svg"
                          alt="Facebook"
                          width={25}
                          height={25}
                          effect="blur"
                        />
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
    header: ({ column }) => (
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
            <span className="h-1.5 w-1.5 rounded-full bg-current mr-1"></span>{status}
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