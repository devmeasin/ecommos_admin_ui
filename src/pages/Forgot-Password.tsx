import { OtpPassReset } from "@/components/custom/Otp-Pass-Reset";
import { SearchButton } from "@/components/custom/SearchButton";
import { Card } from "@/components/ui/card";
import { forgetPassword } from "@/http/api";
// import { IAuthStore, useAuthStore } from "@/store";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

const forgetPassRequest = async (phone: string) => {
    const { data } = await forgetPassword(phone);
    return data;
};

export default function ForgotPassword() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(120); // 2 minutes = 120 seconds

    const form = useForm({
        initialValues: {
            customer_number: "0", // Start phone number with 0
            password: "",
        },
        validate: {
            customer_number: (value) =>
                value.length === 11 && /^01[3-9]\d{8}$/.test(value)
                    ? null
                    : "Invalid Bangladeshi phone number, must be 11 digits starting with 01.",
        },
    });

    const { mutate } = useMutation({
        mutationKey: ["forget-pass-req"],
        mutationFn: forgetPassRequest,
        onSuccess: async () => {
            toast.success("Otp sent successfully");
            setIsButtonDisabled(true);

            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsButtonDisabled(false);
                        return 120;
                    }
                    return prev - 1;
                });
            }, 1000);
        },
        onError: () => {
            toast.error("🚫 Phone or password is incorrect!");
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate form before submitting
        if (form.validate().hasErrors) {
            if (form.errors.customer_number)
                toast.error("🇧🇩 phone number must be 11 digits");
        } else {
            mutate(form.values.customer_number);
        }
    };

    return (
        <div className="relative h-full w-full dark:bg-slate-950 bg-slate-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]  dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:40px_40px]">
            <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] ">
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
                        <div className="mb-4 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            <h1 className="text-xl font-medium">eCommOS</h1>
                        </div>
                        <Card className="p-6">
                            <div className="mb-2 flex flex-col space-y-2 text-left">
                                <h1 className="text-md font-semibold tracking-tight">
                                    Forgot Password 🔒️
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your registered Phone and <br /> we
                                    will send you an OTP to reset your password.
                                </p>
                            </div>
                            <div className="mb-7">
                                <SearchButton
                                    form={form}
                                    handleSubmit={handleSubmit}
                                    isWantBtn={true}
                                    btnText={
                                        isButtonDisabled
                                            ? `Wait ${countdown}s`
                                            : "Otp"
                                    }
                                    isDisabled={isButtonDisabled} // Pass the disabled state
                                />
                            </div>

                            <OtpPassReset formX={form} />

                            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                                Do you have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    SignIn
                                </Link>
                                .
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
