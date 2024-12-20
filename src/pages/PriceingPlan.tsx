import CommonNotFound from "@/components/CommonNotFound";
import { Layout } from "@/components/custom/Layout";
import { PrimaryLoader } from "@/components/Loader";
import { getPackages, initiatePayment } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

// Dummy data for the packages
// const packages = [
//     {
//         title: '7 দিনের ট্রায়াল',
//         price: 'ফ্রি',
//         duration: '7 Days',
//         features: [
//             '৭ দিনের জন্য বিনামূল্যে ব্যবহার করুন',
//             'আনলিমিটেড ফোন নাম্বার চেক*',
//             'ওয়ার্ডপ্রেস প্লাগইন সুবিধা',
//             'ক্রোম এক্সটেনশন সুবিধা',
//             'ওয়েব অ্যাপ্লিকেশন সুবিধা',
//             'ফ্রি ইন্সটলেশন সুবিধা',
//         ],
//         unavailableFeatures: [
//             '২৪/৭ সাপোর্ট সুবিধা',
//             'কাস্টম ইন্টিগ্রেশন সুবিধা',
//         ],
//         isFree: true,
//         isPopular: false,
//     },
//     {
//         title: '১ মাস',
//         price: '২৪৯ ৳',
//         duration: '৩০ দিনের এক্সেস',
//         features: [
//             '৩০ দিনের জন্য ব্যবহার করুন',
//             'আনলিমিটেড ফোন নাম্বার চেক*',
//             'ওয়ার্ডপ্রেস প্লাগইন সুবিধা',
//             'ক্রোম এক্সটেনশন সুবিধা',
//             'ওয়েব অ্যাপ্লিকেশন সুবিধা',
//             'ফ্রি ইন্সটলেশন সুবিধা',
//             '২৪/৭ সাপোর্ট সুবিধা',
//             'কাস্টম ইন্টিগ্রেশন সুবিধা {REST API}',
//         ],
//         isFree: false,
//         isPopular: false,
//     },
//     {
//         title: '৬ মাস',
//         price: '১৩৪৯ ৳',
//         duration: '৬ মাসের এক্সেস',
//         discount: '🚀 ১০% সেভিং, প্রতি মাসে ২২৫ ৳',
//         features: [
//             '৩৬৫ দিনের জন্য ব্যবহার করুন',
//             'আনলিমিটেড ফোন নাম্বার চেক*',
//             'ওয়ার্ডপ্রেস প্লাগইন সুবিধা',
//             'ক্রোম এক্সটেনশন সুবিধা',
//             'ওয়েব অ্যাপ্লিকেশন সুবিধা',
//             'ফ্রি ইন্সটলেশন সুবিধা',
//             '২৪/৭ সাপোর্ট সুবিধা',
//             'কাস্টম ইন্টিগ্রেশন সুবিধা {REST API}',
//         ],
//         isFree: false,
//         isPopular: false,
//     },
//     {
//         title: '১ বছর',
//         price: '২৫৪৯ ৳',
//         duration: '১২ মাসের এক্সেস',
//         discount: '🚀 ১৫% সেভিং, প্রতি মাসে ২১২ ৳',
//         features: [
//             '৩৬৫ দিনের জন্য ব্যবহার করুন',
//             'আনলিমিটেড ফোন নাম্বার চেক*',
//             'ওয়ার্ডপ্রেস প্লাগইন সুবিধা',
//             'ক্রোম এক্সটেনশন সুবিধা',
//             'ওয়েব অ্যাপ্লিকেশন সুবিধা',
//             'ফ্রি ইন্সটলেশন সুবিধা',
//             '২৪/৭ সাপোর্ট সুবিধা',
//             'কাস্টম ইন্টিগ্রেশন সুবিধা {REST API}',
//         ],
//         isFree: false,
//         isPopular: true,
//     },
// ];

const fetchPackages = async () => {
    const data = await getPackages();
    return data;
};

function PricingSection() {
    const { data: pricingPlans, isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: fetchPackages,
        staleTime: 30 * 60 * 1000, // Data is fresh for 5 minutes
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
            alert("Failed to initiate payment. error: " + error);
        }
    };

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

    console.log(pricingPlans);

    return (
        <Layout>
            <Layout.Body>
                <section id="#pricing" className="w-full py-16 lg:py-16 ">
                    <div className="container px-4 mx-auto max-w-7xl">
                        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                            আমাদের প্যাকেজ সমূহ
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10 text-lg">
                            🚀 দৈনিক ৮ টাকা বিনিয়োগ করুন, হাজার হাজার টাকা
                            সুরক্ষিত রাখুন!
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {pricingPlans &&
                                pricingPlans.data.map((pkg, index) => (
                                    <div
                                        key={index}
                                        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col h-full overflow-hidden border-2 ${
                                            pkg.isPopular
                                                ? "border-primary"
                                                : "border-gray-200 dark:border-gray-700"
                                        }`}
                                    >
                                        <div className="p-6 relative">
                                            {pkg.isPopular && (
                                                <div className="absolute top-0 right-0 bg-primary text-white dark:text-black py-1 px-2 rounded-bl-lg text-sm">
                                                    সবচেয়ে জনপ্রিয়
                                                </div>
                                            )}
                                            <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                                                {pkg.name}
                                            </h3>
                                            <div className="text-center mb-4">
                                                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                                    {pkg.priceText}{" "}
                                                </span>
                                                <span className="text-gray-600 dark:text-gray-400 text-sm block">
                                                    {pkg.duration}
                                                </span>
                                                {pkg.discount && (
                                                    <span className="text-xs block mt-1 text-primary">
                                                        {pkg.discount}
                                                    </span>
                                                )}
                                            </div>
                                            <ul className="mb-4 space-y-2">
                                                {pkg.features.map(
                                                    (feature, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="lucide lucide-check h-4 w-4 text-green-500 mr-2 flex-shrink-0"
                                                            >
                                                                <path d="M20 6 9 17l-5-5"></path>
                                                            </svg>
                                                            <span>
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                                {pkg.unavailableFeatures &&
                                                    pkg.unavailableFeatures.map(
                                                        (feature, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-center text-sm text-gray-400 dark:text-gray-600"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="lucide lucide-x h-4 w-4 text-red-500 mr-2 flex-shrink-0"
                                                                >
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                                <span>
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                            </ul>
                                        </div>
                                        <div className="p-6 bg-gray-50 dark:bg-gray-800 mt-auto">
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        handlePayment(pkg.id)
                                                    }
                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-300 relative overflow-hidden isolate bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                                >
                                                    {pkg.isFree
                                                        ? "বিনামূল্যে শুরু করুন"
                                                        : "প্ল্যান নির্বাচন করুন"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="text-center mt-8  text-gray-600 dark:text-gray-400 text-md font-semibold">
                            * আকাউন্ট শেয়ারিং অথবা অপ্রত্যাশিত ব্যবহারের জন্য
                            আপনার অ্যাকাউন্টি স্থগিত করা হতে পারে।
                        </div>

                        {isLoading && (
                            <div className="flex items-center justify-center mt-48">
                                <PrimaryLoader />
                            </div>
                        )}
                    </div>
                </section>
            </Layout.Body>
        </Layout>
    );
}

export default PricingSection;
