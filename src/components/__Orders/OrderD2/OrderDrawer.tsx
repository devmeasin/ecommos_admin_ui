import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Order, OrderStatus } from "./types.ts";

interface OrderDrawerProps {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
}

async function getOrderById(id: string): Promise<Order> {
  const response = await fetch(`https://api.example.com/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}

export function OrderDrawer({ orderId, open, onClose }: OrderDrawerProps) {
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => (orderId ? getOrderById(orderId) : null),
    enabled: !!orderId,
  });

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Order Details</DrawerTitle>
          <DrawerDescription>
            View and edit order information
          </DrawerDescription>
        </DrawerHeader>
        {isLoading ? (
          <div className="p-4 space-y-4">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : order ? (
          <div className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="order-number">Order Number</Label>
                <Input
                  id="order-number"
                  defaultValue={order.orderNumber}
                  readOnly
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  defaultValue={order.customerName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(OrderStatus)
                      .filter((status) => status !== OrderStatus.ALL)
                      .map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Order Items</Label>
              <div className="rounded-md border p-4 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

