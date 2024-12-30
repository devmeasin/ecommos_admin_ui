import { MessagesSquare, UserSearch } from "lucide-react";
import { FormEvent } from "react";

interface SearchButtonProps {
    form: any;
    handleSubmit: (event: FormEvent<Element>) => void;
    btnText?: string;
    isWantBtn?: boolean;
    isDisabled?: boolean; // Add this prop to control disabled state
}

export const SearchButton: React.FC<SearchButtonProps> = ({
    form,
    handleSubmit,
    btnText = "Search",
    isWantBtn = false,
    isDisabled = false, // Default to false
}) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            // Prevent form submission if the button is disabled
            if (!isDisabled) {
                handleSubmit(event as unknown as FormEvent);
            }
        }
    };

    return (
        <div className="font-bold">
            <div className="flex items-center border rounded-2xl pl-2 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300">
                <div className="flex items-center mr-2">
                    {/* Bangladesh flag emoji */}
                    <span
                        role="img"
                        aria-label="Bangladesh Flag"
                        className="mr-2"
                    >
                        🇧🇩
                    </span>
                    <span className="text-gray-700 dark:text-white">+88</span>
                </div>
                {/* Input field for phone number */}
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="01XXXXXXXX"
                    value={form.values.customer_number}
                    onChange={(event) => {
                        const value = event.currentTarget.value;

                        // Allow only numeric input and ensure length does not exceed 11 digits
                        if (/^\d*$/.test(value) && value.length <= 11) {
                            form.setFieldValue("customer_number", value);
                        }
                    }}
                    onKeyDown={handleKeyDown} // Handle Enter key press
                    className="bg-transparent border-none outline-none w-full text-gray-900 dark:text-white"
                    disabled={isDisabled} // Disable input if the button is disabled
                />

                {/* Search button */}
                <button
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                    className={`flex items-center justify-center p-2 ml-2 rounded-r-2xl px-5 
                        ${isDisabled
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                        }`}
                    disabled={isDisabled} // Disable the button
                >
                    <div className="flex justify-center items-center">
                        {btnText}
                        {isWantBtn ? (
                            <MessagesSquare className="ml-2" size={20} />
                        ) : (
                            <UserSearch className="ml-2" size={20} />
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};
