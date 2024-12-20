import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export function OrderMobileCards({ table }) {
  return (
    <div className="space-y-4">
      {table.getRowModel().rows.map((row) => (
        <Card key={row.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium">#{row.original.id}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(row.original.date), 'MMM dd, yyyy')}
                </p>
              </div>
              <Badge 
                variant={row.original.paymentStatus === 'paid' ? 'success' : 'warning'}
                className="capitalize"
              >
                {row.original.paymentStatus}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Customer</span>
                <span>{row.original.customer}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span>${row.original.total}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="capitalize">
                  {row.original.orderStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}