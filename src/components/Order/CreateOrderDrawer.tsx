import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CreateOrderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrderDrawer({ open, onOpenChange }: CreateOrderDrawerProps) {
  const [formData, setFormData] = useState({
    customer: "",
    items: "",
    total: "",
    paymentStatus: "unpaid",
    orderStatus: "processing",
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Create New Order</DrawerTitle>
            <DrawerDescription>Fill in the order details below</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="items">Number of Items</Label>
                <Input
                  id="items"
                  type="number"
                  value={formData.items}
                  onChange={(e) =>
                    setFormData({ ...formData, items: e.target.value })
                  }
                  placeholder="Enter number of items"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total">Total Amount</Label>
                <Input
                  id="total"
                  type="number"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({ ...formData, total: e.target.value })
                  }
                  placeholder="Enter total amount"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-status">Payment Status</Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentStatus: value })
                  }
                >
                  <SelectTrigger id="payment-status">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order-status">Order Status</Label>
                <Select
                  value={formData.orderStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, orderStatus: value })
                  }
                >
                  <SelectTrigger id="order-status">
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Create Order</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}