export interface Order {
  shippingAddress: {
    address: string
    district: string
    division: string
    country: string
  }
  amounts: {
    subtotal: number
    total: number
    discount: number
    deliveryCharge: number
  }
  payment: {
    method: string
    paid: number
    due: number
  }
  dates: {
    orderDate: string
    processedAt: string
  }
  metadata: {
    sourceUrl: string,
    notes: string[]
    flags: string[]
  }
  _id: string
  companyId: string
  customerPhone: string
  customer: {
    name: string
    email: string
    phone: string
  },
  product: {
    _id: string
    name: string
    price : number
  }
  status: string
  source: string
  internalId: string
  externalId: string
  createdAt: string
  updatedAt: string
  deliveryPartner?: 'PATHAO' | 'OTHER'
} 