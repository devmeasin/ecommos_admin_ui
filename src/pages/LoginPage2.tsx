import PhoneInput from "@/components/custom/BDPhoneNumber";
import PasswordInput from "@/components/custom/Password-Input";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { useIsVerified } from "@/hooks/use_isVerified";
import { login, self } from "@/http/api";
import { IAuthStore, useAuthStore } from "@/store";
import { TCredentails } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export default function SignIn() {
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
                toast.error("🔒 password must at least 4 characters");
        } else {
            mutate(form.values);
        }
    };

    return (
        <div>

            <div className="absolute inset-0 h-full w-full bg-white dark:bg-gray-700 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0  m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                <div className="absolute z-50 right-2 top-2">
                    <ThemeSwitch />
                </div>
                <div className="opacity-100 translate-y-0">
                    <div className="flex h-screen flex-col items-center justify-center space-y-4 md:space-y-8 ">
                        <div className="flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent bg-white px-2 py-1 dark:bg-gray-700 md:w-8/12 md:border md:px-8 md:py-6 lg:w-5/12 lg:px-6 lg:shadow-xl dark:lg:border-black-400  dark:lg:shadow-[0_0_1200px_0] lg:dark:shadow-primary-400/20 xl:w-4/12 2xl:w-3/12 py-10x pt-5">
                            <Link to="/">
                                <img className="w-1/4 mx-auto rounded-full " src="https://scontent.fdac184-1.fna.fbcdn.net/v/t39.30808-1/459162308_122110678058494044_1950926944491134667_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeFYi9m2oxkGPLOsFO7o4ITKkoS9aGAmxgaShL1oYCbGBqZSKxBbMhENT4heDRx6Irv04EgSBwp_kvDxo95JgKdw&_nc_ohc=SKIeWYa4uFgQ7kNvgFFPzU4&_nc_zt=24&_nc_ht=scontent.fdac184-1.fna&_nc_gid=Ao9QAsrYSeV4JeQ0WfeUZms&oh=00_AYDA_MqE0h-mELiohHZAoz4kIZhqVeImqGqsLKpTT5-eQQ&oe=676B94EA" alt="logo" />
                            </Link>
                            <div>
                                <h6 className="font-heading text-base font-medium">
                                    <span className="font-medium">Sign in to your account</span>
                                </h6>
                            </div>

                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="flex-col space-y-4">
                                    <div className="flex flex-col space-y-1">
                                        <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400">
                                            <PhoneInput form={form} />
                                        </label>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Password

                                            <PasswordInput form={form} />

                                            <div className="py-0.5 text-xs">
                                                <Link className="hover:underline" to="/auth/forgot_password">Password forgotten?</Link>
                                            </div>
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full flex items-center justify-center px-2 py-3 font-semibold leading-6 text-md shadow rounded-xl text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150">
                                        {isPending && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>}
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                            <div className="flex justify-center text-xs">
                                <p className="flex space-x-1">
                                    <span>Do not have an account yet?</span>
                                    <Link className="text-primary-800 hover:underline dark:text-primary-500" to="/auth/register">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
