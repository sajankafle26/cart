"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
function Header() {
    let [cat,setCat]=useState([])
    useEffect(()=>{
        fetch(`https://dummyjson.com/products/categories`).then(a=>a.json()).then(b=>setCat(b))
    },[])
  return (
    <div>
      <h1 className='text-3xl text-center text-red-600 py-6'>Online Shop</h1>
      <nav className='bg-black text-white py-5 hidden md:block'>
        <ul className='flex gap-5 justify-center'>
            {cat.slice(0,8).map((a=>(

           
            <li><Link href={`/category/${a.slug}`}>{a.name}</Link></li>
             )))}
        </ul>
      </nav>
    </div>
  )
}

export default Header
