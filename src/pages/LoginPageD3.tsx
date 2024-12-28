import PhoneInput from "@/components/custom/BDPhoneNumber";
import PasswordInput from "@/components/custom/Password-Input";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useIsVerified } from "@/hooks/use_isVerified";
import { login, self } from "@/http/api";
import { IAuthStore, useAuthStore } from "@/store";
import { TCredentails } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

import { getImageUrl } from "../config/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";

const loginUser = async (userData: TCredentails) => {
    const { data } = await login(userData);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

export function LoginPageD3() {
    const { setUser } = useAuthStore() as IAuthStore;
    const { isVerified } = useIsVerified();

    const form = useForm({
        initialValues: {
            phone: "0", // Start phone number with 0
            password: "",
        },
        validate: {
            phone: (value) =>
                value.length === 11 && /^01[3-9]\d{8}$/.test(value)
                    ? null
                    : "Invalid Bangladeshi phone number, must be 11 digits starting with 01.",
            password: (value) =>
                value.length > 3
                    ? null
                    : "Password must be at least 4 characters",
        },
    });

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["loginuser"],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);

            if (!isVerified(selfDataPromise.data)) {
                <Navigate to="/verify" replace />;
            }
            toast.success("User login Successfully");
        },
        onError: () => {
            toast.error("🚫 Phone or password is incorrect!");
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate form before submitting
        if (form.validate().hasErrors) {
            if (form.errors.phone)
                toast.error("🇧🇩 phone number must be 11 digits");
            if (form.errors.password)
                toast.error("🔒 password must at least 8 characters");
        } else {
            mutate(form.values);
        }
    };

    return (

        <div>
            <div className="absolute inset-0 h-full w-full bg-white dark:bg-gray-800 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0  m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>


                <div className="relative overflow-hidden h-screen">
                    <div className="grid grid-cols-12 gap-3 h-screen ">
                        <div className="xl:col-span-8 lg:col-span-7 col-span-12 bg-lightprimary dark:bg-lightprimary lg:block hidden relative overflow-hidden z-50">
                            <div className="flex justify-center h-screen items-center z-10 relative">
                                <div className="xl:w-5/12 lg:w-10/12 xl:px-0 px-6">
                                    <LazyLoadImage effect="blur" width="100%" height="100%" alt="auth-bg" loading="lazy" decoding="async" data-nimg="1" className="w-full" src={getImageUrl("auth", "shield")} />
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 lg:col-span-5 col-span-12 sm:px-12 p-5">
                            <div className="flex justify-end">
                                <ThemeSwitch />
                            </div>
                            <div className="flex h-screen items-center px-3 lg:justify-start justify-center">
                                <div className="max-w-[420px] w-full mx-auto">
                                    <LazyLoadImage effect="blur" width="100%" height="100%" className="w-1/4 mx-auto rounded-full ring-2 dark:ring-white ring-yellow-500" src={getImageUrl("logos", "light")} alt="logo" />
                                    <h3 className="text-2xl font-bold my-3 text-center">Welcome to eCommOS</h3>
                                    <div
                                        className="h-1 sm:w-2/3  m-auto text-[#ccc] my-2"
                                        role="separator"
                                        style={{
                                            background: "linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 8px 1px repeat-x",
                                        
                                        }}
                                    ></div>

                                    {/* <p className="text-darklink text-sm font-medium">Your Admin Dashboard</p> */}

                                    <form
                                        onSubmit={handleSubmit}
                                        className="grid gap-4"
                                    >
                                        <div className="grid gap-2">
                                            <PhoneInput form={form} />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                                <Link
                                                    to={"/auth/forgot_password"}
                                                    className="ml-auto inline-block text-sm underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <PasswordInput form={form} />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isPending}
                                        >
                                            {isPending && (
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-6 w-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        stroke-width="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            )}
                                            Login
                                        </Button>
                                    </form>

                                    <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                                        <p>New to eCommOS?</p>
                                        <Link className="text-primary text-sm font-medium" to="/auth/register">Create an account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
