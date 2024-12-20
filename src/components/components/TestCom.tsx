const PaymentButton = () => {
    const handlePayment = async (packageId) => {
        try {
            const response = await fetch(
                "http://localhost:5001/api/v1/payment/bkash/initiate",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ packageId }),
                },
            );

            const data = await response.json();
            if (response.ok) {
                window.location.href = data.paymentUrl; // Redirect to bKash hosted page
            } else {
                throw new Error(data.message || "Failed to initiate payment");
            }
        } catch (error) {
            alert("Failed to initiate payment.");
        }
    };

    return <button onClick={handlePayment}>Pay with bKash</button>;
};

export default PaymentButton;
