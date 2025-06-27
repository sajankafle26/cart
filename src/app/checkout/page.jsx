"use client"
import React, { useContext, useState } from 'react'
import CartContext from '../CartContext';

function page() {
      const { state,dispatch } = useContext(CartContext);
        const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const total = state.cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  let handleChange=(e)=>{

  }

  return (
    <div className='container mx-auto py-5'>
        <h2>CheckOut Page</h2>
        <ul className="mb-6 space-y-3 border p-4 rounded">
            {state.cart.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.title}</span>
                <span>NPR {item.price}</span>
              </li>
            ))}
            <li className="font-semibold flex justify-between border-t pt-2">
              <span>Total:</span>
              <span>NPR  {total}</span>
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

      
    </div>
  )
}

export default page
