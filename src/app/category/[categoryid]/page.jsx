"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CartContext from '@/app/CartContext'
 
function page() {
    let {categoryid}=useParams()
     let {state, dispatch}=useContext(CartContext)
     let [productsByCat, setProductsBycat]=useState([])
       useEffect(()=>{
      fetch(`/api/products?category=${categoryid}`).then(a=>a.json()).then(b=>setProductsBycat(b))
       },[categoryid])
  return (
    <div>
        <section className='container mx-auto'>
      <h1>{categoryid}</h1>
      <div className="flex flex-wrap">
          {productsByCat.map(a=>(
            <div className='w-[300px] shadow p-3 bg-white'>
              <img src={a.image} alt="" />
              <p>{a.title}</p>
              <button className='bg-red-400 p-2' onClick={()=>dispatch({type: 'addtocart', payload: a})}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
        
    </div>
  )
}

export default page
