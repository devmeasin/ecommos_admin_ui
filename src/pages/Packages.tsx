import { PrimaryLoader } from "@/components/Loader";
import { getPackages } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PricingCard from "../components/custom/PricingCard";
import { Layout } from "@/components/custom/Layout";
import CommonNotFound from "@/components/CommonNotFound";

const fetchPackages = async () => {
    const data = await getPackages();
    return data;
};

export const Packages: React.FC = () => {
    const { data: pricingPlans, isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: fetchPackages,
        staleTime: 30 * 60 * 1000, // Data is fresh for 5 minutes
    });

    if (pricingPlans && !pricingPlans.data.length)
        return (
            <div className="mt-20">
                {" "}
                <CommonNotFound
                    title="No Package Found!."
                    animationName="NotFound"
                    buttonText="Back toHome"
                    buttonLink="/"
                />
            </div>
        );

    return (
        <Layout>
            <Layout.Body>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div>
                        <h4 className="text-3xl text-center mt-5 mb-24 font-bold flex justify-center flex-col">
                            Choose your Package!
                            <span className="border-dotted border-b-4 border-orange-500 w-80 m-auto mt-4"></span>
                        </h4>
                    </div>
                    <div
                        className={`grid gap-${pricingPlans && pricingPlans.data.length >= 4 ? "4" : "8"} sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${pricingPlans && pricingPlans.data.length >= 4 ? "4" : "3"}`}
                    >
                        {pricingPlans &&
                            pricingPlans.data.map((plan: any) => (
                                <PricingCard key={plan.id} {...plan} />
                            ))}
                    </div>
                    {isLoading && (
                        <div className="flex items-center justify-center mt-48">
                            <PrimaryLoader />
                        </div>
                    )}
                </div>
            </Layout.Body>
        </Layout>
    );
};
