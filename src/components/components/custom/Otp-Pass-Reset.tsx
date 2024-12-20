import { Button } from "@/components/custom/Button";
import { PinInput, PinInputField } from "@/components/custom/PIN-Input";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/http/api";
import { cn } from "@/lib/utils";
import { TresetPassword } from "@/types";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./Password-Input";

interface OtpPassResetProps {
    formX: any;
}

const resetPass = async (resetPasswordData: TresetPassword) => {
    const { data } = await resetPassword(resetPasswordData);
    return data;
};

export const OtpPassReset = ({ formX, ...props }: OtpPassResetProps) => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            otp: "",
        },
        validate: {
            otp: (value) =>
                value.length === 4 ? null : "Please enter a valid 4-digit OTP.",
        },
        validateInputOnChange: true, // Validate inputs on change
        validateInputOnBlur: true, // Validate inputs on blur
    });

    const { mutate, isPending } = useMutation({
        mutationFn: resetPass,
        onSuccess: async () => {
            form.reset();
            toast.success("Password reset successfully");
            navigate("/auth/login", { replace: true });
        },
        onError: () => {
            toast.error("Error resetting password: ");
        },
    });

    const handleOtpChange = useCallback(
        (value: string) => {
            if (value !== form.values.otp) {
                form.setFieldValue("otp", value);
            }
        },
        [form.values.otp, form.setFieldValue], // Only include necessary dependencies
    );

    const onSubmit = (values: typeof form.values) => {
        if (form.validate()) {
            if (
                formX.values.customer_number &&
                formX.values.password &&
                form.values.otp
            ) {
                mutate({
                    phone: formX.values.customer_number,
                    otp: values.otp,
                    newPassword: formX.values.password,
                });
            }
        }
    };

    return (
        <div className={cn("grid gap-6")} {...props}>
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

                    <div className="mt-5">
                        <PasswordInput form={formX} />
                        {form.errors.newPassword && (
                            <div className="text-red-500 text-sm">
                                {form.errors.newPassword}
                            </div>
                        )}
                    </div>

                    <Button
                        className="mt-2"
                        disabled={!form.isValid() || isPending}
                        loading={isPending}
                    >
                        Reset Password!
                    </Button>
                </div>
            </form>
        </div>
    );
};
