import { OtpForm } from "@/components/custom/OTP-Form";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VerifyUserOtp({
    resendOtp,
}: {
    resendOtp: () => void;
}) {
    const [countdown, setCountdown] = useState<number>(120); // 2 minutes countdown in seconds
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (countdown === 0) {
            setIsDisabled(false);
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const handleResendOtp = () => {
        resendOtp();
        setCountdown(120); // Reset countdown after resending OTP
        setIsDisabled(true); // Disable link immediately after resending OTP
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="h-full w-full dark:bg-slate-950 bg-slate-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:40px_40px]">
            <div className="bottom-0 left-0 right-0 top-0 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
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
                            <h1 className="text-xl font-medium">
                                Verify Your Account
                            </h1>
                        </div>
                        <Card className="p-6">
                            <div className="mb-2 flex flex-col space-y-2 text-left">
                                <h1 className="text-md font-semibold tracking-tight">
                                    Apnr Phone Check Korun
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Please enter the authentication code. <br />{" "}
                                    We have sent the authentication code to your
                                    email.
                                </p>
                            </div>
                            <OtpForm />
                            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                                Haven't received it?{" "}
                                <Link
                                    to=""
                                    onClick={
                                        isDisabled
                                            ? (e) => e.preventDefault()
                                            : handleResendOtp
                                    }
                                    className={`underline underline-offset-4 hover:text-primary ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                                >
                                    {isDisabled
                                        ? `Resend a new OTP ${formatTime(countdown)}`
                                        : "Resend OTP"}
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
