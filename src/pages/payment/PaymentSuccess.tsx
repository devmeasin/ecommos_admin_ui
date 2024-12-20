import PaymentComponent from "@/components/Payment";
import { useLocation } from "react-router-dom";

export const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tnxId = queryParams.get("tnxId");

    return <div>{tnxId && <PaymentComponent tnxId={tnxId} />}</div>;
};
