import { Label } from "@/components/ui/label";

// PhoneInput component
const PhoneInput = ({ form, ...props }) => {
    return (
        <div>
            <Label htmlFor="email">Phone</Label>
            <div className="flex items-center border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300">
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
                    placeholder="Enter your phone number"
                    {...props} // Spread all incoming props to the input
                    value={form.values.phone} // Controlled input value
                    onChange={(event) =>
                        form.setFieldValue("phone", event.currentTarget.value)
                    }
                    className="bg-transparent border-none outline-none w-full text-gray-900 dark:text-white"
                />
            </div>
        </div>
    );
};

export default PhoneInput;
