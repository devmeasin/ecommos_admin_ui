import { TCredentails, TresetPassword, TVerifyOtp } from "@/types";
import { api } from "./clients";

// Auth Request
export const login = (credentials: TCredentails) =>
    api.post("/auth/login", credentials);
export const register = (credentials: TCredentails) =>
    api.post("/auth/register", credentials);
export const self = () => api.get("/auth/self");
export const forgetPassword = (phone: string) =>
    api.post("auth/forget-password", { phone });
export const resetPassword = (resetPasswordData: TresetPassword) =>
    api.post("/auth/reset-password", { ...resetPasswordData });

export const logOut = () => api.post("/auth/logout");

// User Verification Request
export const generateOTP = (phone: string) =>
    api.post("/auth/generate-otp", { phone });
export const verifyOTP = (OtpData: TVerifyOtp) =>
    api.post("/auth/verify-otp", { ...OtpData });

// Courier data request
export const getCourierData = (customer_number: string) =>
    api.post("/fraud-checker/qc-data", { customer_number });

// Packages Request
export const getPackages = () => api.get("/packages");
export const getUserCurrentPackages = () => api.get("/packages/current");

// Payment Handle Request
export const initiatePayment = (packageId: string) =>
    api.post("/payment/bkash/initiate", { packageId });

// billingInfo Request
export const billingInfo = () => api.get("/billing");


// Orders Request

export const getAllOrders = ({ status , page, limit, search, from, to, sortBy, sortOrder }: any) => {
    const queryString = `status=${status}&page=${page}&limit=${limit}&search=${search}&from=${from}&to=${to}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return api.get(`/orders?${queryString}`);
}

export const getSingleOrder = (orderId: string) => api.get(`/orders/${orderId}`);

export const changeOrderStatus = (orderId: string , status: string) => api.patch(`orders/${orderId}/status`, { status });

// Api Secret Key Request

export const fetchByApiKey = () => api.get("/api-secret");

export const generateByApiKey = () => api.post("/api-secret/generate");

export const setByApiKeyStatus = (status: boolean) =>
    api.post("/api-secret/set-status", { apiSecretStatus: status });

export const addDomainforApiAccess = (domain: string) =>
    api.post("/api-secret/domains/add", { domain });
export const removeDomainforApiAccess = (domain: string) =>
    api.post("/api-secret/domains/remove", { domain});
