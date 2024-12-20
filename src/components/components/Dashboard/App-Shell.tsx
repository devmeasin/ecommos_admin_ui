import { Link, Outlet } from "react-router-dom";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import Sidebar from "../SideBar";
// import { TopNav } from "@/components/Top-Nav";
import { Layout } from "../custom/Layout";
// import { Search } from "../Search";
import ThemeSwitch from "../Theme-Switch";
import { UserNav } from "../User-Nav";
import { RemainingRequests } from "../RemainingRequests";
import { Headset, PhoneCall } from "lucide-react";

export default function AppShell() {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();
    return (
        <div className="relative h-full overflow-hidden bg-background">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <main
                id="content"
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
            >
                <div>
                    <Layout>
                        <Layout.Header>
                            {/* <TopNav links={topNav} /> */}
                            <ContactUs />
                            <div className="ml-auto flex items-center space-x-4">
                                {/* <Search /> */}
                                <RemainingRequests />
                                <ThemeSwitch />
                                <UserNav />
                            </div>
                        </Layout.Header>
                    </Layout>
                </div>

                <Outlet />
            </main>
        </div>
    );
}

export const ContactUs = () => {
    return (
        <div>
            <div className="hidden sm:block ">
                <Link to={"tel:01850463208"}>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2">
                        <Headset />{" "}
                        <span className="font-bold">01850463208</span>
                    </button>
                </Link>
            </div>
            <div className="block sm:hidden">
                <Link to={"tel:01850463208"}>
                    <button className="p-2 bg-green-500 text-gray-700 rounded-full shadow hover:bg-green-600 transition-colors duration-200">
                        <PhoneCall color="#fff" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

// const topNav = [
//     {
//         title: "Overview",
//         href: "dashboard/overview",
//         isActive: true,
//     },
//     {
//         title: "Customers",
//         href: "dashboard/customers",
//         isActive: false,
//     },
//     {
//         title: "Products",
//         href: "dashboard/products",
//         isActive: false,
//     },
//     {
//         title: "Settings",
//         href: "dashboard/settings",
//         isActive: false,
//     },
// ];
