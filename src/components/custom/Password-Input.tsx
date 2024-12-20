import { Input } from "@/components/ui/input"; // Adjust the import based on your setup
import { Eye, EyeOff } from "lucide-react"; // Use any icon library you prefer
import { useState } from "react";

const PasswordInput = ({ form, ...props }: { form: any }) => {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Input
                {...props} // Spread all incoming props to the input
                value={form.values.password}
                onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                }
                type={showPassword ? "text" : "password"} // Toggle type based on state
                placeholder="Enter your password"
                style={{ paddingRight: "40px" }} // Space for the icon
                className="focus-visible:ring-0" // Custom styling
            />
            <div
                style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}{" "}
                {/* Toggle icon */}
            </div>
        </div>
    );
};

export default PasswordInput;
