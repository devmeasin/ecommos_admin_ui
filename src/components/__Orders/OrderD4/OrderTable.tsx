import React, { useState } from "react";
import { Table, useTable } from "@tanstack/react-table";
import { Drawer } from "./OrderDrawer";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
export const ordersData = [
    {
      id: "1",
      order: "MacBook Air (M1, 2022)",
      customer: "Darrell Steward",
      date: "Apr 19, 08:01 AM",
      total: "$1,099.00",
      paymentStatus: "Pending",
      items: 1,
      deliveryMethod: "Free Shipping",
    },
    {
      id: "2",
      order: "MacBook Pro 13-inch",
      customer: "Courtney Henry",
      date: "Apr 19, 09:15 AM",
      total: "$2,198.00",
      paymentStatus: "Completed",
      items: 2,
      deliveryMethod: "Free Shipping",
    },
    // Add more sample data...
  ];
  

const OrdersTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    { accessor: "order", header: "Order" },
    { accessor: "customer", header: "Customer" },
    { accessor: "date", header: "Date" },
    { accessor: "total", header: "Total" },
    { accessor: "paymentStatus", header: "Payment Status" },
    { accessor: "items", header: "Items" },
    { accessor: "deliveryMethod", header: "Delivery Method" },
  ];

  const tableInstance = useTable({ columns, data: ordersData });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex gap-4">
          <Button variant="ghost">Export</Button>
          <Button>Create Order</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="px-4 py-2 border rounded-md shadow-sm"
        />
        <Button variant="outline">Filter</Button>
      </div>

      {/* Orders Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table {...tableInstance.getTableProps()} className="w-full">
          <thead>
            {tableInstance.headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="p-4 text-left">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...tableInstance.getTableBodyProps()}>
            {tableInstance.rows.map((row) => {
              tableInstance.prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    setSelectedOrder(row.original);
                    setDrawerOpen(true);
                  }}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={tableInstance.previousPage}>Previous</Button>
        <Button onClick={tableInstance.nextPage}>Next</Button>
      </div>

      {/* Order Details Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {selectedOrder && (
          <div className="p-6">
            <h2 className="text-lg font-bold">{selectedOrder.order}</h2>
            <p>Customer: {selectedOrder.customer}</p>
            <p>Date: {selectedOrder.date}</p>
            <p>Total: {selectedOrder.total}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default OrdersTable;
