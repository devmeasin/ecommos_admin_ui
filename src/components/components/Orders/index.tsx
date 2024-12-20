import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDebounce } from '@/hooks/useDebounce'
import { getAllOrders } from "@/http/api"
import { cn } from '@/lib/utils'
import { Order } from '@/types/order'
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, Check, Clock, Filter, LayoutGrid, List, Plus, Search, Truck, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CreateOrderDrawer from './CreateOrderDrawer'
import OrderCard from './OrderCard'
import OrderDrawer from './OrderDrawer'
import { stat } from "fs"

// Types for API request and response
interface OrderQueryParams {
  page?: number
  limit?: number
  status?: string
  search?: string
  from?: string
  to?: string
  sortBy?: string
  sortOrder?: string
}

interface OrdersResponse {
  data: Order[]
  total: number
  page: number
  totalPages: number
}

const fetchOrders = async (params: OrderQueryParams): Promise<OrdersResponse> => {
  try {
    const { data } = await getAllOrders({
      page: params.page || 1,
      limit: params.limit || 20,
      status: params.status || '',
      search: params.search || '',
      from: params.from || '',
      to: params.to || '',
      sortBy: params.sortBy || '',
      sortOrder: params.sortOrder || ''
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch orders', error);
    throw error;
  }
};

export default function Orders() {
  const [viewState, setViewState] = useState({
    activeTab: "ALL",
    statusFilter: "ALL",
    viewMode: "list" as "grid" | "list",
    searchQuery: "",
    selectedOrders: new Set<string>(),
    isDrawerOpen: false,
    selectedOrder: null as Order | null,
    showCreateDrawer: false,
    page: 1,
  });

  const debouncedSearch = useDebounce(viewState.searchQuery, 300)

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useQuery<OrdersResponse>({
    queryKey: ["orders", viewState.page, viewState.statusFilter, debouncedSearch],
    queryFn: () =>
      fetchOrders({
        page: viewState.page,
        limit: 20,
        status: viewState.statusFilter === "ALL" ? "" : viewState.statusFilter,
        search: debouncedSearch,
      }),
  });

  console.log(viewState.activeTab, viewState.statusFilter, debouncedSearch)
  // Group orders by phone number to detect duplicates
  const ordersByPhone = useMemo(() => {
    if (!ordersData?.data) return {};
    return ordersData.data.reduce<Record<string, Order[]>>((acc, order) => {
      const phone = order.customerPhone
      if (!acc[phone]) acc[phone] = []
      acc[phone].push(order)

      return acc
    }, {})
  }, [ordersData?.data])

  // Get duplicate orders (phones with multiple orders)
  const duplicateOrders = useMemo(() => {
    return Object.entries(ordersByPhone)
      .filter(([_, orders]) => orders.length > 1)
      .reduce((acc, [phone, orders]) => ({
        ...acc,
        [phone]: orders
      }), {} as Record<string, Order[]>)
  }, [ordersByPhone]);
  
  // Counting duplicate "PENDING" orders (if needed)
  const pendingOrdersCount = ordersData?.data?.filter((o) => o.status === "PENDING").length || 0;
  

  const filteredOrders = useMemo(() => {
    if (!ordersData?.data) return [];
    return ordersData.data.filter((order) => {
      const matchesTab =
        viewState.activeTab === "ALL" || order.status === viewState.activeTab;
      const matchesStatus =
        viewState.statusFilter === "ALL" || order.status === viewState.statusFilter;
      const matchesSearch =
        debouncedSearch === "" ||
        order.customerPhone.includes(debouncedSearch) ||
        order.internalId.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesTab && matchesStatus && matchesSearch;
    });
  }, [ordersData, viewState.activeTab, viewState.statusFilter, debouncedSearch]);


  const handleOrderClick = (order: Order) => {
    setViewState(prev => ({
      ...prev,
      selectedOrder: order,
      isDrawerOpen: true
    }))
  }

  const handleSelectAll = () => {
    setViewState(prev => {
      const newSelectedOrders = prev.selectedOrders.size === filteredOrders.length
        ? new Set()
        : new Set(filteredOrders.map(order => order._id))
      return { ...prev, selectedOrders: newSelectedOrders }
    })
    refetch()
  }

  const handleSelectOrder = (orderId: string, selected: boolean) => {
    setViewState(prev => {
      const newSet = new Set(prev.selectedOrders)
      if (selected) {
        newSet.add(orderId)
      } else {
        newSet.delete(orderId)
      }
      return { ...prev, selectedOrders: newSet }
    })
    refetch()
  }

  const handleBulkStatusUpdate = async (newStatus: string) => {
    // Implement bulk status update logic
  }

  // Automatically switch to card view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewState.viewMode === 'list') {
        setViewState(prev => ({ ...prev, viewMode: 'grid' }))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [viewState.viewMode])

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none p-4 lg:p-6 space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Title and Main Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="text-muted-foreground text-sm">Manage your orders and track deliveries</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewState(prev => ({
                ...prev,
                viewMode: prev.viewMode === 'grid' ? 'list' : 'grid'
              }))}
              className="hidden md:flex"
            >
              {viewState.viewMode === 'grid' ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </Button>
            <Button onClick={() => setViewState(prev => ({ ...prev, showCreateDrawer: true }))}>
              <Plus className="h-4 w-4 mr-2" /> Create Order
            </Button>
          </div>
        </div>

        {/* Desktop Tabs - Hidden on Mobile */}
        <div className="hidden md:block border-b">
         
            <Tabs value={viewState.statusFilter}
              onValueChange={(tab) => setViewState((prev) => ({ ...prev, statusFilter: tab }))}>

              <TabsList className="w-full justify-start">
                {["ALL", "PENDING", "APPROVED", "SHIPPED", "IN_TRANSIT", "DELIVERED", "RETURNED", "CANCELLED"].map((status) => (
                  <TabsTrigger key={status} value={status} className="flex gap-2">
                    {status}
                    <Badge variant="secondary" className="ml-1">
                      {status === "ALL"
                        ? ordersData?.data?.length || 0 // Show total count for "ALL" tab
                        : ordersData?.data?.filter((o) => o.status === status).length || 0} {/* Show count for each status */}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>


        </div>

        {/* Mobile Filter Dropdown - Shown only on Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                {viewState.statusFilter === 'ALL' ? 'All Status' : viewState.statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {['ALL', 'PENDING', 'APPROVED', 'SHIPPED', 'IN_TRANSIT', "DELIVERED", "RETURNED", 'CANCELLED',].map(status => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setViewState(prev => ({ ...prev, statusFilter: status }))}
                >
                  {status === 'ALL' ? 'All Status' : status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search and Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or phone..."
              className="pl-8"
              value={viewState.searchQuery}
              onChange={(e) => setViewState(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
        </div>

        {/* Selection Controls and Rest of the Component */}
        {/* ... (similar updates to use setViewState) ... */}
      </div>

      {/* Orders List/Grid */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6">
        {/* Duplicate Orders Warning */}
        {Object.keys(duplicateOrders).length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Multiple Orders Detected
            </h3>
            <div className="space-y-2">
              {Object.entries(duplicateOrders).map(([phone, orders]) => (
                <div key={phone} className="flex items-center justify-between text-sm text-yellow-700 dark:text-yellow-300">
                  <span>{phone}</span>
                  <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-800">
                    {orders.length} orders
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={cn(
          "min-h-[300px] space-y-4 py-4",
          viewState.viewMode === 'grid'
            ? "sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0"
            : "flex flex-col gap-2"
        )}>
          {Object.entries(ordersByPhone).map(([phone, orders]) => (
            <div key={phone} className={cn(
              "relative",
              orders.length > 1 && "bg-blue-50/50 border border-blue-100 p-3 rounded-lg"
            )}>
              {orders.length > 1 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {orders.length} Orders
                      </Badge>
                      <span className="text-sm font-medium">{phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {orders.map(order => (
                      <OrderCard
                        key={order._id}
                        order={order}
                        onClick={() => handleOrderClick(order)}
                        viewMode={viewState.viewMode}
                        hasMultipleOrders={true}
                        isPartOfGroup={true}
                        onStatusChange={handleBulkStatusUpdate}
                        isSelected={viewState.selectedOrders.has(order._id)}
                        onSelect={handleSelectOrder}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <OrderCard
                  order={orders[0]}
                  onClick={() => handleOrderClick(orders[0])}
                  viewMode={viewState.viewMode}
                  hasMultipleOrders={false}
                  isPartOfGroup={false}
                  onStatusChange={handleBulkStatusUpdate}
                  isSelected={viewState.selectedOrders.has(orders[0]._id)}
                  onSelect={handleSelectOrder}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex-none p-4 lg:p-6 border-t bg-background">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setViewState(prev => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1)
                }))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                {viewState.page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setViewState(prev => ({
                  ...prev,
                  page: Math.min(ordersData?.totalPages || 1, prev.page + 1)
                }))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Drawers */}
      <OrderDrawer
        open={viewState.isDrawerOpen}
        onClose={() => setViewState(prev => ({ ...prev, isDrawerOpen: false }))}
        order={viewState.selectedOrder}
      />

      <CreateOrderDrawer
        open={viewState.showCreateDrawer}
        onClose={() => setViewState(prev => ({ ...prev, showCreateDrawer: false }))}
      />
    </div>
  )
}