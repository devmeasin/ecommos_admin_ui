import { Order } from "@/types/order";
import { OrderCard } from "./OrderCard";
import { OrdersTable } from "./OrdersTable";
import { columns } from "./columns";
import { useMediaQuery } from "@/hooks/use-media-query";

interface OrderListProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
  isLoading: boolean;
  // refetchOrders?: () => void
}

export function OrderList({ orders, onOrderClick, isLoading }: OrderListProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <OrdersTable columns={columns} data={orders} onRowClick={onOrderClick} isLoading={isLoading} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* {orders.map((order, ind) => (
        <OrderCard 
          key={ind} 
          order={order} 
          onClick={onOrderClick}
        />
      ))} */}
    </div>
  );
}