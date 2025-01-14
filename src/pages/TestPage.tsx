import { PrimaryLoader } from "@/components/Loader";
import PaymentComponent from "@/components/Payment";
import PaymentButton from "@/components/TestCom";

export const TestPage = () => {
    return (
        <div>
            {/* <ForgotPassword /> */}
            <PaymentButton />
            <PaymentComponent />
            <PrimaryLoader/>
        </div>
    );
};
