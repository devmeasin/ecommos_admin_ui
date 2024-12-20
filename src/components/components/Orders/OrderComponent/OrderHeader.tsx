import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function OrderHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Today
        </Button>
        
        <Button variant="outline" size="sm">
          Export
        </Button>
        
        <Button variant="outline" size="sm">
          More Action
        </Button>
        
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          Create order
        </Button>
      </div>
    </div>
  )
} 