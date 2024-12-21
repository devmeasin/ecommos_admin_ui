import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register, self } from "@/http/api";
import { useAuthStore } from "@/store";
import { TCredentailsRegister } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";

import PhoneInput from "@/components/custom/BDPhoneNumber";
import PasswordInput from "@/components/custom/Password-Input";
import { useIsVerified } from "@/hooks/use_isVerified";
import { IAuthStore } from "@/store";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { ThemeSwitch } from "@/components/theme-switch";
import React from "react";

const registerUser = async (userData: TCredentailsRegister) => {
    // API call to submit form
    const { data } = await register(userData);
    return data;
};

const getSelf = async () => {
    // API call to submit form
    const { data } = await self();
    return data;
};

export function RegisterPageD2() {
    const { setUser } = useAuthStore() as IAuthStore;
    const { isVerified } = useIsVerified();

    const form = useForm({
        initialValues: {
            fullName: "",
            companyName: "",
            companyWebsite: "",
            phone: "",
            email: "",
            password: "",
        },
        validate: {
            fullName: (value) => (value.length > 3 ? null : "Name is required"),
            companyName: (value) =>
                value.length > 3 ? null : "Company Name is required",
            companyWebsite: (value) =>
                value.length > 3 ? null : "Company Website is required",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email Address",
            phone: (value) =>
                /^01[3-9]\d{8}$/.test(value)
                    ? null
                    : "Invalid Bangladeshi phone number",
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
        mutationKey: ["register-user"],
        mutationFn: registerUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);

            if (!isVerified(selfDataPromise.data)) {
                <Navigate to="/verify" replace />;
            }
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
                                    <img alt="auth-bg" loading="lazy" decoding="async" data-nimg="1" className="w-full" src="https://modernize-tailwind-nextjs-main.vercel.app/_next/static/media/login-security.bea3357c.svg" />
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-4 lg:col-span-5 col-span-12 sm:px-12 p-5">
                            <div className="flex justify-end">
                                <ThemeSwitch />
                            </div>
                            <div className="flex h-screen items-center px-3 lg:justify-start justify-center">
                                <div className="max-w-[420px] w-full mx-auto">
                                    <img className="w-1/4 mx-auto rounded-full " src="https://scontent.fdac184-1.fna.fbcdn.net/v/t39.30808-1/459162308_122110678058494044_1950926944491134667_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeFYi9m2oxkGPLOsFO7o4ITKkoS9aGAmxgaShL1oYCbGBqZSKxBbMhENT4heDRx6Irv04EgSBwp_kvDxo95JgKdw&_nc_ohc=SKIeWYa4uFgQ7kNvgFFPzU4&_nc_zt=24&_nc_ht=scontent.fdac184-1.fna&_nc_gid=Ao9QAsrYSeV4JeQ0WfeUZms&oh=00_AYDA_MqE0h-mELiohHZAoz4kIZhqVeImqGqsLKpTT5-eQQ&oe=676B94EA" alt="logo" />
                                    <h3 className="text-2xl font-bold my-3 text-center">Welcome to eCommOS</h3>
                                    {/* <p className="text-darklink text-sm font-medium">Your Admin Dashboard</p> */}
                                    <form onSubmit={handleSubmit} autoComplete="off">
                                        <div className="grid gap-4">

                                        <div className="grid gap-2">
                                        <Label htmlFor="fullName">
                                                        Your Name
                                                    </Label>
                                                    <Input
                                                        className="focus-visible:ring-0 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300"
                                                        id="fullName"
                                                        placeholder="Full Name"
                                                        required
                                                        value={form.values.fullName}
                                                        onChange={(event) =>
                                                            form.setFieldValue(
                                                                "fullName",
                                                                event.currentTarget
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                <Label htmlFor="companyName">
                                                        Company Name
                                                    </Label>
                                                    <Input
                                                        className="focus-visible:ring-0 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300"
                                                        id="companyName"
                                                        placeholder="Conmpany Name"
                                                        required
                                                        onChange={(event) =>
                                                            form.setFieldValue(
                                                                "companyName",
                                                                event.currentTarget
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    
                                                <Label htmlFor="companyWebsite">
                                                    Company or FB Page link
                                                </Label>
                                                <Input
                                                    className="focus-visible:ring-0 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300"
                                                    id="companyWebsite"
                                                    type="companyWebsite"
                                                    placeholder="www.example.com"
                                                    required
                                                    onChange={(event) =>
                                                        form.setFieldValue(
                                                            "companyWebsite",
                                                            event.currentTarget.value,
                                                        )
                                                    }
                                                />
                                                </div>
                                            </div>

                                            

                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    className="focus-visible:ring-0 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300"
                                                    id="email"
                                                    type="email"
                                                    placeholder="your@example.com"
                                                    autoComplete="off"
                                                    required
                                                    onChange={(event) =>
                                                        form.setFieldValue(
                                                            "email",
                                                            event.currentTarget.value,
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <PhoneInput form={form} />
                                            </div>
                                            <div className="grid gap-2">
                                                <PasswordInput form={form} />
                                            </div>
                                            {/* <Button type="submit" className="w-full">
                                        Create an account
                                    </Button> */}

                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={isPending}
                                            >
                                                {isPending && (
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                                Create an account
                                            </Button>
                                        </div>
                                    </form>
                                    <div className="mt-4 text-center text-sm">
                                        Do U have an account?{" "}
                                        <Link to={"/auth/login"} className="underline">
                                            Login
                                        </Link>
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
