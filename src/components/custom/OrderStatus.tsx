import { changeOrderStatus } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { string } from "zod";

// Define a type for valid statuses
type Status =
  | "pending"
  | "on_hold"
  | "approved"
  | "processing"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "returned"
  | "flagged"
  | "cancelled";

const orderStatusChange = async (orderId: string, status: Status) => {
  const { data } = await changeOrderStatus(orderId, status);
  return data;
};

export default function OrderStatus({
  status,
  orderId,
}: {
  status: string;
  orderId: string;
}) {
  // Normalize the initial status to lower case
  const initialStatus = status.toLowerCase() as Status;
  const [selectedStatus, setSelectedStatus] = useState<Status>(initialStatus);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["changeStatus", orderId],
    mutationFn: ({ orderId, status }: { orderId: string; status: Status }) =>
      orderStatusChange(orderId, status),
    onSuccess: () => {
      toast.success("Order status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });

  const statusStyles: Record<Status, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    on_hold: "bg-orange-100 text-orange-700",
    approved: "bg-blue-100 text-blue-700",
    processing: "bg-indigo-100 text-indigo-700",
    shipped: "bg-teal-100 text-teal-700",
    in_transit: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    flagged: "bg-red-100 text-red-700",
    returned: "bg-pink-100 text-red-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<Status, string> = {
    pending: "Pending",
    on_hold: "On Hold",
    approved: "Approved",
    processing: "Processing",
    shipped: "Shipped",
    in_transit: "In Transit",
    delivered: "Delivered",
    flagged: "Flagged",
    returned : "Returned",
    cancelled: "Cancelled",
  };

  const isStatusChangeDisabled = [
    "shipped",
    "in_transit",
    "delivered",
  ].includes(selectedStatus);

  const handleStatusChange = (value: Status) => {
    if (isStatusChangeDisabled) return;

    setSelectedStatus(value); // Update UI immediately
    mutate({ orderId, status: value.toLocaleUpperCase() }); // Trigger the mutation
  };

  return (
    <div className="w-36" onClick={(e) => e.stopPropagation()}>
      <Select
        value={selectedStatus}
        onValueChange={(value) => handleStatusChange(value as Status)}
        disabled={isStatusChangeDisabled}
      >
        <SelectTrigger
          className={`flex items-center justify-between border border-gray-300 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
          ${
            selectedStatus
              ? `${statusStyles[selectedStatus]} border-none focus:ring-0`
              : "bg-gray-100 text-gray-700"
          } ${
            isStatusChangeDisabled
              ? "cursor-not-allowed opacity-70"
              : "hover:shadow-md"
          }`}
        >
          <span className="truncate">{statusLabels[selectedStatus]}</span>
        </SelectTrigger>
        {!isStatusChangeDisabled && (
          <SelectContent className="shadow-xl border border-gray-200 mt-1 rounded-lg">
            {Object.entries(statusStyles).map(([value, styles]) => (
              <SelectItem
                key={value}
                value={value}
                className={`flex items-center py-2 px-4 transition-colors duration-150 cursor-pointer rounded-lg hover:opacity-90 hover:shadow-sm`}
              >
                {statusLabels[value as Status]}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
      {isLoading && (
        <p className="text-sm text-gray-500 mt-2">Updating status...</p>
      )}
    </div>
  );
}
