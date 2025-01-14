import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllOrders } from "@/http/api";
import { Order } from "@/types/orderx";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Download, Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateOrderDrawer } from "./CreateOrderDrawer";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { OrderList } from "./OrderList";
import OrderStatusTab from "./OrderStatusTab";
import { OrderTableToolbar } from "./OrderTableToolbar";

interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  totalPages: number;
}

const fetchOrders = async (params: OrderQueryParams): Promise<OrdersResponse> => {
  try {
    const { data } = await getAllOrders(params);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch orders" + error);
  }
};

function OrderComponent() {

  const [searchParams, setSearchParams] = useSearchParams();

  // const [activeTab, setActiveTab] = useState<OrderTab>(
  //   (searchParams.get("status") as OrderTab) || " "
  // );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Update searchParams when searchQuery or activeTab changes
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);

  //   // Update the 'search' parameter
  //   if (debouncedSearch) {
  //     params.set("search", debouncedSearch);
  //   } else {
  //     params.delete("search");
  //   }

  //   // Update the 'status' parameter
  //   if (activeTab) {
  //     params.set("status", activeTab);
  //   } else {
  //     params.delete("status");
  //   }

  //   // Preserve other parameters and update the URL
  //   setSearchParams(params);
  // }, [debouncedSearch, activeTab]);


  const { data: ordersData, isLoading, refetch } = useQuery<OrdersResponse>({
    queryKey: [
      "orders",
      {
        page: Number(searchParams.get("page") || 1),
        status: searchParams.get("status") === "all" ? "" : searchParams.get("status") || "",
        search: debouncedSearch,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return fetchOrders(params);
    },
    staleTime: 20000,
    // keepPreviousData: true,
  });


  const handleOrderClick = (order: Order) => {
    // console.log(order)
    setSelectedOrder(order);
    setDetailsDrawerOpen(true);
  };

  // if (isLoading) {
  //   return <div>Loading orders...</div>;
  // }

  // console.log(selectedOrder)

  return (
    <div className="mx-auto py-4 px-4 md:py-8 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">📦 Orders</h1>
        <div className="flex flex-wrap items-center gap-2 justify-between md:justify-between">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="h-8"
            onClick={() => setCreateDrawerOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create order
          </Button>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="space-y-4">
          <OrderTableToolbar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <OrderStatusTab refetch_func={refetch} setSearchParams={setSearchParams} />
          {/* <div className="overflow-x-auto">
            <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} setSearchParams={setSearchParams} />
          </div> */}
          <OrderList
            orders={ordersData?.data || []}
            onOrderClick={handleOrderClick}
            isLoading={isLoading}
          // refetchOrders={refetch}
          />
        </div>
      </div>

      <CreateOrderDrawer
        open={createDrawerOpen}
        onOpenChange={setCreateDrawerOpen}
      />

      <OrderDetailsDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        order={selectedOrder}
      />
    </div>
  );
}

export default OrderComponent;
