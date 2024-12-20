import { useState } from "react";
import { OrderStats } from "../Stats/OrderStats";
import { Button } from "@/components/ui/button";
import { OrderTabs } from "./OrderTabs";
import { OrderTableToolbar } from "./OrderTableToolbar";
import { Calendar, Download, Plus, PackageSearch, Package, RefreshCw, TrendingUp, Truck } from "lucide-react";
import { OrderTab } from "@/types/orderx";
import { OrderList } from "./OrderList";
import { CreateOrderDrawer } from "./CreateOrderDrawer";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { Order } from "@/types/orderx";

const mockStats = {
  totalOrders: {
    value: 3210,
    trend: { value: 12.5, isPositive: true },
    icon: <PackageSearch className="h-6 w-6 text-primary" />
  },
  orderedItems: {
    value: 3210,
    trend: { value: 8.2, isPositive: true },
    icon: <Package className="h-6 w-6 text-primary" />
  },
  returns: {
    value: 3210,
    trend: { value: 2.1, isPositive: false },
    icon: <RefreshCw className="h-6 w-6 text-primary" />
  },
  fulfilledOrders: {
    value: 3210,
    trend: { value: 15.3, isPositive: true },
    icon: <TrendingUp className="h-6 w-6 text-primary" />
  },
  deliveredOrders: {
    value: 3210,
    trend: { value: 10.8, isPositive: true },
    icon: <Truck className="h-6 w-6 text-primary" />
  }
};

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "H35624367",
    date: "Oct 23, 2024",
    customer: "Makenna Mango",
    total: 440.00,
    paymentStatus: "Paid",
    items: 2,
    orderStatus: "Order processing",
  },
 {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  }, 
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
  {
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },{
    id: "2",
    orderId: "H35624367",
    date: "Oct 18, 2024",
    customer: "Phillip Vaccaro",
    total: 440.00,
    paymentStatus: "Paid",
    items: 1,
    orderStatus: "Shipped",
  },
];

function OrderComponent() {
  const [activeTab, setActiveTab] = useState<OrderTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDetailsDrawerOpen(true);
  };

  return (
    <div className="container mx-auto py-4 px-4 md:py-8 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Order Management</h1>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            size="sm" 
            className="h-8"
            onClick={() => setCreateDrawerOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create order
          </Button>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <OrderStats stats={mockStats} />
        
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <OrderTableToolbar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <OrderList 
            orders={mockOrders as Order[]} 
            onOrderClick={handleOrderClick}
          />
        </div>
      </div>

      <CreateOrderDrawer 
        open={createDrawerOpen} 
        onOpenChange={setCreateDrawerOpen} 
      />
      
      <OrderDetailsDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        order={selectedOrder}
      />
    </div>
  );
}

export default OrderComponent;