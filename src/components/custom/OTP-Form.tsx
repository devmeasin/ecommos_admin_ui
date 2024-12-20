import { Button } from "@/components/custom/Button";
import { PinInput, PinInputField } from "@/components/custom/PIN-Input";
import { Input } from "@/components/ui/input";
import { useIsVerified } from "@/hooks/use_isVerified";
import { self, verifyOTP } from "@/http/api";
import { cn } from "@/lib/utils";
import { IAuthStore, useAuthStore } from "@/store";
import { TVerifyOtp } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HTMLAttributes, useCallback } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const verifyOtp = async (otpData: TVerifyOtp) => {
    const { data } = await verifyOTP(otpData);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

export function OtpForm({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { user, setUser } = useAuthStore() as IAuthStore;
    const { isVerified } = useIsVerified();

    const form = useForm({
        initialValues: { otp: "" },
        validate: {
            otp: (value) =>
                value.length !== 4 ? "Please enter a valid 4-digit OTP." : null,
        },
        validateInputOnChange: true, // Validate inputs on change
        validateInputOnBlur: true, // Validate inputs on blur
    });

    // Define mutation to verify OTP
    const { mutate, isPending } = useMutation({
        mutationFn: verifyOtp,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
            if (isVerified(selfDataPromise.data)) {
                <Navigate to="/" replace />;
                toast.success("User Verified Successfully");
            }
            form.reset();
        },
        onError: (error) => {
            console.error("Error verifying OTP:", error);
        },
    });

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: false,
    });

    // Use useCallback to memoize the handleOtpChange function
    const handleOtpChange = useCallback(
        (value: string) => {
            if (value !== form.values.otp) {
                form.setFieldValue("otp", value);
            }
        },
        [form],
    );

    const onSubmit = (values: typeof form.values) => {
        if (form.validate()) {
            if (user) {
                mutate({ otp: values.otp, phone: user?.phone });
            }
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="space-y-1">
                        <PinInput
                            className="flex h-10 justify-evenly space-x-1"
                            value={form.values.otp}
                            onChange={handleOtpChange}
                        >
                            {Array.from({ length: 4 }, (_, i) => (
                                <PinInputField
                                    key={i}
                                    component={Input}
                                    className={`${form.errors.otp ? "border-red-500" : ""}`}
                                />
                            ))}
                        </PinInput>
                        <>
                            {form.errors.otp && (
                                <h5 className="text-red-500 text-sm !mt-5 pl-10">
                                    {form.errors.otp}
                                </h5>
                            )}
                        </>
                    </div>
                    <Button
                        className="mt-2"
                        disabled={!form.isValid() || isPending}
                        loading={isPending}
                    >
                        Verify
                    </Button>
                </div>
            </form>
        </div>
    );
}
