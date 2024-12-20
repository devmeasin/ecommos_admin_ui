import { useIsVerified } from "@/hooks/use_isVerified";
import { IAuthStore, useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

export const NonVerified = () => {
    const { user } = useAuthStore() as IAuthStore;
    const { isVerified } = useIsVerified();

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (isVerified(user)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
