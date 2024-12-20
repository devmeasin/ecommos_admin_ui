import { IAuthStore, useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const NonAuth = () => {
    const location = useLocation();
    const { user } = useAuthStore() as IAuthStore;

    const returnTo =
        new URLSearchParams(location.search).get("returnTo") || "/";

    if (user) {
        // Store the current URL in the state before redirecting
        return <Navigate to={returnTo} replace />;
    }
    return <Outlet />;
};
