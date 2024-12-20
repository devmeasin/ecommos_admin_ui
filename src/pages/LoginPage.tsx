import PhoneInput from "@/components/custom/BDPhoneNumber";
import PasswordInput from "@/components/custom/Password-Input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useIsVerified } from "@/hooks/use_isVerified";
import { login, self } from "@/http/api";
import { IAuthStore, useAuthStore } from "@/store";
import { TCredentails } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LockKeyhole } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const loginUser = async (userData: TCredentails) => {
    const { data } = await login(userData);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

export function LoginPage() {
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
        <div className="relative h-full w-full dark:bg-slate-950 bg-slate-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]  dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:40px_40px]">
            <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] ">
                <div className="flex flex-col justify-center items-center h-screen">
                    <h2 className="scroll-m-20  pb-4 text-3xl font-semibold tracking-tight first:mt-0">
                        Welcome back! 👋
                    </h2>
                    <Card className="w-96">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">
                                <div className="flex justify-center items-center">
                                    <LockKeyhole className="mr-2" size={25} />{" "}
                                    Login
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Enter your phone number and password
                            </CardDescription>
                            <hr />
                        </CardHeader>
                        <CardContent>
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
                                    Login
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to={"/auth/register"}
                                    className="underline"
                                >
                                    SignUp
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
