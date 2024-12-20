export const OrderStatus = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SHIPPED: 'SHIPPED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: Exclude<OrderStatus, 'ALL'>;
  date: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: string;
}

