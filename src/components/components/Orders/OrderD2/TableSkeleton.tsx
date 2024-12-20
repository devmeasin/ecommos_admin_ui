import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableSkeleton() {
  return (
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
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-4 w-[80px]" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-8 w-8 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

