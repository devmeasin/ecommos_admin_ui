import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrderTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function OrderTableToolbar({
  searchValue,
  onSearchChange,
}: OrderTableToolbarProps) {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Find order..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Sort by
        </Button>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>
    </div>
  );
}