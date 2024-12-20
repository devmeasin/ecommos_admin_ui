import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
    title: string;
    subtitle: string;
    image: string;
    buttonText?: string;
    downloadLinks?: { label: string; url: string }[];
    isComingSoon?: boolean;
}

const PluginDisplayCard: React.FC<CardProps> = ({
    title,
    subtitle,
    image,
    // buttonText,
    downloadLinks,
    isComingSoon = false,
}) => {
    return (
        <div className="w-full mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <img src={image} alt={title} className="w-16 mx-auto" />
                <h2 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
                {isComingSoon ? (
                    <div className="mt-4 text-center text-green-500 dark:text-green-400 text-lg font-semibold">
                        COMING SOON
                    </div>
                ) : (
                    <>
                        <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                            {subtitle}
                        </p>
                        {downloadLinks?.map((link, index) => (
                            <Link
                                target="_blank"
                                key={index}
                                to={link.url}
                                className="block mt-2 bg-green-500 hover:bg-green-600 text-white text-center py-2 px-2 rounded-full"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </>
                )}
            </div>
            {/* <div className="relative">
                <img src={videoLink} alt="video thumbnail" className="w-full h-32 object-cover" />
                <a
                    href={videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 text-white font-semibold rounded-lg"
                >
                    Watch Video
                </a>
            </div> */}
        </div>
    );
};

export default PluginDisplayCard;
