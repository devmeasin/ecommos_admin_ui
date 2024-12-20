import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import errorAnimationData from "@/assets/NotFound404.json";
import { UndoDot } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <main className="grid h-screen place-items-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <Lottie
                        loop
                        animationData={errorAnimationData}
                        play
                        style={{ width: 300, height: 300, margin: "auto" }}
                    />
                    <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                        404
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Page not found! 😔{" "}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="flex items-center rounded-md bg-gray-800 dark:bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <UndoDot className="mr-2" /> Go back home
                        </Link>
                        <Link
                            to="/support"
                            className="text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Contact support{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
