import { Card, CardContent } from "@/components/ui/card"

export function OrderStats({ stats }) {
  const statItems = [
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Ordered items over time", value: stats.orderedItems },
    { label: "Returns", value: stats.returns },
    { label: "Fulfilled orders over time", value: stats.fulfilledOrders },
    { label: "Delivered orders overtime", value: stats.deliveredOrders },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statItems.map((item) => (
        <Card key={item.label} className="bg-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold mt-2">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}