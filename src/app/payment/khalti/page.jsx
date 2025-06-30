"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KhaltiPaymentPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem("orderId");
    if (!id) {
      alert("No order found! Redirecting to home.");
      router.push("/");
      return;
    }
    setOrderId(id);

    // Load Khalti Checkout JS script
    const script = document.createElement("script");
    script.src = "https://khalti.com/static/khalti-checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  const handlePayment = () => {
    if (!window.KhaltiCheckout) {
      alert("Khalti script not loaded yet.");
      return;
    }

    const config = {
      // Replace with your Khalti public test key
      publicKey: "test_public_key_1234567890abcdef",
      productIdentity: orderId,
      productName: "Order Payment",
      productUrl: "http://yourshop.com/checkout",
      eventHandler: {
        onSuccess(payload) {
          // Payment successful, verify on backend then update order status
          fetch("/api/orders/verify-khalti", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, orderId }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                alert("Payment successful!");
                sessionStorage.removeItem("orderId");
                router.push("/thank-you");
              } else {
                alert("Payment verification failed.");
              }
            })
            .catch(() => alert("Server error during payment verification."));
        },
        onError(error) {
          alert("Payment failed or cancelled.");
        },
        onClose() {
          console.log("Payment widget closed.");
        },
      },
      paymentPreference: ["KHALTI"],
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: 1000 * 100 }); // Amount in paisa (NPR 1000)
  };

  if (!orderId) return null;

  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-xl font-bold mb-6">Pay with Khalti</h2>
      <button
        onClick={handlePayment}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
