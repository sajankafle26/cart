"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
function page() {
    let {id}=useParams()
   let [cat,setCat]=useState([])
      useEffect(()=>{
          fetch(`https://dummyjson.com/products/${id}`).then(a=>a.json()).then(b=>setCat(b))
      },[id])
  return (
    <div className='container mx-auto py-7'>
      <h2 className='text-3xl'>Detail Page of {cat.title}</h2>
      <img src={cat.thumbnail} alt="" />
    </div>
  )
}

export default page
