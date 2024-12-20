import { Order } from "@/types/order";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Package, ChevronRight } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onClick?: (order: Order) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  return (
    <Card 
      className="p-4 space-y-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(order)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <p className="font-medium">#{order?.orderId}</p>
          </div>
          <p className="text-sm text-muted-foreground">{order?.date}</p>
        </div>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{order?.customer}</p>
          <p className="font-bold">${order?.total || ''}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{order?.items} items</p>
          <Badge variant={order?.paymentStatus === "Paid" ? "success" : "warning"}>
            {order?.paymentStatus}
          </Badge>
        </div>
      </div>

      <div className="pt-2 border-t">
        <Badge
          variant={
            order.orderStatus === "Delivered"
              ? "default"
              : order.orderStatus === "Shipped"
              ? "secondary"
              : "outline"
          }
          className="w-full justify-center"
        >
          {order.orderStatus}
        </Badge>
      </div>
    </Card>
  );
}