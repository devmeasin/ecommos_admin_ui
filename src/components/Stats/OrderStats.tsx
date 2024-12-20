import { StatsCard } from "./StatsCard";

interface OrderStatsProps {
  stats: {
    totalOrders: { value: number; trend: { value: number; isPositive: boolean }; icon: React.ReactNode };
    orderedItems: { value: number; trend: { value: number; isPositive: boolean }; icon: React.ReactNode };
    returns: { value: number; trend: { value: number; isPositive: boolean }; icon: React.ReactNode };
    fulfilledOrders: { value: number; trend: { value: number; isPositive: boolean }; icon: React.ReactNode };
    deliveredOrders: { value: number; trend: { value: number; isPositive: boolean }; icon: React.ReactNode };
  };
}

export function OrderStats({ stats }: OrderStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard 
        title="Total Orders" 
        value={stats.totalOrders.value}
        icon={stats.totalOrders.icon}
        trend={stats.totalOrders.trend}
      />
      <StatsCard 
        title="Ordered Items" 
        value={stats.orderedItems.value}
        icon={stats.orderedItems.icon}
        trend={stats.orderedItems.trend}
      />
      <StatsCard 
        title="Returns" 
        value={stats.returns.value}
        icon={stats.returns.icon}
        trend={stats.returns.trend}
      />
      <StatsCard 
        title="Fulfilled Orders" 
        value={stats.fulfilledOrders.value}
        icon={stats.fulfilledOrders.icon}
        trend={stats.fulfilledOrders.trend}
      />
      <StatsCard 
        title="Delivered Orders" 
        value={stats.deliveredOrders.value}
        icon={stats.deliveredOrders.icon}
        trend={stats.deliveredOrders.trend}
      />
    </div>
  );
}