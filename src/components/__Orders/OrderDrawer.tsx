import { Order } from '@/types/order'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// import { formatDate, formatCurrency } from '@/lib/utils'
import { Phone, MapPin, Calendar, Package, CreditCard } from 'lucide-react'

interface OrderDrawerProps {
  open: boolean
  onClose: () => void
  order: Order | null
}

export default function OrderDrawer({ open, onClose, order }: OrderDrawerProps) {
  if (!order) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <SheetTitle>Order {order.internalId}</SheetTitle>
              <SheetDescription>
                Created {formatDate(order.createdAt)}
              </SheetDescription>
            </div>
            <Badge>{order.status}</Badge>
          </div>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-medium">Customer Information</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p>{order.shipping.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shipping.district}, {order.shipping.division}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-sm font-medium">Order Details</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p>Source: {order.source}</p>
                  <p className="text-sm text-muted-foreground">ID: {order.externalId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p>Order Date: {formatDate(order.dates.orderDate)}</p>
                  {order.dates.processedAt && (
                    <p className="text-sm text-muted-foreground">
                      Processed: {formatDate(order.dates.processedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-sm font-medium">Payment Details</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p>{order.payment.method}</p>
                  <p className="text-sm text-muted-foreground">
                    Total: {formatCurrency(order.amounts.total)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="font-medium">{formatCurrency(order.amounts.subtotal)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Fee</p>
                  <p className="font-medium">{formatCurrency(order.amounts.deliveryCharge)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid Amount</p>
                  <p className="font-medium">{formatCurrency(order.payment.paid)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Amount</p>
                  <p className="font-medium">{formatCurrency(order.payment.due)}</p>
                </div>
              </div>
            </div>
          </section>

          {(order.metadata.notes.length > 0 || order.metadata.flags.length > 0) && (
            <>
              <Separator />
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Additional Information</h3>
                {order.metadata.notes.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Notes</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {order.metadata.notes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {order.metadata.flags.length > 0 && (
                  <div className="flex gap-2">
                    {order.metadata.flags.map((flag, i) => (
                      <Badge key={i} variant="secondary">{flag}</Badge>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          <div className="flex gap-2 mt-8">
            <Button className="flex-1" variant="outline" asChild>
              <SheetClose>Cancel</SheetClose>
            </Button>
            <Button className="flex-1">Update Status</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 