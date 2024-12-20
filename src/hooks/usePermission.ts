import { IUser } from "@/store";

export const usePermission = () => {
    const _permission = (user: IUser | null) => {
        if (user?.role === "customer" && user.status === "active") {
            return true;
        }
        return false;
    };
    return {
        isAllowed: _permission,
    };
};
