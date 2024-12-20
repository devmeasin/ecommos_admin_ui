import Error503 from "@/assets/Error503.json";
import { MessageCircleQuestion } from "lucide-react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";

export default function OopsComponent() {
    return (
        <>
            <main className="grid h-auto place-items-center">
                <div className="text-center">
                    <Lottie
                        loop
                        animationData={Error503}
                        play
                        style={{ width: 250, height: 250, margin: "auto" }}
                    />
                    <h5 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                        Something Want Worng! 😔{" "}
                    </h5>
                    <p className="mt-4 font-bold text-base leading-7 text-gray-600 dark:text-gray-400">
                        আপনি যদি সমস্যাটি বারবার পেয়ে থাকেন তাহলে আমাদের
                        সাপোর্টে যোগাযোগ করুন!
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Link
                            to="/support"
                            className="text-sm font-semibold text-gray-900 "
                        >
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-5 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 dark:text-black"
                                type="button"
                            >
                                <MessageCircleQuestion
                                    size={25}
                                    className="mr-1"
                                />{" "}
                                Contact support
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
