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
            className="absolute left-0 top-0 h-full bg-green-500 dark:bg-green-400 flex items-center justify-center"
            initial={{ width: 0 }}
            animate={{ width: `${success}%` }}
            transition={{ duration: 1 }}
        >
            {ifShow && (
                <span className="text-white text-xs font-bold">{`${Math.round(success)}%`}</span>
            )}
        </motion.div>
        <div
            className="absolute left-0 top-0 h-full bg-red-500 dark:bg-red-400 text-center text-white text-xs font-bold flex items-center justify-center"
            style={{ width: `${returned}%`, left: `${success}%` }}
        >
            <span>{`${Math.round(returned)}%`}</span>
        </div>
    </div>
);

const FraudSection = ({ courierData }: TableReviewsProps) => {
    // Calculate total delivered and returned for the ProgressBar
    const totalDelivered = Object.values(courierData).reduce(
        (sum, stats) => sum + stats.delivered,
        0,
    );
    const totalReturned = Object.values(courierData).reduce(
        (sum, stats) => sum + stats.returned,
        0,
    );
    const totalParcels = Object.values(courierData).reduce(
        (sum, stats) => sum + stats.total,
        0,
    );

    return (
        <div className="sm:mb-0 mb-10">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-center">
                Customer Report 📦
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 font-semibold">
                <div className="p-2 bg-yellow-200 text-yellow-900 text-center rounded dark:bg-yellow-500 dark:text-yellow-100 flex items-center justify-center">
                    <Package className="mr-2" /> Total Parcels:{" "}
                    {courierData?.Total.total}
                </div>
                <div className="p-2 bg-green-200 text-green-900 text-center rounded dark:bg-green-500 dark:text-green-100 flex items-center justify-center">
                    <Truck className="mr-2" /> Total Delivered:{" "}
                    {courierData?.Total.delivered}
                </div>
                <div className="p-2 bg-red-200 text-red-900 text-center rounded dark:bg-red-500 dark:text-red-100 flex items-center justify-center">
                    <CornerDownLeft className="mr-2" /> Total Returned:{" "}
                    {courierData?.Total.returned}
                </div>
            </div>

            <div className="mt-6 border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-5 gap-4 text-center py-2 font-bold dark:text-white text-sm sm:text-base">
                    <p>কুরিয়ার</p>
                    <p>অর্ডার</p>
                    <p>ডেলিভারি</p>
                    <p>বাতিল</p>
                    <p>⚙️ হার</p>
                </div>

                <div className="space-y-2">
                    {/* Mapping over the data to create the rows dynamically */}
                    {Object.entries(courierData).map(
                        ([courier, stats], index) => {
                            // Skip the "Total" row
                            if (courier === "Total") return null;

                            let successRatio = stats.successRatio;

                            // Check if the success ratio needs to be replaced with 0%
                            if (successRatio === "New Customer 100%") {
                                successRatio = "0%";
                            }

                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-5 gap-4 items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
                                >
                                    {/* Conditionally render the image source based on courier name */}
                                    <img
                                        src={`/assets/courier_img/${courier.toLowerCase()}.svg`} // Correct path
                                        alt={courier}
                                        className="w-16 mx-auto filter dark:invert"
                                    />
                                    <p className="dark:text-white">
                                        {stats.total}
                                    </p>
                                    <p className="dark:text-white">
                                        {stats.delivered}
                                    </p>
                                    <p className="dark:text-white">
                                        {stats.returned}
                                    </p>
                                    <p className="text-xs sm:text-base dark:text-white">
                                        {successRatio}
                                    </p>
                                </div>
                            );
                        },
                    )}

                    {/* Display the ProgressBar with total calculations */}
                    <div className="mt-4">
                        <ProgressBar
                            success={calculateSuccessRatio(
                                totalDelivered,
                                totalParcels,
                            )}
                            returned={calculateReturnRatio(
                                totalReturned,
                                totalParcels,
                            )}
                            ifShow={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FraudSection;
