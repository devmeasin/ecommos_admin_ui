import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthDashboard } from "./auth/AuthDashboard";
import { NonAuth } from "./auth/NonAuth";
import { NonVerified } from "./auth/NonVerified";
import { Root } from "./auth/Root";
// import Dashboard from "./pages/dashboard";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/Forgot-Password";
import { FraudChecker } from "../pages/FraudChecker";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TestPage } from "../pages/TestPage";
import { VerifyUser } from "../pages/userVerify/VerifyUser";
// import { Packages } from "./pages/Packages";
import { ComingSoon } from "../components/ComingSoon";
import { ApiKeysPage } from "../pages/ApiKeysPage";
import { Billing } from "../pages/Billing";
import UserCurrentActivePlan from "../pages/UserCurrentActivePlan";
import { PaymentError } from "../pages/payment/PaymentError";
import { PaymentSuccess } from "../pages/payment/PaymentSuccess";
// import SignIn from "./pages/LoginPage2";
import Apps from "@/features/apps";
import Users from "@/features/users";
import SignIn from "@/pages/LoginPage2";
import { LoginPageD3 } from "@/pages/LoginPageD3";
import { RegisterPageD2 } from "@/pages/RegisterPageD2";
import PricingSection from "../pages/PriceingPlan";
import OrdersPage from "../pages/order/OrdersPage";
import EcommerceChannels from "@/pages/channels/ecommerceChannels";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <AuthDashboard />,
                children: [
                    {
                        path: "",
                        element: <FraudChecker />,
                    },
                    {
                        path: "dashboard",
                        element: <ComingSoon />,
                    },
                    {
                        path: "fraud_checker",
                        element: <FraudChecker />,
                    },
                    {
                        path: "sales-orders",
                        element: <OrdersPage />,
                    },
                    {
                        path: "customers",
                        element: <Users />,
                    },
                    {
                        path: "test",
                        element: <TestPage />,
                    },
                    {
                        path: "customers_history",
                        element: <ComingSoon />,
                    },
                    {
                        path: "analytics",
                        element: <ComingSoon />,
                    },
                    {
                        path: "intigations",
                        element: <Outlet />,
                        children: [
                            {
                                path: "ecommerce-channels",
                                element: <EcommerceChannels />,
                            },
                            {
                                path: "delivery-partners",
                                element: <Apps />,
                            },
                        ],
                    },
                    {
                        path: "billings",
                        element: <Billing />,
                    },
                    {
                        path: "current_active_plan",
                        element: <UserCurrentActivePlan />,
                    },
                    // {
                    //     path: "packages",
                    //     element: <Packages />,
                    // },
                    {
                        path: "packages",
                        element: <PricingSection />,
                    },
                    // Add route for payment success
                    {
                        path: "payment/successful",
                        element: <PaymentSuccess />,
                    },
                    // Add route for payment error
                    {
                        path: "payment/error",
                        element: <PaymentError />,
                    },
                    // Add route for api key
                    {
                        path: "api_key",
                        element: <ApiKeysPage />,
                    },
                    {
                        path: "settings",
                        element: <ComingSoon />,
                    },
                ],
            },

            // {
            //     path: "verify",
            //     element: <NonVerified />,
            //     children: [
            //         {
            //             path: "",
            //             element: <VerifyUser />,
            //         },
            //     ],
            // },
            
            {
                path: "onboarding/activate-profile",
                element: <NonVerified />,
                children: [
                    {
                        path: "",
                        element: <VerifyUser />,
                    },
                ],
            },
            {
                path: "auth",
                element: <NonAuth />,
                children: [
                    {
                        path: "login",
                        element: <LoginPageD3 />,
                    },
                    {
                        path: "login2",
                        element: <SignIn />,
                    },
                    {
                        path: "login3",
                        element: <LoginPage />,
                    },
                    {
                        path: "register",
                        element: <RegisterPageD2 />,
                    },
                    {
                        path: "register2",
                        element: <RegisterPage />,
                    },
                    {
                        path: "forgot_password",
                        element: <ForgotPassword />,
                    },
                ],
            },
        ],
    },
]);
