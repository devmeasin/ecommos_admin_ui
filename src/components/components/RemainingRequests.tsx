import { getUserCurrentPackages } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Infinity, PackageX } from "lucide-react";

const fetchUserCurrentPackage = async () => {
    const { data } = await getUserCurrentPackages();
    return data;
};

export const RemainingRequests = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["userCurrentPackage"],
        queryFn: fetchUserCurrentPackage,
        staleTime: 30 * 60 * 1000,
    });

    const plan = data?.userCurrentPackage?.[0];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data.</div>;

    return (
        <div>
            {plan ? (
                plan && !plan.isUnlimited ? (
                    <div className="mb-2">
                        <p className="flex justify-between">
                            <span>Used Requests:</span>
                            <span>
                                {plan.usedRequests} /{" "}
                                {plan.remainingRequests + plan.usedRequests}
                            </span>
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className={`${(plan.usedRequests / (plan.usedRequests + plan.remainingRequests)) * 100 < 80 ? "bg-blue-600" : "bg-red-600"} h-2.5 rounded-full`}
                                style={{
                                    width: `${(plan.usedRequests / (plan.usedRequests + plan.remainingRequests)) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <h5 className="font-bold flex">
                        <Infinity className="mr-2" /> {plan.packageName}
                    </h5>
                )
            ) : (
                <h5 className="font-bold flex">
                    <PackageX className="mr-2" /> No Active Plan
                </h5>
            )}
        </div>
    );
};
