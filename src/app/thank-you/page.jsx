"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const orderId = sessionStorage.getItem("orderId");
    if (!orderId) {
      router.push("/");
    } else {
      sessionStorage.removeItem("orderId");
    }
  }, [router]);

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
      <p>Your payment was successful and your order is confirmed.</p>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
