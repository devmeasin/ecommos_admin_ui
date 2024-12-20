import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CourierData } from "./types";

export interface IUser {
    id: string;
    fullName: string;
    companyName: string;
    companyWebsite: string;
    phone: string;
    email: string;
    status: string;
    role: string;
    isVerified: boolean;
    isPhoneVerified: boolean;
    allowedDomains: string[];
}

export interface IAuthStore {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    logout: () => void;
}

export interface IfraudCheckData {
    courierData: CourierData | null;
    setCourierData: (data: CourierData | null) => void;
}

export const useAuthStore = create(
    devtools(
        (set) =>
            ({
                user: null,
                setUser: (user: IUser | null) => set({ user }),
                logout: () => set({ user: null }),
            }) as IAuthStore,
    ),
);

export const fraudCheckData = create(
    devtools((set) => ({
        courierData: null,
        setCourierData: (courierData: CourierData | null) =>
            set({ courierData }),
    })),
);
