import Error503 from "@/assets/Error503.json";
import NotFound from "@/assets/NotFound.json";
import NoPaymentHistory from "@/assets/NoPaymentHistory.json";
import { ExternalLink } from "lucide-react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";

interface CommonNotFoundProps {
    title?: string;
    description?: string;
    animationName?: string;
    buttonText?: string;
    buttonLink?: string;
}

const animations = {
    Error503,
    NotFound,
    NoPaymentHistory,
};

export default function CommonNotFound({
    title = " ",
    description = " ",
    animationName,
    buttonText = " ",
    buttonLink = " ",
}: CommonNotFoundProps) {
    const animationData = animations[animationName as keyof typeof animations];

    return (
        <main className="grid h-auto place-items-center">
            <div className="text-center">
                <Lottie
                    loop
                    animationData={animationData}
                    play
                    style={{ width: 350, height: 350, margin: "auto" }}
                />
                <h5 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    {title}
                </h5>
                <p className="mt-4 font-bold text-base leading-7 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <div className="mt-5 flex items-center justify-center gap-x-6">
                    <Link
                        to={buttonLink}
                        className="text-sm font-semibold text-gray-900 "
                    >
                        <button
                            className="rounded-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2.5 px-8  bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 dark:text-black"
                            type="button"
                        >
                            <ExternalLink size={25} className="mr-1" />{" "}
                            {buttonText}
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
