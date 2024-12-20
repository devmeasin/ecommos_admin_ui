import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CreditCard, Calendar, User } from "lucide-react";

interface OrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order;
}

export function OrderDetailsDrawer({
  open,
  onOpenChange,
  order,
}: OrderDetailsDrawerProps) {
  if (!order) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Order #{order.orderId}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Order Date
                  </div>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    Customer
                  </div>
                  <p className="font-medium">{order.customer}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Order Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={
                      order.orderStatus === "Delivered"
                        ? "default"
                        : order.orderStatus === "Shipped"
                        ? "secondary"
                        : "outline"
                    }
                    className="px-4 py-1"
                  >
                    <Truck className="mr-1 h-3 w-3" />
                    {order.orderStatus}
                  </Badge>
                  <Badge
                    variant={order.paymentStatus === "Paid" ? "success" : "warning"}
                    className="px-4 py-1"
                  >
                    <CreditCard className="mr-1 h-3 w-3" />
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{order.items}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}