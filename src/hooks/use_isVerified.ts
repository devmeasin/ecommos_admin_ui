import { IUser } from "@/store";

export const useIsVerified = () => {
    const _isVerified = (user: IUser | null) => {
        if (user?.isVerified && user.isPhoneVerified) {
            return true;
        }
        return false;
    };

    return {
        isVerified: _isVerified,
    };
};
