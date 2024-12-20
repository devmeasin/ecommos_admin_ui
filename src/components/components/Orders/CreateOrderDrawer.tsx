import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface CreateOrderDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CreateOrderDrawer({ open, onClose }: CreateOrderDrawerProps) {
  const [formData, setFormData] = useState({
    customerPhone: '',
    customerName: '',
    productId: '',
    quantity: 1,
    payment: {
      method: 'CASH_ON_DELIVERY',
      paid: 0,
      due: 0
    },
    amounts: {
      subtotal: 0,
      total: 0
    },
    shipping: {
      division: '',
      district: '',
      address: ''
    },
    source: 'WEBSITE',
    externalId: '',
    internalId: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Order</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customer Information</h3>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={formData.customerPhone}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    customerPhone: e.target.value
                  }))}
                  placeholder="+880"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input 
                  id="name"
                  value={formData.customerName}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    customerName: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Order Details</h3>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="productId">Product ID</Label>
                <Input 
                  id="productId"
                  value={formData.productId}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    productId: e.target.value
                  }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Payment Method</Label>
                <Select 
                  value={formData.payment.method}
                  onValueChange={value => setFormData(prev => ({
                    ...prev,
                    payment: { ...prev.payment, method: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH_ON_DELIVERY">Cash on Delivery</SelectItem>
                    <SelectItem value="BKASH">bKash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="paid">Paid Amount</Label>
                  <Input 
                    id="paid"
                    type="number"
                    value={formData.payment.paid}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      payment: { ...prev.payment, paid: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="total">Total Amount</Label>
                  <Input 
                    id="total"
                    type="number"
                    value={formData.amounts.total}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      amounts: { ...prev.amounts, total: Number(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shipping Information</h3>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  value={formData.shipping.address}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    shipping: { ...prev.shipping, address: e.target.value }
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="division">Division</Label>
                  <Input 
                    id="division"
                    value={formData.shipping.division}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, division: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="district">District</Label>
                  <Input 
                    id="district"
                    value={formData.shipping.district}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      shipping: { ...prev.shipping, district: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-8">
            <Button 
              variant="outline" 
              type="button" 
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Order
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
} 