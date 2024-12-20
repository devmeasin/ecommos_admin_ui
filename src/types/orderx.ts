export interface Order {
    id: string;
    orderId: string;
    date: string;
    customer: string;
    total: number;
    paymentStatus: 'Paid' | 'Unpaid';
    items: number;
    orderStatus: 'Order processing' | 'Shipped' | 'Delivered';
  }
  
  export interface OrderStats {
    totalOrders: number;
    orderedItems: number;
    returns: number;
    fulfilledOrders: number;
    deliveredOrders: number;
  }
  
  export type OrderTab = 'ALL' | 'PENDING' | 'ON_HOLD' | 'PROCESSING'| 'APPROVED' | 'SHIPPED' | 'IN_TRANSIT' | 'RETURNED' | 'DELIVERED' | 'CANCELLED';
