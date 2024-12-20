import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import PaymentSuccess from "@/assets/payment_success.json";
import PaymentFailed from "@/assets/payment_failed.json";
import { UndoDot } from "lucide-react";

export default function PaymentComponent({
    tnxId = false,
}: {
    tnxId?: string | false;
}) {
    return (
        <>
            <main className={`grid h-auto mt-36 sm:mt-20 place-items-center `}>
                <div className="text-center">
                    <Lottie
                        loop
                        animationData={tnxId ? PaymentSuccess : PaymentFailed}
                        play
                        style={{ width: 300, height: 300, margin: "auto" }}
                    />

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        {tnxId ? "Payment Success!" : "Payment Failed! 😔"}
                    </h1>
                    <p className="mt-4 text-xl font-semibold leading-7 text-gray-600 dark:text-gray-400">
                        {tnxId
                            ? "😊 আপনার পেমেন্টটি সফল হয়েছে।"
                            : "আপনার পেমেন্টটি ব্যর্থ হয়েছে।"}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="flex items-center rounded-md bg-gray-800 dark:bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <UndoDot className="mr-2" /> Go back home
                        </Link>
                        {!tnxId && (
                            <Link
                                to="/support"
                                className="text-sm font-semibold text-gray-900 dark:text-white"
                            >
                                Contact support{" "}
                                <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
