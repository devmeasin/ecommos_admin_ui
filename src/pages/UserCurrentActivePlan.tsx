import CommonNotFound from "@/components/CommonNotFound";
import { PrimaryLoader } from "@/components/Loader";
import { Layout } from "@/components/custom/Layout";
import { getUserCurrentPackages, initiatePayment } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const fetchUserCurrentPackage = async () => {
    const { data } = await getUserCurrentPackages();
    return data;
};

const UserCurrentActivePlan: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["userCurrentPackage"],
        queryFn: fetchUserCurrentPackage,
        staleTime: 30 * 60 * 1000,
    });

    const handlePayment = async (packageId: string) => {
        try {
            const { data } = await initiatePayment(packageId);

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl; // Redirect to bKash hosted page
            } else {
                throw new Error(data.message || "Failed to initiate payment");
            }
        } catch (error) {
            alert("Failed to initiate payment.");
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center mt-48">
                <PrimaryLoader />
            </div>
        );
    if (error) return <div className="text-red-600">Error fetching data.</div>;

    const activePlans = data?.userCurrentPackage.filter(
        (plan: any) => plan.isActive && plan.packageName !== "Package Deleted",
    );

    if (!activePlans.length)
        return (
            <div className="mt-20">
                {" "}
                <CommonNotFound
                    title="No Active Plans Found!."
                    animationName="NotFound"
                    buttonText="Buy a plan"
                    buttonLink="/packages"
                />
            </div>
        );

    return (
        <Layout>
            <Layout.Body>
                <div className="p-2 md:p-6 space-y-6 max-w-4xl mx-auto mb-10">
                    {activePlans.map((plan: any) => (
                        <div
                            key={plan._id}
                            className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 transform hover:scale-[1.02] transition-transform duration-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-indigo-600">
                                    {plan.isUnlimited ? (
                                        plan.packageName || ""
                                    ) : (
                                        <Tooltip content={plan.packageName}>
                                            {`Plan: ${plan.packageName.substring(0, 7)}..`}
                                        </Tooltip>
                                    )}
                                </h2>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${plan.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                    {plan.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 space-y-2">
                                <p>
                                    <strong>Purchased on:</strong>{" "}
                                    {dayjs(plan.purchaseDate).format(
                                        "MMMM D, YYYY",
                                    )}
                                </p>
                                <p>
                                    <strong>Expires on:</strong>{" "}
                                    {dayjs(plan.expiryDate).format(
                                        "MMMM D, YYYY",
                                    )}
                                </p>
                                {!plan.isUnlimited && (
                                    <div className="mt-4">
                                        <div className="mb-2">
                                            <p className="flex justify-between">
                                                <span>Used Requests:</span>
                                                <span>{plan.usedRequests}</span>
                                            </p>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{
                                                        width: `${(plan.usedRequests / (plan.usedRequests + plan.remainingRequests)) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="flex justify-between">
                                                <span>Remaining Requests:</span>
                                                <span>
                                                    {plan.remainingRequests}
                                                </span>
                                            </p>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div
                                                    className="bg-green-500 h-2.5 rounded-full"
                                                    style={{
                                                        width: `${(plan.remainingRequests / (plan.usedRequests + plan.remainingRequests)) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <Link to={"/packages"}>
                                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition-colors duration-200">
                                        Upgrade Plan
                                    </button>
                                </Link>
                                <button
                                    onClick={() =>
                                        handlePayment(plan.packageId)
                                    }
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Renew Plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    );
};

const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
    content,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span
            className="relative cursor-pointer"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute z-10 p-2 text-sm bg-gray-800 text-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-full mt-1">
                    {content}
                </div>
            )}
        </span>
    );
};

export default UserCurrentActivePlan;
