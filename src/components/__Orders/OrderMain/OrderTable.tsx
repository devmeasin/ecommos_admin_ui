export default function OrderTable({ orders }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Desktop View */}
        <table className="w-full hidden md:table">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Delivery</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tags</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="p-4 dark:text-white">
                  <div className="flex items-center gap-3">
                    <img src={order.image} alt={order.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p>{order.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 dark:text-white">${order.price}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 dark:text-white">{order.delivery}</td>
                <td className="p-4 dark:text-white">{order.date}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-white">
                    {order.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Mobile View */}
        <div className="md:hidden">
          {orders.map((order, index) => (
            <div key={index} className="p-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium dark:text-white">{order.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Price:</span>
                  <span className="dark:text-white">${order.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Delivery:</span>
                  <span className="dark:text-white">{order.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Date:</span>
                  <span className="dark:text-white">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case 'processed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'delivered':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }