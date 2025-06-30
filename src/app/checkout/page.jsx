"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartContext from "../CartContext";
 

export default function CheckoutPage() {
  const { state } = useContext(CartContext);
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Please login to access checkout");
      router.push("/userlogin");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = state.cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const handleOrderSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }
    if (state.cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const orderData = {
      user,
      items: state.cart,
      ...form,
      total,
      paymentMethod: "Khalti", // or "eSewa"
      isPaid: false,
      createdAt: new Date()
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (data._id) {
        alert("Order placed! Redirecting to payment...");
        sessionStorage.setItem("orderId", data._id);
        router.push("/payment/khalti"); // Change to your payment page
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-lg">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {state.cart.length === 0 ? (
        <p>Your cart is empty. Please add some products.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-3 border p-4 rounded">
            {state.cart.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.title}</span>
                <span>NPR {item.price}</span>
              </li>
            ))}
            <li className="font-semibold flex justify-between border-t pt-2">
              <span>Total:</span>
              <span>NPR {total}</span>
            </li>
          </ul>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              className="w-full border p-2 rounded"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            onClick={handleOrderSubmit}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Placing Order..." : "Confirm Order & Pay"}
          </button>
        </>
      )}
    </div>
  );
}
