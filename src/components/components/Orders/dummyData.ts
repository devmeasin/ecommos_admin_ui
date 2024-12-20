const sources = ['WEBSITE', 'MESSENGER', 'PHONE', 'WHATSAPP']
const statuses = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED', 'IN_TRANSIT']
const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet']

const generateOrder = (index: number) => ({
  shipping: {
    address: `${Math.floor(Math.random() * 100)} ${districts[Math.floor(Math.random() * districts.length)]}`,
    district: districts[Math.floor(Math.random() * districts.length)],
    division: "Dhaka",
    country: "BD"
  },
  amounts: {
    subtotal: Math.floor(Math.random() * 1000) + 500,
    total: Math.floor(Math.random() * 1000) + 500,
    discount: Math.floor(Math.random() * 100),
    deliveryCharge: Math.floor(Math.random() * 50) + 50
  },
  payment: {
    method: Math.random() > 0.5 ? "CASH_ON_DELIVERY" : "BKASH",
    paid: Math.random() > 0.7 ? Math.floor(Math.random() * 1000) : 0,
    due: Math.floor(Math.random() * 1000)
  },
  dates: {
    orderDate: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date().toISOString()
  },
  metadata: {
    notes: Math.random() > 0.7 ? ["Urgent Delivery", "Fragile Items"] : [],
    flags: Math.random() > 0.8 ? ["VIP Customer"] : []
  },
  _id: `order_${index}`,
  companyId: "company_1",
  customerPhone: `+880${Math.floor(Math.random() * 1000000000)}`,
  customerId: `customer_${Math.floor(Math.random() * 100)}`,
  productId: `product_${Math.floor(Math.random() * 50)}`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  source: sources[Math.floor(Math.random() * sources.length)],
  internalId: `SO-${String(index).padStart(4, '0')}`,
  externalId: `EX-${String(index).padStart(3, '0')}`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString()
})

// Generate 20 sample orders with some duplicates
const generateDummyOrders = () => {
  const orders = Array(20).fill(null).map((_, i) => generateOrder(i))
  
  // Add some duplicate phone numbers
  orders[1].customerPhone = orders[0].customerPhone
  orders[5].customerPhone = orders[3].customerPhone
  
  return orders
}

export const dummyOrders = generateDummyOrders()
  