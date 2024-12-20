import OrderFilters from './OrderFilters';
import OrderStats from './OrderStatus';
import OrderTable from './OrderTable';
const orderData = [
    {
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },
    {
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },{
      id: '#AT145688',
      name: 'Sports Jacket',
      price: '120.99',
      status: 'Processed',
      delivery: 'Express',
      date: '2024-03-18',
      tag: 'Fashion',
      image: '/path/to/jacket-image.jpg'
    },
    // Add more dummy data following the same structure
];

export default function Orders() {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Organize the all of ordered products</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:text-white">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New product
          </button>
        </div>
      </div>
      
      <OrderStats />
      <OrderFilters />
      <OrderTable orders={orderData} />
    </div>
  );
}