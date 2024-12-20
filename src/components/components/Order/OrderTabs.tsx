import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTab } from "@/types/orderx";

interface OrderTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

const tabs: OrderTab[] = ['All', 'Unfulfilled', 'Unpaid', 'Paid', 'Open', 'Close'];

export function OrderTabs({ activeTab, onTabChange }: OrderTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as OrderTab)}>
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