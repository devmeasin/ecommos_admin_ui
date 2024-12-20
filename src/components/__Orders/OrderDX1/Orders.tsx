import React, { useState } from 'react';
import OrderTable from './OrderTable';
// import Filters from '../components/Filters';
import Pagination from './Pagination';

const OrdersXXX: React.FC = () => {
  const [orders] = useState([
    {
      id: 'AKF1267S',
      product: 'Morpheus',
      departureDate: '21 July 2022 08:00 PM',
      deliveryDate: '22 July 2022 05:00 PM',
      status: 'In progress',
      deliveryStatus: 'In checking',
      destination: 'Av. de los Quindos, ...',
      price: '$1,659.90',
    },
    // Add more order data here
  ]);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Orders (152 orders)</h1>
        {/* <Filters /> */}
      </header>
      <OrderTable orders={orders} />
      <Pagination total={152} itemsPerPage={10} />
    </div>
  );
};

export default OrdersXXX;
