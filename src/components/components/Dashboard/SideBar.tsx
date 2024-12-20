// src/components/DashboardSideBar.tsx

import { Badge } from "@/components/ui/badge";
import {
    History,
    Home,
    PackagePlus,
    ReceiptIndianRupee,
    ShieldHalf,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const DashboardSideBar = () => {
    const location = useLocation();

    // Function to check if the link is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                    to="/"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/")
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <Home className="h-4 w-4" />
                    Dashboard
                </Link>
                <Link
                    to="/fraud_checker"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/fraud_checker")
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <ShieldHalf className="h-4 w-4" />
                    Fraud Check
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                    </Badge>
                </Link>
                <Link
                    to="/check_history"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/check_history")
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <History className="h-4 w-4" />
                    Check History
                </Link>
                <Link
                    to="/packages"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/packages")
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <PackagePlus className="h-4 w-4" />
                    Packages
                </Link>
                <Link
                    to="/billing"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/billing")
                            ? "bg-muted text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <ReceiptIndianRupee className="h-4 w-4" />
                    Billing
                </Link>
            </nav>
        </div>
    );
};
