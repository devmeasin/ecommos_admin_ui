import ActivatedProfile from "@/components/custom/ActivatedProfile";
// import { generateOTP } from "@/http/api";

// const generateOtp = async (userPhoneNumber: string) => {
//     const { data } = await generateOTP(userPhoneNumber);
//     return data;
// };

export const VerifyUser = () => {
    // const { user } = useAuthStore() as IAuthStore;

    // const { mutate } = useMutation({
    //     mutationKey: ["generate-otp"],
    //     mutationFn: generateOtp,
    //     onSuccess: () => {
    //         toast.success("OTP sent successfully");
    //     },
    //     onError: () => {
    //         toast.error("Error sending OTP");
    //     },
    // });

    // const resendOtp = () => {
    //     if (user) {
    //         mutate(user.phone);
    //     }
    // };

    return (
        <div>
            {/* <VerifyUserOtp resendOtp={resendOtp} /> */}
            <ActivatedProfile />
        </div>
    );
};
