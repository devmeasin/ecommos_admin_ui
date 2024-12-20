interface Order {
  id: string;
  status: string;
  updatedAt: string;
  // Add other fields
}

interface OrdersResponse {
  orders: Order[];
  total: number;
}

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    PENDING: 'gold',
    APPROVED: 'blue',
    SHIPPED: 'cyan',
    IN_TRANSIT: 'purple',
    DELIVERED: 'green',
    RETURNED: 'orange',
    CANCELLED: 'red',
  };
  return colors[status] || 'default';
}; 