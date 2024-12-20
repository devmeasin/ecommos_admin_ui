import { useQuery } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '../../../hooks/useDebounce';
import { OrderDrawer } from './OrderDrawer';
import { TableSkeleton } from './TableSkeleton';
import { OrderQueryParams, OrderStatus, OrdersResponse } from './types.ts';
import { getAllOrders } from '@/http/api.ts';

const statusOptions = Object.values(OrderStatus);

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


export default function OrdersTables() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<OrderStatus>(OrderStatus.ALL);
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const debouncedSearch = useDebounce(search, 500);

    const {
        data: ordersData,
        isLoading,
        error,
    } = useQuery<OrdersResponse>({
        queryKey: ['orders', page, statusFilter, debouncedSearch],
        queryFn: () =>
            fetchOrders({
                page,
                limit: 20,
                status: statusFilter === OrderStatus.ALL ? '' : statusFilter,
                search: debouncedSearch,
            }),
    });

    if (error) {
        return <div>Error loading orders</div>;
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between space-x-2 pb-4">
                <div className="flex flex-1 items-center space-x-2">
                    <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as OrderStatus)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Search orders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            </div>
            <div className="rounded-md border">
                {isLoading ? (
                    <TableSkeleton />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ordersData && ordersData?.data.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedOrder(order.id)}
                                >
                                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span
                                                className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(
                                                    order.status
                                                )}`}
                                            />
                                            {order.status}
                                        </div>
                                    </TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        $ {order.amounts.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View details</DropdownMenuItem>
                                                <DropdownMenuItem>Update status</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <OrderDrawer
                orderId={selectedOrder}
                open={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}

function getStatusColor(status: Exclude<OrderStatus, 'ALL'>) {
    const colors: Record<Exclude<OrderStatus, 'ALL'>, string> = {
        [OrderStatus.PENDING]: 'bg-yellow-500',
        [OrderStatus.APPROVED]: 'bg-blue-500',
        [OrderStatus.SHIPPED]: 'bg-purple-500',
        [OrderStatus.IN_TRANSIT]: 'bg-orange-500',
        [OrderStatus.DELIVERED]: 'bg-green-500',
        [OrderStatus.RETURNED]: 'bg-red-500',
        [OrderStatus.CANCELLED]: 'bg-gray-500',
    };
    return colors[status];
}

