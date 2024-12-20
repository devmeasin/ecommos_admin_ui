import { PrimaryLoader } from "@/components/Loader";
import { self } from "@/http/api";
import { IAuthStore, useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { initPostHog } from "../../../posthog";

const getSelf = async () => {
    const { data } = await self();
    return data;
};

export const Root = () => {
    const { setUser } = useAuthStore() as IAuthStore;

    const { data, isLoading } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        retry: 1,
    });

    useEffect(() => {
        if (data) setUser(data);
    }, [data, setUser]);

    useEffect(() => {
        initPostHog();
    }, []);

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <PrimaryLoader />
            </div>
        );

        return  <Outlet />
};
