import PaymentComponent from "@/components/Payment";
import { useLocation } from "react-router-dom";

export const PaymentError = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");

    return <div>{message && <PaymentComponent tnxId={""} />}</div>;
};
