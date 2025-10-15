import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "../components/Navbar";

export default function BuyCredits() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar showAuthButtons={false} />

      <div className="flex flex-col min-h-screen bg-[#1F2028] text-white">
        {/* Main content (centered) */}
        <div className="flex flex-col flex-grow items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Buy More Credits</h2>
          <p className="mb-6">Get 10 AI story generations for only $2</p>

          <PayPalScriptProvider
            options={{
              "client-id":
                "AUPN9xHEpKHXGWPuz8OxyUy46EASmLT7OqSSMQe9nd1MTy0A2UJ7MPFjT3h0j4aJJUNqDQUKDvuGZvfO",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={async () => {
                const res = await fetch(
                  "http://localhost:3001/api/payments/create-order",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const data = await res.json();
                return data.id;
              }}
              onApprove={async (data) => {
                const res = await fetch(
                  "http://localhost:3001/api/payments/capture-order",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ orderId: data.orderID }),
                  }
                );

                const result = await res.json();

                if (result.success) {
                  window.location.href = "/payment-success";
                } else {
                  alert("❌ Something went wrong with the payment.");
                  window.location.href = "/payment-failed";
                }
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("❌ An error occurred during payment. Please try again.");
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Footer (sticks at bottom) */}
        <div className="w-full h-24 bg-gradient-to-r from-[#F3911D] to-[#840B86] rounded-t-[50px] flex items-center justify-center"></div>
      </div>
    </>
  );
}
