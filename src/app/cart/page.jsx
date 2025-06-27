"use client"
import React, { useContext } from 'react'
import CartContext from '../CartContext'
import { useRouter } from 'next/navigation';

function page() {
  let {state, dispatch}=useContext(CartContext)
  const router = useRouter();
  let handleCheckout=()=>{
    const user = localStorage.getItem("user"); // or check token
    if (!user) {
      alert("Please login to continue to checkout.");
      router.push("/userlogin");
    } else {
      // Proceed to order or payment page
      router.push("/checkout");
    }
  }
  return (
    <div className='container mx-auto'>
      <h1 className='py-4 text-3xl'>Cart</h1>
      {state.cart.map(a=>(

     
      <article key={a._id} className='border-green-700 border-2 p-5'>
        <h3 className='font-semibold'>{a.title}</h3>
        <p>Qty: {a.quantity}</p>
        <p>price: {a.price}
        <button onClick={()=>dispatch({type: 'remove', payload: a})}>X</button></p>
      </article>
       ))}


       <button className='bg-green-500 p-3 my-5 rounded' onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default page
