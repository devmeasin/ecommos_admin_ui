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

export function RegisterPage() {
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
        <div className="relative h-full w-full dark:bg-slate-950 bg-slate-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]  dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:40px_40px]">
            <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] ">
                <div className="flex flex-col justify-center items-center h-screen">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">
                                <div className="flex justify-center items-center">
                                    <UserPlus className="mr-2" size={25} />{" "}
                                    Register
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Enter your All info to create your account
                            </CardDescription>
                            <hr />
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="fullName">
                                                Your Name
                                            </Label>
                                            <Input
                                                className="focus-visible:ring-0"
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
                                        <div className="grid gap-2">
                                            <Label htmlFor="companyName">
                                                Company Name
                                            </Label>
                                            <Input
                                                className="focus-visible:ring-0"
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
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="companyWebsite">
                                            Company Website || FB Page Url
                                        </Label>
                                        <Input
                                            className="focus-visible:ring-0"
                                            id="companyWebsite"
                                            type="companyWebsite"
                                            placeholder="www.yourcompany.com"
                                            required
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "companyWebsite",
                                                    event.currentTarget.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            className="focus-visible:ring-0"
                                            id="email"
                                            type="email"
                                            placeholder="your@example.com"
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
