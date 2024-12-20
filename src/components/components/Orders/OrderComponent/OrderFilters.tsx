import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select'

interface OrderFiltersProps {
  filtering: string
  setFiltering: (value: string) => void
}

export function OrderFilters({ filtering, setFiltering }: OrderFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-6">
      {/* Search Input */}
      <div className="flex-1">
        <Input
          placeholder="Search orders..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Input
          type="date"
          className="w-[180px]"
          placeholder="Start Date"
        />
        <Input
          type="date"
          className="w-[180px]"
          placeholder="End Date"
        />

        {/* Reset Filters Button */}
        <Button 
          variant="outline"
          onClick={() => setFiltering('')}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
} 