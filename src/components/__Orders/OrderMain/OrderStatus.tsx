export default function OrderStats() {
    const stats = [
      { label: 'Total orders', value: '579', icon: '⏱️' },
      { label: 'Delivered over time', value: '24', icon: '🚚' },
      { label: 'Returns', value: '5', icon: '↩️' },
      { label: 'Total order amount', value: '347', icon: '💰' },
      { label: 'Fulfilled over time', value: '173', icon: '✅' },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-semibold dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }