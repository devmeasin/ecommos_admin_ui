import { BillingHistory } from "@/components/Billing";
import CommonNotFound from "@/components/CommonNotFound";
import { Layout } from "@/components/custom/Layout";
import { PrimaryLoader } from "@/components/Loader";
import { billingInfo } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

const getBillingInfo = async () => {
    const { data } = await billingInfo();
    return data;
};

export const Billing = () => {
    const { data: transactions, isLoading } = useQuery({
        queryKey: ["billingInfo"],
        queryFn: getBillingInfo,
        staleTime: 30 * 60 * 1000,
    });

    return (
        <Layout>
            <Layout.Body>
                <div>
                    <div>
                        <h4 className="text-3xl text-center mt-5 mb-10 font-bold flex justify-center flex-col">
                            Payment History
                            <span className="border-dotted border-b-4 border-orange-500 w-64 m-auto mt-4"></span>
                        </h4>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center mt-48">
                            <PrimaryLoader />
                        </div>
                    ) : transactions?.length === 0 ? (
                        <div className="mt-20">
                            <CommonNotFound
                                title="No payment history found."
                                animationName="NoPaymentHistory"
                                buttonText="Buy a plan"
                                buttonLink="/packages"
                            />
                        </div>
                    ) : (
                        <BillingHistory transactions={transactions} />
                    )}
                </div>
            </Layout.Body>
        </Layout>
    );
};
