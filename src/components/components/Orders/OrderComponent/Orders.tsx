import { useState } from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'

import { columns } from './columns'
// import { orderData } from '@/data/orders'
import { OrderHeader } from './OrderHeader'
import { OrderStats } from './OrderStats'
import { OrderFilters } from './OrderFilters'
import { OrderTable } from './OrderTable'
import { OrderMobileCards } from './OrderMobileCard'

export const orderData = {
    stats: {
      totalOrders: 3210,
      orderedItems: 3210,
      returns: 3210,
      fulfilledOrders: 3210,
      deliveredOrders: 3210,
    },
    orders: [
      {
        id: "H35624367",
        date: "2024-03-23",
        customer: "Makenna Mango",
        total: 440.00,
        paymentStatus: "paid",
        items: 2,
        orderStatus: "processing"
      },
      {
        id: "H35624368",
        date: "2024-03-22",
        customer: "Phillip Vaccaro",
        total: 440.00,
        paymentStatus: "paid",
        items: 1,
        orderStatus: "shipped"
      },
      {
        id: "H35624369",
        date: "2024-03-22",
        customer: "Madelyn Botosh",
        total: 440.00,
        paymentStatus: "paid",
        items: 3,
        orderStatus: "processing"
      },
      {
        id: "H35624370",
        date: "2024-03-22",
        customer: "Allison Levin",
        total: 440.00,
        paymentStatus: "unpaid",
        items: 1,
        orderStatus: "processing"
      },
      
      // Add more orders as needed...
    ]
  }

export function OrdersX() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: orderData.orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter: filtering,
      rowSelection,
    },
    onSortingChange: (updaterOrValue: Updater<SortingState> | SortingState) => setSorting(updaterOrValue),
    onGlobalFilterChange: setFiltering,
  })

  return (
    <div className="space-y-6">
      <OrderHeader />
      <OrderStats stats={orderData.stats} />
      <OrderFilters filtering={filtering} setFiltering={setFiltering} />
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <OrderTable table={table} />
      </div>
      
      {/* Mobile View */}
      <div className="block md:hidden">
        <OrderMobileCards table={table} />
      </div>
    </div>
  )
}