import { initiatePayment } from "@/http/api";
import { Check } from "lucide-react";
import React from "react";

interface PricingCardProps {
    id: string;
    name: string;
    price: number;
    requestLimit: number;
    validityDays: number;
    apiAccess: boolean;
    borderColor: string; // New property for border color
}

const borderColors = [
    "border-blue-500",
    "border-green-500",
    "border-red-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
];

export function getRandomBorderColor() {
    const randomIndex = Math.floor(Math.random() * borderColors.length);
    return borderColors[randomIndex];
}

const PricingCard: React.FC<PricingCardProps> = ({
    id,
    name,
    price,
    requestLimit,
    validityDays,
    apiAccess,
    borderColor = getRandomBorderColor(),
}) => {
    const handlePayment = async (packageId: string) => {
        try {
            const { data } = await initiatePayment(packageId);

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl; // Redirect to bKash hosted page
            } else {
                throw new Error(data.message || "Failed to initiate payment");
            }
        } catch (error) {
            alert("Failed to initiate payment.");
        }
    };

    return (
        <div
            className={`border-t-8 ${borderColor} rounded-lg shadow-lg p-6 bg-white dark:bg-slate-900`}
        >
            <h3 className="text-2xl font-bold text-center mb-4">{name}</h3>
            <div className="my-4 text-center">
                <span className="text-3xl font-bold">৳ {price}</span>
            </div>
            <ul className="text-sm mb-4">
                <li className="flex items-center space-x-2">
                    <span className="text-green-500">
                        <Check size={18} />
                    </span>
                    <span>Request Limit: {requestLimit}</span>
                </li>
                <li className="flex items-center space-x-2">
                    <span className="text-green-500">
                        <Check size={18} />
                    </span>
                    <span>Validity Days: {validityDays} days</span>
                </li>

                <li className="flex items-center space-x-2">
                    <span className="text-green-500">
                        <Check size={18} />
                    </span>
                    <span>API Access: {apiAccess ? "Yes" : "No"}</span>
                </li>
            </ul>
            <button
                onClick={() => handlePayment(id)}
                className="transition duration-300 w-full bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            >
                Pay Now
            </button>
        </div>
    );
};

export default PricingCard;
