"use client";
import React, { useContext } from 'react';
import CartContext from '../CartContext';
import { useRouter } from 'next/navigation';

function Cart() {
  const { state } = useContext(CartContext);
  const router = useRouter();

  const handleCheckout = () => {
    const user = localStorage.getItem("user"); // or check token
    if (!user) {
      alert("Please login to continue to checkout.");
      router.push("/userlogin");
    } else {
      // Proceed to order or payment page
      router.push("/checkout");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {state.cart.map((item, i) => (
              <li key={i} className="border p-4 rounded shadow">
                <div className="font-medium">{item.title}</div>
                <div>Price: NPR {item.price}</div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
