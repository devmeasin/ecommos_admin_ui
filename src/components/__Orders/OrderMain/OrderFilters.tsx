export default function OrderFilters() {
    const statuses = ['All', 'Completed', 'Processed', 'Returned', 'Cancelled'];
  
    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {statuses.map((status, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                status === 'All' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {status} {index === 0 ? '40' : index === 1 ? '31' : index === 2 ? '4' : '2'}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <input
            type="search"
            placeholder="Search products..."
            className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <div className="flex gap-3">
            <select className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option>All status</option>
            </select>
            <select className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option>All collection</option>
            </select>
          </div>
        </div>
      </div>
    );
}