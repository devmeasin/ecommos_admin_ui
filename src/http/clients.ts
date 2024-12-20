import { IAuthStore, useAuthStore } from "@/store";
import axios from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + "/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const refreshToken = async () => {
    try {
        await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/refresh`,
            null,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if error is due to network issues
        if (!error.response) {
            toast.error("Network error. Please check your connection.");
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized errors
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                return api.request(originalRequest);
            } catch (refreshError) {
                (useAuthStore() as IAuthStore).logout();
                toast.error("Session expired. Please log in again.");
                return Promise.reject(refreshError);
            }
        }

        // Handle other HTTP errors
        toast.error(
            `Error: ${error.response.status} - ${error.response.data?.message || "An error occurred"}`,
        );

        return Promise.reject(error);
    },
);

// import { IAuthStore, useAuthStore } from "@/store";
// import axios from "axios";

// export const api = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_API_URL,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
// });

// const refreshToken = async () => {
//     await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,{}, {
//         withCredentials: true,
//     });
// };

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const orginalRequest = error.config;
//         if (error.response.status === 401 && !orginalRequest._retry) {
//             try {
//                 orginalRequest._retry = true;
//                 const headers = {
//                     ...orginalRequest.headers,
//                 };
//                 await refreshToken();
//                 return api.request({ ...orginalRequest, headers });
//             } catch (error) {
//                 (useAuthStore() as IAuthStore).logout();
//                 return Promise.reject(error);
//             }
//         }
//         return Promise.reject(error);
//     },
// );
