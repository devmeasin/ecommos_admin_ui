interface OrderStatusTabProps {
    setSearchParams: (params: { [key: string]: string }) => void;
    refetch_func: () => void;
  }
import {
    BadgeCheck,
    ChartPie,
    Egg,
    ListTree,
    Package,
    PackageCheck,
    PackageX,
    Send,
    ShipWheel,
    Shuffle,
    Truck,
} from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OrderStatusTab = ({ refetch_func, setSearchParams } : OrderStatusTabProps) => {
    const [searchParams] = useSearchParams();
    const statusFromURL = searchParams.get("status") || "all";

    const tabs = [
        { label: "All", icon: <ListTree />, status: "all", content: "Tab content 1" },
        { label: "PENDING", icon: <ChartPie />, status: "pending", content: "Tab content 2" },
        { label: "ON_HOLD", icon: <Egg />, status: "on_hold", content: "Tab content 3" },
        { label: "APPROVED", icon: <BadgeCheck />, status: "approved", content: "Tab content 4" },
        { label: "PROCESSING", icon: <Package />, status: "processing", content: "Tab content 5" },
        { label: "SHIPPED", icon: <ShipWheel />, status: "shipped", content: "Tab content 5" },
        { label: "IN_TRANSIT", icon: <Truck />, status: "in_transit", content: "Tab content 6" },
        { label: "DELIVERED", icon: <PackageCheck />, status: "delivered", content: "Tab content 7" },
        { label: "RTO", icon: <Send />, status: "rto", content: "Tab content 8" },
        { label: "RETURNED", icon: <Shuffle />, status: "returned", content: "Tab content 9" },
        { label: "CANCELLED", icon: <PackageX />, status: "cancelled", content: "Tab content 10" },
    ];

    // Find the tab index based on the status from the URL
    const activeTabIndex = tabs.findIndex((tab) => tab.status === statusFromURL);

    useEffect(() => {
        if (activeTabIndex === -1) {
            setSearchParams({ status: "all" });
            refetch_func();
        }
    }, [activeTabIndex, setSearchParams, refetch_func]);

    const handleTabClick = (index: number) => {
        const status = tabs[index]?.status || "all";
        setSearchParams({ status });
    };

    return (
        <div className="w-full mx-auto space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-300 dark:border-gray-600">
                <ul className="flex overflow-x-auto items-center gap-2 text-sm font-medium no-scrollbar">
                    {tabs.map((tab, index) => (
                        <li key={index} className="flex">
                            <button
                                onClick={() => handleTabClick(index)}
                                className={`relative whitespace-nowrap rounded-lg px-4 py-2 transition-all hover:text-blue-600 ${activeTabIndex === index
                                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-blue-600"
                                        : "text-gray-500"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab.icon}
                                    <span className="hidden md:inline">{tab.label}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            {/* <div className="rounded-lg bg-gray-50 p-6 shadow-md">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`${activeTabIndex === index
                                ? "block opacity-100 translate-y-0"
                                : "hidden opacity-0 -translate-y-2"
                            } transition-all duration-300`}
                    >
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                            {tab.label}
                        </h3>
                        <p className="text-gray-600">{tab.content}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default OrderStatusTab;
