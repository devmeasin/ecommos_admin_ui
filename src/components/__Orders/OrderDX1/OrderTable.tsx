import React from 'react';

interface Order {
  id: string;
  product: string;
  departureDate: string;
  deliveryDate: string;
  status: string;
  deliveryStatus: string;
  destination: string;
  price: string;
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Order ID</th>
            <th className="py-3 px-4 text-left">Products</th>
            <th className="py-3 px-4 text-left">Departure Date</th>
            <th className="py-3 px-4 text-left">Delivery Date</th>
            <th className="py-3 px-4 text-left">Order Status</th>
            <th className="py-3 px-4 text-left">Delivery Status</th>
            <th className="py-3 px-4 text-left">Destination</th>
            <th className="py-3 px-4 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.product}</td>
              <td className="py-3 px-4">{order.departureDate}</td>
              <td className="py-3 px-4">{order.deliveryDate}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs rounded-md ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4">{order.deliveryStatus}</td>
              <td className="py-3 px-4">{order.destination}</td>
              <td className="py-3 px-4">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In progress':
      return 'bg-blue-100 text-blue-700';
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'Returned':
      return 'bg-yellow-100 text-yellow-700';
    case 'Canceled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default OrderTable;
