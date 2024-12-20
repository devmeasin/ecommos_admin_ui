import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTab } from "@/types/orderx";

interface OrderTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
  setSearchParams: (status: OrderTab) => void
}

const tabs: OrderTab[] = ['ALL', 'PENDING', 'ON_HOLD', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'CANCELLED'];

export function OrderTabs({ activeTab, onTabChange , setSearchParams }: OrderTabsProps) {
  
  return (
    <Tabs value={activeTab} onValueChange={(value) => {
      onTabChange(value as OrderTab)
      setSearchParams((prev) => {
        prev.set('status', value);
        return prev;
    })
    } }>
      <TabsList className="bg-muted/50">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="data-[state=active]:bg-background"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}