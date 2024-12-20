import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary"></div>
    </Card>
  );
}