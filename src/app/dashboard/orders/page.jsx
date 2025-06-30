"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple admin auth (you can improve this)
  useEffect(() => {
   
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Items</th>
              <th className="border border-gray-300 p-2">Total (NPR)</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 p-2 text-xs">{order._id}</td>
                <td className="border border-gray-300 p-2">
                  {order.user?.username || "Unknown"}
                </td>
                <td className="border border-gray-300 p-2 text-left max-w-xs">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.title} - NPR {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 p-2 font-semibold">{order.total}</td>
                <td
                  className={`border border-gray-300 p-2 font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
