import { CourierData } from "@/types";
import { motion } from "framer-motion";
import { CornerDownLeft, Package, Truck } from "lucide-react";

type TableReviewsProps = {
    courierData: CourierData;
};

const calculateSuccessRatio = (delivered: number, total: number) =>
    total > 0 ? (delivered / total) * 100 : 0;

const calculateReturnRatio = (returned: number, total: number) =>
    total > 0 ? (returned / total) * 100 : 0;

const ProgressBar = ({
    success,
    returned,
    ifShow = false,
    height = "normal",
}: {
    success: number;
    returned: number;
    ifShow?: boolean;
    height?: "small" | "normal";
}) => (
    <div
        className={`relative w-full ${height === "small" ? "h-2" : "h-4"} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
    >
        <motion.div
            className="absolute left-0 top-0 h-full bg-green-500 flex items-center justify-center"
            initial={{ width: 0 }}
            animate={{ width: `${success}%` }}
            transition={{ duration: 1 }}
        >
            {ifShow && (
                <span className="text-white text-xs font-bold">{`${Math.round(success)}% Delivered`}</span>
            )}
        </motion.div>
        <div
            className="absolute left-0 top-0 h-full bg-red-500"
            style={{ width: `${returned}%`, left: `${success}%` }}
        />
    </div>
);

const CourierReport = ({ courierData }: TableReviewsProps) => {
    const courierEntries = Object.entries(courierData);

    const totalParcels = courierData.Total.total;
    const totalDelivered = courierData.Total.delivered;
    const totalReturned = courierData.Total.returned;

    return (
        <div className="p-1 lg:p-4 md:p-4 :!p-4  bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-center">
                Customer Report 📦
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 font-semibold">
                <div className="p-2 bg-yellow-200 text-yellow-900 text-center rounded dark:bg-yellow-500 dark:text-yellow-100 flex items-center justify-center">
                    <Package className="mr-2" /> Total Parcels: {totalParcels}
                </div>
                <div className="p-2 bg-green-200 text-green-900 text-center rounded dark:bg-green-500 dark:text-green-100 flex items-center justify-center">
                    <Truck className="mr-2" /> Total Delivered: {totalDelivered}
                </div>
                <div className="p-2 bg-red-200 text-red-900 text-center rounded dark:bg-red-500 dark:text-red-100 flex items-center justify-center">
                    <CornerDownLeft className="mr-2" /> Total Returned:{" "}
                    {totalReturned}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mb-4">
                    <thead>
                        <tr className="dark:text-gray-200">
                            <th className="border-b-2 p-2 dark:border-gray-600">
                                Courier
                            </th>
                            <th className="border-b-2 p-2 dark:border-gray-600">
                                Order
                            </th>
                            <th className="border-b-2 p-2 dark:border-gray-600">
                                Delivered
                            </th>
                            <th className="border-b-2 p-2 dark:border-gray-600">
                                Returned
                            </th>
                            <th className="border-b-2 p-2 dark:border-gray-600">
                                Success
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courierEntries.map(([name, courier]) => {
                            const successRatio = calculateSuccessRatio(
                                courier.delivered,
                                courier.total,
                            );
                            const returnRatio = calculateReturnRatio(
                                courier.returned,
                                courier.total,
                            );

                            return (
                                <tr key={name} className="dark:text-gray-300">
                                    <td className="border-b p-2 dark:border-gray-600">
                                        {name}
                                    </td>
                                    <td className="border-b p-2 dark:border-gray-600">
                                        {courier.total}
                                    </td>
                                    <td className="border-b p-2 dark:border-gray-600">
                                        {courier.delivered}
                                    </td>
                                    <td className="border-b p-2 dark:border-gray-600">
                                        {courier.returned}
                                    </td>
                                    <td className="border-b p-2 w-32 dark:border-gray-600">
                                        <ProgressBar
                                            success={successRatio}
                                            returned={returnRatio}
                                            height="small"
                                        />
                                        <div className="flex justify-between mt-1 text-sm">
                                            <span className="text-green-700 dark:text-green-400">
                                                {Math.round(successRatio)}%
                                            </span>
                                            <span className="text-red-700 dark:text-red-400">
                                                {Math.round(returnRatio)}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between">
                <ProgressBar
                    success={calculateSuccessRatio(
                        totalDelivered,
                        totalParcels,
                    )}
                    returned={calculateReturnRatio(totalReturned, totalParcels)}
                    ifShow={true}
                />
            </div>
        </div>
    );
};

export default CourierReport;
