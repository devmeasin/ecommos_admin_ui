import { dummyOrders } from '@/components/__Orders/dummyData'
import { Order } from '@/types/order'
import { useEffect, useState } from 'react'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setTimeout(() => {
        setOrders(dummyOrders)
        setIsLoading(false)
      }, 1000)
    }

    fetchOrders()
  }, [page])

  return { orders, isLoading, page, setPage, totalPages }
} 