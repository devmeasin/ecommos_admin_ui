import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"; // Ensure the package is installed correctly
import React, { useState } from "react";

const Channels = () => {
    const [activeChannel, setActiveChannel] = useState<string | null>('woocommerce'); // Track active channel by key

    const channels = [
        { key: "woocommerce", name: "WooCommerce", imgSrc: "/assets/images/channels/woocommerce.png", bgColor: "bg-blue-200", textColor: "text-blue-950", isActive: false, isAvailable: true },
        { key: "shopify", name: "Shopify", imgSrc: "/assets/images/channels/shopify.ico", bgColor: "bg-bg-soft-200", textColor: "text-static-black", isActive: false, isAvailable: false },
        { key: "daraz", name: "Daraz", imgSrc: "/assets/images/channels/daraz.ico", bgColor: "bg-transparent", textColor: "text-purple-950", isActive: false, isAvailable: false },
    ];

    return (
        <div className="flex flex-col gap-3">
            {/* Carousel Section */}
            <Carousel className="relative w-full overflow-hidden">
                <CarouselContent className="flex gap-2 transition-transform duration-300 ease-out mx-2">
                    {channels.map((channel) => (
                        <ChannelButton
                            key={channel.key}
                            name={channel.name}
                            imgSrc={channel.imgSrc}
                            bgColor={channel.bgColor}
                            textColor={channel.textColor}
                            isActive={channel.key === activeChannel} // Active if the key matches
                            isAvailable={channel.isAvailable}
                            onClick={() => setActiveChannel(channel.key)} // Set active channel by key
                        />
                    ))}
                </CarouselContent>
                {/* Navigation */}
                {/* <CarouselPrevious className="absolute left-0 top-1/2 flex shrink-0 items-center justify-center outline-none transition duration-200 ease-out disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled-300 disabled:shadow-none focus:outline-none text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0 size-5 rounded-md">
                    ◀
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2 flex shrink-0 items-center justify-center outline-none transition duration-200 ease-out disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled-300 disabled:shadow-none focus:outline-none text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0 size-5 rounded-md">
                    ▶
                </CarouselNext> */}
            </Carousel>
        </div>
    );
};

export default Channels;

interface ChannelButtonProps {
    name: string;
    imgSrc: string;
    bgColor: string;
    textColor: string;
    isActive?: boolean;
    isAvailable?: boolean;
    onClick?: () => void; // Add onClick handler for activation
}

const ChannelButton: React.FC<ChannelButtonProps> = ({ name, imgSrc, bgColor, textColor, isActive, onClick, isAvailable }) => {
    return (
        <button
            type="button"
            disabled={!isAvailable}
            className={`flex h-8 items-center whitespace-nowrap rounded-full pl-1.5 pr-3 ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out ${
                isAvailable
                    ? isActive
                        ? "bg-weak-50 text-text-strong-950"
                        : "bg-white-0 hover:bg-weak-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={onClick} // Attach onClick handler
            title={!isAvailable ? "Coming Soon" : ""}
        >
            <div
                className={`relative flex shrink-0 items-center justify-center rounded-full select-none text-center uppercase size-5 text-label-xs ${bgColor} ${textColor}`}
            >
                <img className="size-full rounded-full object-cover" src={imgSrc} alt={`${name}'s avatar`} />
            </div>
            <div className="ml-1.5 text-label-sm">{name}</div>
            {isActive && (
                <div className="overflow-hidden" style={{ width: "auto", transform: "none" }}>
                    <div className="pl-1.5">
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="remixicon size-4 text-green-500"
                        >
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                        </svg>
                    </div>
                </div>
            )}
        </button>
    );
};


