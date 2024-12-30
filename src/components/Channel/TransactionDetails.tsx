import React from "react";

interface TransactionDetailsProps {
    open: boolean;
    onClose: () => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 grid grid-cols-1 place-items-end overflow-hidden bg-overlay backdrop-blur-[10px]"
            style={{ pointerEvents: open ? "auto" : "none" }}
        >
            <div
                role="dialog"
                aria-labelledby="transaction-title"
                aria-describedby="transaction-description"
                className="size-full max-w-[400px] overflow-y-auto border-l border-stroke-soft-200 bg-bg-white-0 transition-all duration-200 ease-out"
                style={{
                    animation: open ? "slide-in-from-right-full 0.2s ease-out" : "slide-out-to-right-full 0.2s ease-in",
                }}
            >
                {/* Header */}
                <div className="relative flex items-center gap-3 p-5 border-b border-stroke-soft-200">
                    <h2 id="transaction-title" className="flex-1 text-label-lg text-text-strong-950">
                        Transaction Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="relative flex shrink-0 items-center justify-center size-6 rounded-md bg-transparent text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Amount & Account */}
                    <div className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 uppercase text-subheading-xs text-text-soft-400">
                        Amount & Account
                    </div>
                    <div className="p-5">
                        <div className="text-title-h4 text-text-strong-950">-$45.00</div>
                        <div className="mt-1 text-paragraph-sm text-text-sub-600">Mercury Checking •• 1038</div>
                    </div>

                    {/* To */}
                    <div className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 uppercase text-subheading-xs text-text-soft-400">
                        To
                    </div>
                    <div className="flex items-center gap-4 p-5">
                        <div className="relative flex shrink-0 items-center justify-center rounded-full size-12 text-label-lg bg-purple-200 text-purple-950">
                            <img
                                className="size-full rounded-full object-cover"
                                src="/images/avatar/illustration/matthew.png"
                                alt="Matthew Johnson"
                            />
                        </div>
                        <div>
                            <div className="text-label-lg text-text-strong-950">Matthew Johnson</div>
                            <div className="mt-1 text-paragraph-sm text-text-sub-600">A-8486214</div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 uppercase text-subheading-xs text-text-soft-400">
                        Details
                    </div>
                    <div className="flex flex-col gap-3 p-5">
                        <div>
                            <div className="text-subheading-xs uppercase text-text-soft-400">Payment Method</div>
                            <div className="mt-1 text-label-sm text-text-strong-950">Money Transfer</div>
                        </div>
                        <hr className="border-stroke-soft-200" />
                        <div>
                            <div className="text-subheading-xs uppercase text-text-soft-400">Transaction ID</div>
                            <div className="mt-1 text-label-sm text-text-strong-950">APX1242352</div>
                        </div>
                        <hr className="border-stroke-soft-200" />
                        <div>
                            <div className="text-subheading-xs uppercase text-text-soft-400">Date & Time</div>
                            <div className="mt-1 text-label-sm text-text-strong-950">Sep 28, 2023 at 18:23</div>
                        </div>
                        <hr className="border-stroke-soft-200" />
                        <div>
                            <div className="text-subheading-xs uppercase text-text-soft-400">FEE</div>
                            <div className="mt-1 text-label-sm text-text-strong-950">$0.48</div>
                        </div>
                        <hr className="border-stroke-soft-200" />
                        <div>
                            <div className="text-subheading-xs uppercase text-text-soft-400">Bank Description</div>
                            <div className="mt-1 text-label-sm text-text-strong-950">APEXLLC_V84G2H16D ・ REF #84664</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 p-5 border-t border-stroke-soft-200">
                    <button className="group inline-flex items-center justify-center w-full h-10 px-3.5 gap-3 rounded-lg bg-bg-white-0 text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
                            <path d="..." />
                        </svg>
                        Repeat
                    </button>
                    <button className="group inline-flex items-center justify-center w-full h-10 px-3.5 gap-3 rounded-lg bg-bg-white-0 text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
                            <path d="..." />
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};
